import React, {useState} from 'react';

import style from './index.module.css';

import HistoryTimeWindow from '../HistoryTimeWindow';

export default function ChartsContainer({children}) {
  
  const [selected, setSelected] = useState(0);

  return (
    <div className={style.chartsContainer}>
      <ul className={style.tabs}>
        {children.map((c, index) => (
          <li key={index} className={index === selected ? style.selected : ''}>
            <button onClick={() => setSelected(index)}>
              {c.props.name}
            </button>
          </li>
        ))}
      </ul>
      {children.map((El,index) => 
        <div className={`${style.chartContainer} ${index === selected ? style.show : ''}`}>
          {El}
        </div>)}
    </div>
  )
}
