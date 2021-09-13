import Head from "next/head";

import styles from "./index.module.css";

import { Provider } from 'react-redux';
import Header from "../components/Header";
import ChartsContainer from "../components/ChartsContainer";
import Bar from "../components/Bar";
import Line from "../components/Line";
import BloodTypes from "../components/BloodTypes";
import MultipleLines from '../components/MultipleLine';
import ForecastMultipleLines from '../components/ForecastMultipleLine';


import HistoryTimeWindow from "../components/HistoryTimeWindow";
import ForecastTimeWindow from "../components/ForecastTimeWindow";
import Store from '../store';

const Main = () => (
  <Provider store={Store.getStore()}>
    <div className={styles.container}>
      <Head>
        <title>BLOOD BANK FORECASTS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <HistoryTimeWindow/>
      <ChartsContainer>
        <Bar name="Bar Chart" type="history"/>
        <Line name="Total Blood Offer" type="history"/>
        <BloodTypes name="Pie charts" type="history"/>
        <MultipleLines name="Line plots" type="history"/>
      </ChartsContainer>
      <ForecastTimeWindow/>
      <ChartsContainer >
        <ForecastMultipleLines name="Line Plots" type="forecast"/>
      </ChartsContainer>
    </div>
  </Provider>
);

export default Main;
