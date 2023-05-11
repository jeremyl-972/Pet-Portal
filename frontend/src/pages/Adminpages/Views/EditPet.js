import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

import './Add_EditPet.css'
import useFormReducer from '../../../shared/Hooks/formReducer';
import { Center, Btn, Input, Modal } from '../../../shared/UIKit';
import { VALIDATOR_REQUIRE } from '../../../shared/Utils/validators';
import { useHttpClient } from '../../../shared/Hooks/http-hook';
import ErrorModal from '../../../shared/UIKit/Elements/ErrorModal';
import LoadingSpinner from '../../../shared/UIKit/Elements/LoadingSpinner/LoadingSpinner';
import ImageUpload from '../../../shared/UIKit/Elements/ImageUpload/ImageUpload';
import { AuthContext } from '../../../shared/contexts/auth-context';

const EditPet = () => {
    const auth = useContext(AuthContext);
    const { token } = auth;
    const navigate = useNavigate();
    const [pet, setPet] = useState();
    const petId = useParams().petId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useFormReducer({
        name: {
            value: '',
            isValid: false
        },
        type: {
            value: '',
            isValid: false
        },
        breed: {
            value: '',
            isValid: false
        },
        status: {
            value: '',
            isValid: false
        },
        height: {
            value: '',
            isValid: false
        },
        weight: {
            value: '',
            isValid: false
        },
        color: {
            value: '',
            isValid: false
        },
        hypoall: {
            value: '',
            isValid: false
        },
        dietno: {
            value: '',
            isValid: false
        },
        bio: {
            value: '',
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        },
    }, false);

    //receive current values 
    useEffect(() => {
        const fetchPet = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/pets/${petId}`,
                    'GET'
                );
                setPet(responseData.pet);
                setFormData({
                    name: {
                        value: responseData.pet.name,
                        isValid: true
                    },
                    type: {
                        value: responseData.pet.type,
                        isValid: true
                    },
                    breed: {
                        value: responseData.pet.breed,
                        isValid: true
                    },
                    status: {
                        value: responseData.pet.status,
                        isValid: responseData.true
                    },
                    height: {
                        value: responseData.pet.height,
                        isValid: true
                    },
                    weight: {
                        value: responseData.pet.weight,
                        isValid: true
                    },
                    color: {
                        value: responseData.pet.color,
                        isValid: true
                    },
                    hypoall: {
                        value: responseData.pet.hypoall,
                        isValid: true
                    },
                    dietno: {
                        value: responseData.pet.dietno,
                        isValid: true
                    },
                    bio: {
                        value: responseData.pet.bio,
                        isValid: true
                    },
                    image: {
                        value: responseData.pet.image,
                        isValid: true
                    },
                }, true);
            } catch (error) { };
        };
        fetchPet();
    }, [petId, sendRequest, setFormData]);

    const [showSaveModal, setShowSaveModal] = useState(false);

    const editSubmitHandler = async (event) => {
        event.preventDefault();
        //console.log(formState.inputs);//send this to the backend
        try {
            const formData = new FormData();
            formData.append('name', formState.inputs.name.value);
            formData.append('type', formState.inputs.type.value);
            formData.append('breed', formState.inputs.breed.value);
            formData.append('status', formState.inputs.status.value);
            formData.append('height', formState.inputs.height.value);
            formData.append('weight', formState.inputs.weight.value);
            formData.append('color', formState.inputs.color.value);
            formData.append('hypoall', formState.inputs.hypoall.value);
            formData.append('dietno', formState.inputs.dietno.value);
            formData.append('bio', formState.inputs.bio.value);
            formData.append('image', formState.inputs.image.value);

            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/pets/${petId}`,
                'PUT',
                formData,
                { Authorization: `Bearer ${token}` }
            );

            setShowSaveModal(true);
            setTimeout(() => {
                setShowSaveModal(false);
            }, 2000);
            navigate('/admin/allPets');
        } catch (error) { };
    };

    if (!isLoading && !pet) {
        return (
            <>
                <Center className='add-edit-title'>Edit Pet</Center>
                <div className="admin-about-pet-container">Could Not Find Pet</div>
            </>
        )
    };

    return (
        <>
            <ErrorModal nobackdrop={true} error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay={true} />}

            <Center className='add-edit-title'>Edit Pet</Center>
            {!isLoading && pet &&
                <div className="admin-about-pet-container">
                    <ImageUpload center='center' id='image' initialvalue={`${pet.image}`} initialvalid={true} onInput={inputHandler} errorText='Please add an image' />

                    <Input label={<span>Pet Name:</span>} initialvalue={pet.name} initialvalid={true} id='name' onInput={inputHandler} element='input' type='text' validators={[VALIDATOR_REQUIRE()]} errorText='Pet Name Required' />

                    <Input label={<span>Type of Pet:</span>} initialvalue={pet.type} initialvalid={true} id='type' onInput={inputHandler} element='input' type='text' validators={[VALIDATOR_REQUIRE()]} errorText='Pet Type Required' />

                    <Input label={<span>Breed:</span>} initialvalue={pet.breed} initialvalid={true} id='breed' onInput={inputHandler} element='input' type='text' validators={[VALIDATOR_REQUIRE()]} errorText='Breed Required' />

                    <Input label={<span>Current Status:</span>} initialvalue={pet.status} initialvalid={true} id='status' onInput={inputHandler} element='input' type='text' validators={[VALIDATOR_REQUIRE()]} errorText='Status Required' />

                    <Input label={<span>Height:</span>} initialvalue={pet.height} initialvalid={true} id='height' onInput={inputHandler} element='input' type='text' validators={[VALIDATOR_REQUIRE()]} errorText='Height Required' />

                    <Input label={<span>Weight:</span>} initialvalue={pet.weight} initialvalid={true} id='weight' onInput={inputHandler} element='input' type='text' validators={[VALIDATOR_REQUIRE()]} errorText='Pet Name Required' />

                    <Input label={<span>Color:</span>} initialvalue={pet.color} initialvalid={true} id='color' onInput={inputHandler} element='input' type='text' validators={[VALIDATOR_REQUIRE()]} errorText='Pet Name Required' />

                    <Input label={<span>Hypoallergenic:</span>} initialvalue={pet.hypoall} initialvalid={true} id='hypoall' onInput={inputHandler} element='input' type='text' validators={[VALIDATOR_REQUIRE()]} errorText='HypoAll Required' />

                    <Input label={<span>Dietary Restrictions:</span>} initialvalue={pet.dietno} initialvalid={true} id='dietno' onInput={inputHandler} element='input' type='text' validators={[VALIDATOR_REQUIRE()]} errorText='Diet Nos Required' />

                    <Input label={<span>Bio:</span>} initialvalue={pet.bio} initialvalid={true} id='bio' onInput={inputHandler} element='input' type='textarea' validators={[VALIDATOR_REQUIRE()]} errorText='Bio Required' />

                    <Center>
                        <Btn disabled={!formState.isValid} onClick={editSubmitHandler}>Submit Changes</Btn>
                    </Center>
                </div>
            }
            <Modal show={showSaveModal} onCancel={() => { setShowSaveModal(false) }} headerClass='pet-page-modal-header' headerText='The Pet details have been saved.'></Modal>
        </>
    );
};

export default EditPet;