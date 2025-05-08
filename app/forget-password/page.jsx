/** @format */

'use client';
import React, { useEffect, useState } from 'react';
import { useSignIn, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const { isSignedIn, isLoaded: userLoaded } = useUser();
  const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);

  // ✅ Wait for Clerk to load fully before rendering anything
  if (!userLoaded || !signInLoaded) return null;

  // ✅ Instantly redirect if signed in
  if (isSignedIn) {
    router.replace('/');
    return null;
  }

  async function create(e) {
    e.preventDefault();
    const email = e.target[0].value;
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then(() => setSuccessfulCreation(true))
      .catch((err) => console.error('error', err.errors[0].longMessage));
  }

  async function reset(e) {
    e.preventDefault();
    const password = e.target[0].value;
    const code = e.target[1].value;
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then((result) => {
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true);
        } else if (result.status === 'complete') {
          setActive({ session: result.createdSessionId });
          setComplete(true);
        } else {
          console.log(result);
        }
      })
      .catch((err) => console.error('error', err.errors[0].longMessage));
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="bg-[#212121] p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8">
          {successfulCreation && !complete ? 'New Password' : 'Forgot Password'}
        </h1>
        <form onSubmit={!successfulCreation ? create : reset}>
          {!successfulCreation && !complete && (
            <>
              <input
                type="email"
                className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4"
                placeholder="Email"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </>
          )}
          {successfulCreation && !complete && (
            <>
              <input
                type="password"
                className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4"
                placeholder="New Password"
                required
              />
              <input
                type="number"
                className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4"
                placeholder="Code"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </>
          )}
          {complete && 'You have successfully changed your password'}
          {secondFactor && '2FA is required, this UI does not handle that'}
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
