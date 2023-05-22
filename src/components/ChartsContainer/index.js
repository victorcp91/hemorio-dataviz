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
    <dv className={`${style.chartsContainer}`}>
      <ul className={style.tabs}>
        {!!children.map && children.map((c, index) => (
          <li key={index} className={index === selected ? style.selected : ''}>
            <button onClick={() => setSelected(index)}>
              {c.props.name}
            </button>
          </li>
        ))}
      </ul>
      {children[selected] || children}
    </dv>
  )
}
