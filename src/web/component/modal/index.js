import React from 'react';

import style from './style.css';

export default ({children, title}) => {
  return (
    <div className={style.modal}>
      <div className={style.overlay}>
      </div>
      <div className={style.content}>
        <h2 className={style.title}>
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
};
