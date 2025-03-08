"use client";

import { useEffect, useState } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

export default function TelegramApp() {
  const [initData, setInitData] = useState<any>(null);

  useEffect(() => {
    try {
      const { initDataRaw, initData } = retrieveLaunchParams();
      console.log("Raw Init Data:", initDataRaw);
      console.log("Parsed Init Data:", initData);
      setInitData(initData);
    } catch (error) {
      console.error("Error retrieving launch params:", error);
    }
  }, []);

  return (
    <div>
      <h1>Telegram Mini App</h1>
      {initData ? (
        <pre>{JSON.stringify(initData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


// 'use client'

// import WebApp from '@twa-dev/sdk';
// import { useEffect, useState } from 'react';

// interface UserData {
//   id: number;
//   first_name: string;
//   last_name?: string;
//   username?: string;
//   language_code: string;
//   is_premium?: boolean;
//   photo_url?: string;
// }

// export default function Home() {
//   const [userData, setUserData] = useState<UserData | null>(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const user = WebApp.initDataUnsafe?.user;
//       if (user) {
//         setUserData(user as UserData);
//         console.log('User Data (JSON):', JSON.stringify(user, null, 2)); 
//       } else {
//         console.warn('No user data found in initDataUnsafe:', WebApp.initDataUnsafe);
//       }
//     }
//   }, []);

//   return (
//     <main className="p-4 flex flex-col items-center">
//       {userData ? (
//         <>
//           <h1 className="text-2xl font-bold mb-4">User Data</h1>
//           {userData.photo_url ? (
//             <img
//               src={userData.photo_url}
//               alt="User Profile"
//               className="w-24 h-24 rounded-full border mb-4"
//             />
//           ) : (
//             <div className="w-24 h-24 rounded-full border flex items-center justify-center bg-gray-200 mb-4">
//               <span className="text-gray-500">No Image</span>
//             </div>
//           )}

//           <ul className="text-lg">
//             <li><strong>ID:</strong> {userData.id}</li>
//             <li><strong>First Name:</strong> {userData.first_name}</li>
//             <li><strong>Last Name:</strong> {userData.last_name || 'N/A'}</li>
//             <li><strong>Username:</strong> {userData.username || 'N/A'}</li>
//             <li><strong>Language Code:</strong> {userData.language_code}</li>
//             <li><strong>Is Premium:</strong> {userData.is_premium ? 'Yes' : 'No'}</li>
//           </ul>

//           {/* ✅ Show JSON output in the UI */}
//           <pre className="mt-4 p-2 bg-gray-100 rounded text-sm text-left w-full overflow-x-auto">
//             {JSON.stringify(userData, null, 2)}
//           </pre>
//         </>
//       ) : (
//         <div>Loading...</div>
//       )}
//     </main>
//   );
// }
 