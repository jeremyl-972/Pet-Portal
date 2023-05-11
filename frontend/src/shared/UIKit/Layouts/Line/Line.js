import './Line.css';

export const Line = (props) => {
    return (
        <div className={`Line ${props.className || ''}`} justify={props.between ? 'between' : ''}>
            {props.children}
        </div>
    )
}

export const Rows = (props) => {
    return (
        <Line {...props} className="Rows" ></Line>
    )
}

export default Line;