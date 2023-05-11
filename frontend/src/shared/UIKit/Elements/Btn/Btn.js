import { NavLink } from 'react-router-dom';
import './Btn.css';

export const Btn = props => {
    if (props.href) {
        return (
            <a
            className={`Btn ${props.className}`} href={props.href}>
                {props.children}
            </a>
        );
    }
    if (props.to) {
        return (
            <NavLink to={props.to} className={`Btn ${props.className}`}>
                {props.children}
            </NavLink>
        );
    }
    return (
        <button
            className={`Btn ${props.className}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};