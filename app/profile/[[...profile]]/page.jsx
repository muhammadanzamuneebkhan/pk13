/** @format */

import { UserProfile } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';
import { auth, currentUser } from '@clerk/nextjs/server';

const Profile = async () => {
  const user = await currentUser();
  console.log(user);
  if (!user) {
    redirect('/'); // redirect only if clearly unauthenticated
  }

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h1 className="text-2xl">{user?.username}</h1>
      <UserProfile />
    </div>
  );
};

export default Profile;
