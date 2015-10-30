import React from 'react';

import style from './root.css';

export default ({}) => (
  <div className={style.root}>
    <h1>Hello World!</h1>

    We are using node {process.versions.node},
    Chrome {process.versions.chrome},
    and Electron {process.versions.electron}.
  </div>
);
