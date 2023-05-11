import './Box.css';

export const Box = (props) => {
    return (
        <div style={props.style} className='Box'>
            {props.children}
        </div>
    )
}