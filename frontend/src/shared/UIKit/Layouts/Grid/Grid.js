import './Grid.css';

export const Grid = (props) => {
    return (
        <div className={props.className ? props.className:'Grid'}>
            {props.children}
        </div>
    )
}

export default Grid;