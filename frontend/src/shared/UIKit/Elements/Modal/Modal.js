import reactDom from "react-dom";
import { CSSTransition } from "react-transition-group";

import './Modal.css';
import { Backdrop } from '../Backdrop/Backdrop'
import Center from "../../Layouts/Center/Center";

export const ModalOverlay = (props) => {
    const content = (
        <div className={`modal ${props.className}`} style={props.style}>
            <div className={`modal-header ${props.headerClass}`}>
                <Center><h4>{props.headerText}</h4></Center>
            </div>
            <form onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}>
                <div className={`modal-content ${props.contentClass}`}>
                    {props.children}
                </div>
                <div className={`modal-footer ${props.footerClass}`}>
                    {props.footer}
                </div>
            </form>
        </div>
    );

    return (reactDom.createPortal(content, document.getElementById('modal-hook')));
}

export const Modal = (props) => {
    return (
        <div>
            {props.show && <Backdrop className={props.nobackdrop ? 'nobackdrop' : 'backdrop'} onClick={props.onCancel} />}
            <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames='modal'>
                <ModalOverlay {...props} />
            </CSSTransition>
        </div>
    )
}