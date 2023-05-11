import { NavLink } from "react-router-dom";

import './UserCard.css';

const UserCard = ({ id, firstName, lastName }) => {
    return (
        <NavLink to={`/admin/fullUser/${id}`} className="user-card" >
            <div className="user-card-container">
                <span className="user-card-title">{`${firstName} ${lastName}`}</span>
            </div>
        </NavLink>
    );
};

export default UserCard;