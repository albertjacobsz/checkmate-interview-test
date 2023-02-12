import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';

export default function SignedIn({
  joke,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div>
      <center>
        <h1>Signed In</h1>

        <h3>
          Setup: <b>{joke.data[0].setup}</b>
        </h3>
        <div
          className="actor"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <h4>Hover Here to see the punchline</h4>
        </div>
        {isHovering && (
          <div className="hide">
            <h4>{joke.data[0].punchline}</h4>
          </div>
        )}
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
