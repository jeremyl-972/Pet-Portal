import { useEffect, useState } from 'react';

import { Center, ImageContainer } from "../../../shared/UIKit";
//import PETS from '../../../DB/PETS';
import ErrorModal from '../../../shared/UIKit/Elements/ErrorModal';
import LoadingSpinner from '../../../shared/UIKit/Elements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../../shared/Hooks/http-hook.js';
import PetToEdit from '../Components/PetToEdit';

const AllPets = () => {
    //const IMAGE = PETS[0].image;
    const [loadedPets, setLoadedPets] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const allPetsRequest = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/pets`,
                'GET',
            );
            setLoadedPets(responseData.pets);
        };
        allPetsRequest();
    }, [sendRequest]);
    return (
        <>
            <ErrorModal nobackdrop={false} error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay={true} />}

            <div style={{ padding: '0 25px' }}>
                <Center><h1 style={{ padding: '15px 0' }}>All Pets</h1></Center>
                <Center><div className='dividing-line'></div></Center>

                {loadedPets ?
                    <ImageContainer>
                        {loadedPets.map((pet) => (
                            <PetToEdit key={pet._id} id={pet._id} name={pet.name} type={pet.type} breed={pet.breed} status={pet.status} height={pet.height} weight={pet.weight} color={pet.color} hypoall={pet.hypoall} dietno={pet.dietno} bio={pet.bio} image={`${pet.image}`} />
                        ))}
                    </ImageContainer> :
                    <div>There are no pets yet.</div>
                }
            </div>
        </>
    );
};

export default AllPets;