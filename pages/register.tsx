import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';

const errorStyle = css`
  color: red;
`;
type Errors = { message: string };
export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Account registration" />
      </Head>

      <h1>Register</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const createUserResponse = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
          const createUserResponseBody = await createUserResponse.json();

          if ('errors' in createUserResponseBody) {
            setErrors(createUserResponseBody.errors);
          } else {
            await router.push('/login');
          }
        }}
        //direct to login/game for later
        //    createUserResponse.json().then((data) => {
        //      if (data.errors) {
        //        setErrors(data.errors);
        //      } else {
        //        window.location.href = '/login';
        //      }
        //    });
        // }}
      >
        <label>
          Username: {''}
          <input
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <label>
          Password: {''}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button>Register</button>
      </form>
      <div css={errorStyle}>
        {errors.map((error) => {
          return <div key={`error-${error.message}`}>{error.message} </div>;
        })}
      </div>
    </Layout>
  );
}
