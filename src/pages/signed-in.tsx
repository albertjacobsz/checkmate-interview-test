import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import Router, { useRouter } from 'next/router';
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

export default function SignedIn({
  joke,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const [user, setUser] = useState(null);
  const signout = () => {
    signOut(auth)
      .then(() => {
        router.push({
          pathname: '/',
        });
      })
      .catch((error) => {
        // An error happened.
      });
  };
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setUser(user.displayName);
    }
  });
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div>
      <center>
        <div className="toBeHid">
          <h1>Hello {user}, would you like a joke?</h1>
        </div>

        <div>
          <h3>
            Setup: <b>{joke.data[0].setup}</b>
          </h3>
          <div
            className="actor"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <h4>
              Hover <i>here</i> to see the punchline
            </h4>
          </div>
          {isHovering && (
            <div>
              <h4>{joke.data[0].punchline}</h4>
            </div>
          )}
        </div>
        <div>
          <button onClick={signout}>signout</button>
        </div>
      </center>
    </div>
  );
}

// Task 2: Fetch random jokes from the API
// https://official-joke-api.appspot.com/jokes/programming/random
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API and pass it to the page via props.joke
  const res = await fetch(
    'https://official-joke-api.appspot.com/jokes/programming/random'
  );
  const data = await res.json();
  return {
    props: {
      joke: { data },
    }, // will be passed to the page component as props
  };
};
