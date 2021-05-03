import Head from "next/head";

import styles from "./index.module.css";

import Header from "../components/Header";
import Home from "../components/Home";
import Bar from "../components/Bar";
import Line from "../components/Line";
import BloodTypes from "../components/BloodTypes";

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
    <BloodTypes />
  </div>
);

export default Main;
