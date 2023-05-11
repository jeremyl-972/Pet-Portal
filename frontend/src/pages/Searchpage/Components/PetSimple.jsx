import { NavLink } from "react-router-dom";
import './PetSimple.css'

const PetSimple = ({ id, name, image, status }) => {
    return (
        <NavLink to={`/pet/${id}`} className="pet-card" style={{ backgroundImage: `url('${image}')` }}>
            <div className="pet-card-container">
                <div className="pet-card-header">
                    <span className="pet-card-title">{name}</span>
                    <span className="pet-card-status">{`  (${status})`}</span>
                </div>
            </div>
        </NavLink>
    );
};

export default PetSimple;