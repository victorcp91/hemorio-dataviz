import Head from "next/head";

import styles from "./index.module.css";

import { Provider } from 'react-redux';
import Header from "../components/Header";
import Home from "../components/Home";
import Bar from "../components/Bar";
import Line from "../components/Line";
import BloodTypes from "../components/BloodTypes";
import MultipleLines from '../components/MultipleLine';
import Store from '../store';

const Main = () => (
  <Provider store={Store.getStore()}>
    <div className={styles.container}>
      <Head>
        <title>BLOOD BANK PREDICTIONS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Bar />
      <Line />
      <BloodTypes />
      <MultipleLines/>
      {/* <MultipleLines/> */}
    </div>
  </Provider>
);

export default Main;
