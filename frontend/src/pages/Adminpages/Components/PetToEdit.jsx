import { NavLink } from "react-router-dom";
import '../../Searchpage/Components/PetSimple.css'

const PetToEdit = (pet) => {
    return (
        <>
            <NavLink to={`/admin/editPet/${pet.id}`} className="pet-card" style={{ backgroundImage: `url(${pet.image})` }}>
                <div className="pet-card-container">
                    <div className="pet-card-header">
                        <span className="pet-card-title">{pet.name}</span>
                        <span className="pet-card-status">{`  (${pet.status})`}</span>
                    </div>
                </div>
            </NavLink>
        </>
    );
};

export default PetToEdit;