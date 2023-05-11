import React from 'react';

import { Modal } from './Modal/Modal';
import { Btn } from './Btn/Btn';
import Center from '../Layouts/Center/Center';

const ErrorModal = props => {
  return (
    <Modal
      nobackdrop={props.nobackdrop}
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Btn onClick={props.onClear} className='register-log-btn'>Okay</Btn>}
    >
      <Center>
        <p >{props.error}</p>
      </Center>
    </Modal>
  );
};

export default ErrorModal;
