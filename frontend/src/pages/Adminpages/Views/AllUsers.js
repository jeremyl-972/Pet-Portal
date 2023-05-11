import { useContext, useEffect, useState } from 'react';

import { Center, ImageContainer } from "../../../shared/UIKit";
import ErrorModal from '../../../shared/UIKit/Elements/ErrorModal';
import LoadingSpinner from '../../../shared/UIKit/Elements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../../shared/Hooks/http-hook.js';
import UserCard from '../Components/UserCard';
import { AuthContext } from '../../../shared/contexts/auth-context';

const AllUsers = () => {
    const auth = useContext(AuthContext);
    const { token } = auth;
    const [adminArray, setAdminArray] = useState([]);
    const [basicArray, setBasicArray] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();


    useEffect(() => {
        const allUsersRequest = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/users`,
                'GET',
                null,
                { 'Authorization': `Bearer ${token}` }
            );
            const loadedUsers = responseData.users;
            setAdminArray(loadedUsers.filter(u => u.role === 'admin'));
            setBasicArray(loadedUsers.filter(u => u.role !== 'admin'));
        };
        allUsersRequest();
    }, [sendRequest, token]);

    return (
        <>
            <ErrorModal nobackdrop={false} error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay={true} />}

            <div style={{ padding: '0px 25px' }}>
                <Center><h2 style={{ padding: '15px 0' }}>Administrators</h2></Center>
                <Center><div className='dividing-line'></div></Center>

                {adminArray &&
                    <ImageContainer>
                        {adminArray.map((user) => (
                            <UserCard key={user._id} id={user._id} firstName={user.firstName} lastName={user.lastName} email={user.email} phone={user.phone} bio={user.bio} />
                        ))}
                    </ImageContainer>
                }

                {!adminArray && <Center>There are no administrators yet.</Center>}
            </div>

            <div style={{ padding: '40px 25px 0 25px' }}>
                <Center><h2 style={{ padding: '15px 0' }}>Basic Users</h2></Center>
                <Center><div className='dividing-line'></div></Center>

                {basicArray &&
                    <ImageContainer>
                        {basicArray.map((user) => (
                            <UserCard key={user._id} id={user._id} firstName={user.firstName} lastName={user.lastName} email={user.email} phone={user.phone} bio={user.bio} />
                        ))}
                    </ImageContainer>
                }

                {(!basicArray || basicArray.length === 0) && <Center>There are no basic users yet.</Center>}
            </div>
        </>
    );
};

export default AllUsers;