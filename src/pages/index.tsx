import Head from 'next/head';
import GoogleButton from 'react-google-button';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
} from 'firebase/auth';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { initializeApp } from 'firebase/app';

// Task 0: Initialize Firebase
// Replace the following with your app's Firebase project configuration
// https://firebase.google.com/docs/web/setup

//Unsecure way of storing the API key
const firebaseConfig = {
  apiKey: 'AIzaSyBO4LEieQNAuG2w_s2ActgtKSyqp6GaRGE',
  authDomain: 'checkmate-interview.firebaseapp.com',
  projectId: 'checkmate-interview',
  storageBucket: 'checkmate-interview.appspot.com',
  messagingSenderId: '596221673049',
  appId: '1:596221673049:web:b589dd84fb353884fb7b48',
  measurementId: 'G-F6DTM4PFEG',
};

const app = initializeApp(firebaseConfig);

// GoogleAuthProvider instance
const provider = new GoogleAuthProvider();
// Firebase Auth instance
const auth = getAuth(app);

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  //Next.js router
  const router = useRouter();

  const getResults = async (router: any) => {
    await getRedirectResult(auth).then((result) => {
      setIsLoading(true);
      router.push({
        pathname: '/signed-in',
        query: { user: result },
      });
    });
  };
  getResults(router);
  // Task 1: Implement Google Sign in with Firebase
  // https://firebase.google.com/docs/auth/web/google-signin

  const signIn = async () => {
    //very naive implementation
    await signInWithRedirect(auth, provider);

    /*
        1. Use the GoogleAuthProvider to sign in with Firebase
        2. Use signInWithRedirect to redirect the user to the Google sign in page
        3. (Optional) Use getRedirectResult to get the result of the redirect and check out what is inside :)
        4. Redirect the user to the signed-in page using Next.js router
       */
    //
  };

  return (
    <>
      <Head>
        <title>Sign in to see the public holidays in HK</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        {!isLoading && (
          <main
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <h1 className="title">
              Welcome to <a href="https://checkmatehk.io">CheckMate</a>
            </h1>
            <h3>Sign in to see a random programming joke 😳</h3>
            <h3></h3>
            {/* Button for user to sign in with Google */}
            {/* Task 1: Implement Google Sign in with Firebase */}
            <GoogleButton
              label={'Sign in with Google'}
              type="light"
              style={{
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Roboto, sans-serif',
                color: '#444',
              }}
              onClick={signIn}
            />
          </main>
        )}
        {isLoading && (
          <main
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <h3>Loading...</h3>
          </main>
        )}
      </div>
    </>
  );
}
