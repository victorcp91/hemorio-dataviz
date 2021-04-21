import Head from "next/head";

import styles from "./index.module.css";

import Header from "../components/Header";
import Home from "../components/Home";
import Bar from "../components/Bar";
import Line from "../components/Line";
import Pie from "../components/Pie";

const Main = () => (
  <div className={styles.container}>
    <Head>
      <title>HEMORIO</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <Home />
    <Bar />
    <Line />
    <Pie />
  </div>
);

export default Main;
