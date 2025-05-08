/** @format */

import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await currentUser();
  console.log(user);
  if (!user) {
    return NextResponse.json({ message: 'Not Authenticated' }, { status: 401 });
  }

  return NextResponse.json(
    {
      message: 'Authenticated',
      data: { userId: user?.id, username: user?.username },
    },
    { status: 200 }
  );
}
