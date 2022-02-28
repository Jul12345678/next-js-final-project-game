import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Main Page" />
      </Head>

      <h1>Home</h1>
    </Layout>
  );
}
