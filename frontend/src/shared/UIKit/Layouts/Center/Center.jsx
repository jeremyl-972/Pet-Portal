import './Center.css';

export const Center = (props) => {
    return (
        <div className={`Center ${props.className}`} style={props.style}>
            {props.children}
        </div>
    )
}

export default Center;