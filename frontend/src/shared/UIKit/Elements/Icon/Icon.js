import './Icon.css';

export const Icon = (props) => {
    return (
        <div className={`Icon ${props.className}`}>
            <i className={`fas fa-${props.i}`}></i>
        </div>
    )
}

export default Icon;