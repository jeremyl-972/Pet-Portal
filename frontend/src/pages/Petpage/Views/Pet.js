import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Center, Grid, Line, Modal, Btn } from '../../../shared/UIKit';
import './Pet.css'
import { AuthContext } from '../../../shared/contexts/auth-context';
import ErrorModal from '../../../shared/UIKit/Elements/ErrorModal';
import LoadingSpinner from '../../../shared/UIKit/Elements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../../shared/Hooks/http-hook';

const Pet = () => {
    const auth = useContext(AuthContext);
    const { User, token } = auth;

    const [loadedPet, setLoadedPet] = useState();
    const petId = useParams().petId;
    const [isSaved, setIsSaved] = useState();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        let userId;
        const petRequest = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/pets/${petId}`,
                'GET'
            );
            setLoadedPet(responseData.pet);
        };
        petRequest();

        if (User) {
            userId = User._id;
            const userRequest = async () => {
                const response = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
                    'GET'
                );
                const currentUserData = response.user;
                const hasSavedPet = currentUserData.savedPets.find(p => p._id === petId);
                if (!hasSavedPet) { setIsSaved(false) } else { setIsSaved(true) };
            };
            userRequest();
        };
    }, [sendRequest, petId, isSaved, User]);



    //adopt actions
    const [showAdoptModal, setShowAdoptModal] = useState(false);
    const [isAdopted, setIsAdopted] = useState(false);
    const cancelAdoptHandler = () => { setShowAdoptModal(false); };
    const showAdoptedModalHandler = () => { setShowAdoptModal(true); };

    const confirmAdoptHandler = async (event) => {
        event.preventDefault();
        setIsFostered(false);
        setIsReturned(false);
        //backend stuff: change ownerId of Pet to this User, change status of Pet to Adopted
        const response = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/pets/adopt/${User._id}`,
            'POST',
            JSON.stringify({ status: loadedPet.status, _id: loadedPet._id }),
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        );
        //
        setLoadedPet(response.pet);
        setIsAdopted(true);
        setTimeout(() => {
            setShowAdoptModal(false);
        }, 2000)
    }

    //foster actions
    const [showFosterModal, setShowFosterModal] = useState(false);
    const [isFostered, setIsFostered] = useState(false);
    const cancelFosterHandler = () => { setShowFosterModal(false); };
    const showFosterModalHandler = () => { setShowFosterModal(true); };

    const confirmFosterHandler = async (event) => {
        event.preventDefault();
        setIsAdopted(false);
        setIsReturned(false);
        //backend stuff: change ownerId of Pet to this User, change status of Pet to Fostered
        const response = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/pets/foster/${User._id}`,
            'POST',
            JSON.stringify({ status: loadedPet.status, _id: loadedPet._id }),
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        );
        //
        setLoadedPet(response.pet);
        setIsFostered(true);
        setTimeout(() => {
            setShowFosterModal(false);
        }, 2000);
    }

    //return actions
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [isReturned, setIsReturned] = useState(false);
    const showReturnModalHandler = () => { setShowReturnModal(true) };
    const cancelReturnHandler = () => { setShowReturnModal(false) };

    const confirmReturnHandler = async (event) => {
        event.preventDefault();
        setIsAdopted(false);
        setIsFostered(false);
        setIsSaved(false);
        //backend stuff: change ownerId of Pet to null, change status of Pet to Available
        const response = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/pets/return/${User._id}`,
            'POST',
            JSON.stringify({ status: loadedPet.status, _id: loadedPet._id }),
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        );
        //
        setLoadedPet(response.pet);
        setIsReturned(true);
        setTimeout(() => {
            setShowReturnModal(false);
        }, 2000);
    };

    //save actions
    const [showSaveModal, setShowSaveModal] = useState(false);

    const saveHandler = async () => {
        //backend stuff: add Pet to users saved list
        const response = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/saved/${User._id}`,
            'POST',
            JSON.stringify(loadedPet),
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        );
        //
        const updatedUser = response.user
        const hasSavedPet = updatedUser.savedPets.find(p => p._id === petId);
        if (!hasSavedPet || hasSavedPet.length === 0) { setIsSaved(false) } else { setIsSaved(true) };
        setShowSaveModal(true);
        setTimeout(() => {
            setShowSaveModal(false);
        }, 2000);
    };
    const unSaveHandler = async () => {
        //backend stuff: delete Pet from users saved list
        const response = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/unsaved/${User._id}`,
            'POST',
            JSON.stringify(loadedPet),
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        );
        //
        const updatedUser = response.user;
        const hasSavedPet = updatedUser.savedPets.find(p => p._id === petId);
        if (!hasSavedPet || hasSavedPet.length === 0) { setIsSaved(false) } else { setIsSaved(true) };
        setShowSaveModal(true);
        setTimeout(() => {
            setShowSaveModal(false);
        }, 2000);
    };
    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay={true} />}
            <Grid className='pet-page'>

                {!isLoading && loadedPet && <>
                    <Center className="pet-image-section">
                        <img className="pet-profile-image" src={`${loadedPet.image}`} alt={loadedPet.breed}></img>
                    </Center>

                    <div className='about-pet-section'>
                        <div className="about-pet-container">
                            <div className="about-pet-inner">
                                <div className='pet-name'>{`Facts About ${loadedPet.name}`}</div>
                                <div>Type of Pet:<span>{` ${loadedPet.type} `}</span>Breed:<span>{` ${loadedPet.breed}`}</span></div>
                                <div>Current Status:<span>{` ${loadedPet.status}`}</span></div>
                                <div>Height:<span>{` ${loadedPet.height}`}</span> Weight: <span>{` ${loadedPet.weight}`}</span></div>
                                <div>Color:<span>{` ${loadedPet.color}`}</span></div>
                                <div>Hypoallergenic:<span>{` ${loadedPet.hypoall}`}</span></div>
                                <div>Dietary Restrictions:<span>{` ${loadedPet.dietno}`}</span></div>
                                <div>Bio:<span>{` ${loadedPet.bio}`}</span></div>
                            </div>
                        </div>
                    </div>


                    {!User && <div className='login-prompt'>Did <span>{loadedPet.name}</span> catch your eye? Please Login to adopt or foster <span>{loadedPet.name}.</span></div>}

                    {User &&
                        <Center className='buttons-section'>
                            {User._id !== loadedPet.userId &&
                                loadedPet.status === 'Available' && <><Btn onClick={showAdoptedModalHandler}>Adopt</Btn> <Btn onClick={showFosterModalHandler}>Foster</Btn></>}
                            {User._id !== loadedPet.userId &&
                                loadedPet.status === 'Fostered' && <Btn onClick={showAdoptedModalHandler}>Adopt</Btn>}

                            {User._id === loadedPet.userId &&
                                loadedPet.status === 'Fostered' && <><Btn onClick={showAdoptedModalHandler}>Adopt</Btn><Btn onClick={showReturnModalHandler}>Return</Btn></>}
                            {User._id === loadedPet.userId &&
                                loadedPet.status === 'Adopted' && <Btn onClick={showReturnModalHandler}>Return</Btn>}

                            {User._id !== loadedPet.userId && !isSaved && <Btn onClick={saveHandler} className=''>Save</Btn>}
                            {User._id !== loadedPet.userId && isSaved && <Btn onClick={unSaveHandler} className=''>Unsave</Btn>}
                        </Center>
                    };

                    <Modal show={showAdoptModal} onCancel={cancelAdoptHandler} headerClass='pet-page-modal-header'
                        headerText={isAdopted ? `Thank you so much for adopting ${loadedPet.name}! You're amazing!`
                            : `You're quite sure you want to Adopt ${loadedPet.name}?`}
                        footer={!isAdopted &&
                            <Center><Line>
                                <Btn onClick={confirmAdoptHandler}>Proceed</Btn>
                                <Btn onClick={cancelAdoptHandler}>Cancel</Btn>
                            </Line></Center>
                        }>
                    </Modal>

                    <Modal show={showFosterModal} onCancel={cancelFosterHandler} headerClass='pet-page-modal-header'
                        headerText={isFostered ? `Thank you so much for fostering ${loadedPet.name}! You're amazing!`
                            : `You're quite sure you want to Foster ${loadedPet.name}?`}
                        footer={!isFostered &&
                            <Center><Line>
                                <Btn onClick={confirmFosterHandler}>Proceed</Btn>
                                <Btn onClick={cancelFosterHandler}>Cancel</Btn>
                            </Line></Center>
                        }>
                    </Modal>

                    <Modal show={showReturnModal} onCancel={cancelReturnHandler} headerClass='pet-page-modal-header'
                        headerText={isReturned ? `Ok, please bring ${loadedPet.name} back to the mission center.`
                            : `You're quite sure you want to return ${loadedPet.name}?`}
                        footer={!isReturned &&
                            <Center><Line>
                                <Btn onClick={confirmReturnHandler}>Proceed</Btn>
                                <Btn onClick={cancelReturnHandler}>Cancel</Btn>
                            </Line></Center>
                        }>
                    </Modal>

                    <Modal show={showSaveModal} onCancel={() => { setShowSaveModal(false) }} headerClass='pet-page-modal-header'
                        headerText={isSaved ?
                            `${loadedPet.name} has been added to your list of saved Pets`
                            : `${loadedPet.name} has been removed from your list of saved Pets`}
                    >
                    </Modal>
                </>}
            </Grid>
        </>
    );
}

export default Pet;