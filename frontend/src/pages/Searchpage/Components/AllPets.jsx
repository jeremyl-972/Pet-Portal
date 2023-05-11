import { useEffect, useState } from 'react';

import { Center, ImageContainer } from "../../../shared/UIKit";
import PetSimple from "./PetSimple";
import ErrorModal from '../../../shared/UIKit/Elements/ErrorModal';
import LoadingSpinner from '../../../shared/UIKit/Elements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../../shared/Hooks/http-hook.js';

const AllPets = () => {
    const [loadedPets, setLoadedPets] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const allPetsRequest = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/pets`,
                'GET'
            );
            setLoadedPets(responseData.pets.filter(pet => pet.status !== 'Adopted'));
        };
        allPetsRequest();
    }, [sendRequest]);

    return (
        <>
            <ErrorModal nobackdrop={false} error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay={true} />}

            {!isLoading && loadedPets &&
                <ImageContainer>
                    {loadedPets.map((pet) => (
                        <PetSimple key={pet._id} id={pet._id} name={pet.name} image={`${pet.image}`} breed={pet.breed} status={pet.status} />
                    ))}
                </ImageContainer>
            }
            {(!loadedPets || loadedPets.length === 0) && !isLoading && <Center>All pets are adopted at this time.</Center>}
        </>
    );
}

export default AllPets;