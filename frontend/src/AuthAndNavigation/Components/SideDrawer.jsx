import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css'

const SideDrawer = (props) => {
    return (
        <CSSTransition in={props.show} timeout={200} classNames='slide-in-left' mountOnEnter unmountOnExit>
                    <div onClick={props.onClick} className={`side-drawer ${props.className || ''}`}>{props.children}</div>
        </CSSTransition>
    ); 
}
 
export default SideDrawer;