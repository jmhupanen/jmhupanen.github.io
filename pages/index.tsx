import type { NextPage } from "next";
import Head from "next/head"
import About from "../components/About";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>juho.page</title>
      </Head>
      <About />
      <Footer />
    </div>
  );
}

export default Home;