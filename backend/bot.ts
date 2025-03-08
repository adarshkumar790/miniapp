import axios from "axios";
import { Telegraf } from "telegraf";
import crypto from "crypto";
import express from "express";

const BOT_TOKEN = "7791923708:AAHwxgDzjfe_IlbW49t2wN1KLWJocxEWAtA";
const bot = new Telegraf(BOT_TOKEN);
const app = express();

app.use(express.json());

console.log("Bot is started");

bot.start((ctx) => {
    const user = ctx.from;
    const initDataRaw = `id=${user.id}&first_name=${user.first_name}&last_name=${user.last_name || ""}&username=${user.username || ""}&language_code=${user.language_code}&is_premium=${user.is_premium || false}`;

    
    const isVerified = verifyTelegramAuth(initDataRaw);

    if (isVerified) {
        console.log(`User Verified: ${user.first_name} (ID: ${user.id})`);
        ctx.reply(`Hello, ${user.first_name}! You are verified`);
    } else {
        console.log(`Verification Failed for User: ${user.first_name} (ID: ${user.id})`);
        ctx.reply(`Hello, ${user.first_name}! Verification failed`);
    }
});


bot.launch();


const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/setChatMenuButton`;
const setWebAppButton = async () => {
    try {
        const response = await axios.post(API_URL, {
            menu_button: {
                type: "web_app",
                text: "Rats Kingdom",
                web_app: { url: `https://05d1-2402-a00-152-cd37-cf88-9ed-6533-da31.ngrok-free.app` },
            },
        });
        console.log("Menu Button Set:", response.data);
    } catch (error) {
        console.error("Error setting menu button:", error);
    }
};

setWebAppButton();


function verifyTelegramAuth(initDataRaw: string): boolean {
    const params = new URLSearchParams(initDataRaw);
    const hash = params.get("hash");
    if (!hash) return false;

    params.delete("hash");

    const dataCheckString = Array.from(params.entries())
        .map(([key, value]) => `${key}=${value}`)
        .sort()
        .join("\n");

    const secretKey = crypto.createHmac("sha256", Buffer.from(BOT_TOKEN, "utf-8"))
        .digest();

    const computedHash = crypto.createHmac("sha256", secretKey)
        .update(dataCheckString)
        .digest("hex");

    return computedHash === hash;
}

