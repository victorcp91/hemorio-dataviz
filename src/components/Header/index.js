import React from "react";

import style from "./index.module.css";

export default function Header() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Hemorio</h1>
      <ul>
        <li>
          <a href="#bar">Bar Chart</a>
          <a href="#line">Line Chart</a>
          <a href="#pie">Pie Chart</a>
        </li>
      </ul>
    </div>
  );
}
