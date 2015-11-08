import React from 'react';

import { productName } from 'root/package.json';
import Modal from 'web/component/modal';
import style from './about.css';

export default () => {
  return (
    <Modal title={`${productName} - About`}>
      <div className={style.about}>
        <p>about component, using Modal</p>
        <p>more stuff...</p>
      </div>
    </Modal>
  );
};
