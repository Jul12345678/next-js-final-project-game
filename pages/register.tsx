import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Account registration" />
      </Head>

      <h1>Register</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
        }}
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
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button>Register</button>
      </form>
    </Layout>
  );
}
