import ReactDOM from 'react-dom';

import './Backdrop.css';

export const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className={props.className} onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};