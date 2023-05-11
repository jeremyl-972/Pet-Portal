import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './FullUser.css'
import { Center, Grid, ImageContainer } from '../../../shared/UIKit';
import ErrorModal from '../../../shared/UIKit/Elements/ErrorModal';
import LoadingSpinner from '../../../shared/UIKit/Elements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../../shared/Hooks/http-hook';
import PetToEdit from '../Components/PetToEdit';

const FullUser = () => {
    const userId = useParams().userId;

    const [loadedUser, setLoadedUser] = useState();
    const [loadedPets, setLoadedPets] = useState();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const getUserAndUserPets = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/users/full/${userId}`,
                'GET'
            );
            setLoadedUser(responseData.user);
            setLoadedPets(responseData.userPets)
        };
        getUserAndUserPets();

    }, [sendRequest, userId]);

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay={true} />}

            <Grid className='user-page'>

                {!isLoading && loadedUser && <>
                    <div className="user-pets-image-section">
                        <Center className="user-pets-title">{`${loadedUser.firstName}'s Pets`}</Center>
                        {loadedPets &&
                            <ImageContainer>
                                {loadedPets.map((pet) => (
                                    <PetToEdit key={pet._id} id={pet._id} name={pet.name} type={pet.type} breed={pet.breed} status={pet.status} height={pet.height} weight={pet.weight} color={pet.color} hypoall={pet.hypoall} dietno={pet.dietno} bio={pet.bio} image={`${pet.image}`} />
                                ))}
                            </ImageContainer>}
                        {(!loadedPets || loadedPets.length === 0) &&
                                <ImageContainer>{`${loadedUser.firstName} Has No Pets Yet`}</ImageContainer>
                        }
                    </div>

                    <div className='about-user-section'>
                        <div className="about-user-container">
                            <div className="about-user-inner">
                                <div className='user-title'>{`User Details`}</div>
                                <div>First Name:<span>{` ${loadedUser.firstName} `}</span></div>
                                <div>Last Name:<span>{` ${loadedUser.lastName} `}</span></div>
                                <div>Email:<span>{` ${loadedUser.email} `}</span></div>
                                <div>Phone:<span>{` ${loadedUser.phone}`}</span></div>
                                <div>Bio:<span>{loadedUser.bio ? ` ${loadedUser.bio}` : ' ( ... More shall be revealed)'}</span></div>
                            </div>
                        </div>
                    </div>

                </>}

            </Grid>
        </>
    );
};

export default FullUser;