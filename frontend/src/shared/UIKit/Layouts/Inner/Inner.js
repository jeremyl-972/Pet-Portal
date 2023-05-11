
import './Inner.css';

export const Inner = (props) => {
    return (
        <div className={`Inner ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Inner;