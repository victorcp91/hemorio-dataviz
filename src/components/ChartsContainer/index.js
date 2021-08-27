import React, {useState} from 'react';
import { useSelector } from 'react-redux';

import style from './index.module.css';

export default function ChartsContainer({children}) {
  
  const [selected, setSelected] = useState(0);
  const { bank } = useSelector(state => state.dataFile);

  if(!bank){
    return null;
  }
  
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
        <div key={index} className={`${style.chartContainer} ${index === selected ? style.show : ''}`}>
          {El}
        </div>)}
    </div>
  )
}
