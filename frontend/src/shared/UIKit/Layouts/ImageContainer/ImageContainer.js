import './ImageContainer.css';

export const ImageContainer = (props) => {
    return (
        <div className="ImageContainer">
            {props.children}
        </div>
    )
}

export default ImageContainer;