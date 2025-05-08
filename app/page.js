/** @format */

// /** @format */

// import Image from 'next/image';
// import { currentUser, useUser } from '@clerk/nextjs/server';

// export default async function Home() {
//   // const { isLoaded, isSignedIn, user } = useUser();
//   const user = await currentUser();

//   return (
//     <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
//       <div className="flex flex-col items-center text-center">
//         Home Page{user ? `, ${user.firstName}` : ''}
//       </div>
//     </div>
//   );
// }
export default function Home() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-2xl">Home Page</div>
    </div>
  );
}
