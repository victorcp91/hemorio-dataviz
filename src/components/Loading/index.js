import React from 'react'

import style from "./index.module.css";


export default function Loading() {
  return (
    <div className={style.container}>
      <div className={style.loading}><div></div><div></div><div></div></div>
    </div>
  )
}
