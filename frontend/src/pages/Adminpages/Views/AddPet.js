import { useContext, useState } from 'react';

import './Add_EditPet.css'
import useFormReducer from '../../../shared/Hooks/formReducer';
import { Center, Btn, Input, Modal } from '../../../shared/UIKit';
import { VALIDATOR_REQUIRE } from '../../../shared/Utils/validators';
import { useHttpClient } from '../../../shared/Hooks/http-hook';
import ErrorModal from '../../../shared/UIKit/Elements/ErrorModal';
import LoadingSpinner from '../../../shared/UIKit/Elements/LoadingSpinner/LoadingSpinner';
import ImageUpload from '../../../shared/UIKit/Elements/ImageUpload/ImageUpload';
import { AuthContext } from '../../../shared/contexts/auth-context';

const AddPet = () => {
    const auth = useContext(AuthContext);
    const { token } = auth;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler] = useFormReducer({
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
            value: 0,
            isValid: false
        },
        weight: {
            value: 0,
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
        }
    }, false);

    const [showAddedModal, setShowAddedModal] = useState(false);

    const addSubmitHandler = async (event) => {
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
               `${process.env.REACT_APP_BACKEND_URL}/pets`,
                'POST',
                formData,
                { Authorization: `Bearer ${token}` }
            );

            setShowAddedModal(true);
            setTimeout(() => {
                setShowAddedModal(false);
            }, 2000);
        } catch (error) { };
    };

    return (
        <>
            <ErrorModal nobackdrop={true} error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay={true} />}

            <Center className='add-edit-title'>Add Pet</Center>
            <div>
                <div className="admin-about-pet-container">
                    <ImageUpload center='center' id='image' onInput={inputHandler} errorText='Please add an image' />

                    <Input label={<span>Pet Name:</span>} id='name' onInput={inputHandler} element='input' type='text' initialvalue={formState.inputs.name.value} initialvalid={formState.inputs.name.isValid} validators={[VALIDATOR_REQUIRE()]} errorText='Pet Name Required' />

                    <Input label={<span>Type of Pet:</span>} id='type' onInput={inputHandler} element='input' type='text' initialvalue={formState.inputs.type.value} initialvalid={formState.inputs.type.isValid} validators={[VALIDATOR_REQUIRE()]} errorText='Pet Type Required' />

                    <Input label={<span>Breed:</span>} id='breed' onInput={inputHandler} element='input' type='text' initialvalue={formState.inputs.breed.value} initialvalid={formState.inputs.breed.isValid} validators={[VALIDATOR_REQUIRE()]} errorText='Breed Required' />

                    <Input label={<span>Current Status:</span>} id='status' onInput={inputHandler} element='input' type='text' initialvalue={formState.inputs.status.value} initialvalid={formState.inputs.status.isValid} validators={[VALIDATOR_REQUIRE()]} errorText='Status Required' />

                    <Input label={<span>Height:</span>} id='height' onInput={inputHandler} element='input' type='text' initialvalue={formState.inputs.height.value} initialvalid={formState.inputs.height.isValid} validators={[VALIDATOR_REQUIRE()]} errorText='Height Required' />

                    <Input label={<span>Weight:</span>} id='weight' onInput={inputHandler} element='input' type='text' initialvalue={formState.inputs.weight.value} initialvalid={formState.inputs.weight.isValid} validators={[VALIDATOR_REQUIRE()]} errorText='Weight Required' />

                    <Input label={<span>Color:</span>} id='color' onInput={inputHandler} element='input' type='text' initialvalue={formState.inputs.color.value} initialvalid={formState.inputs.color.isValid} validators={[VALIDATOR_REQUIRE()]} errorText='Color Required' />

                    <Input label={<span>Hypoallergenic:</span>} id='hypoall' onInput={inputHandler} element='input' type='text' initialvalue={formState.inputs.hypoall.value} initialvalid={formState.inputs.hypoall.isValid} validators={[VALIDATOR_REQUIRE()]} errorText='HypoAll Required' />

                    <Input label={<span>Dietary Restrictions:</span>} id='dietno' onInput={inputHandler} element='input' type='text' initialvalue={formState.inputs.dietno.value} initialvalid={formState.inputs.dietno.isValid} validators={[VALIDATOR_REQUIRE()]} errorText='Diet Nos Required' />

                    <Input label={<span>Bio:</span>} id='bio' onInput={inputHandler} element='input' type='textarea' initialvalue={formState.inputs.bio.value} initialvalid={formState.inputs.bio.isValid} validators={[VALIDATOR_REQUIRE()]} errorText='Bio Required' />

                    <Center>
                        <Btn disabled={!formState.isValid} onClick={addSubmitHandler}>Add Pet</Btn>
                    </Center>
                </div>
            </div>

            <Modal show={showAddedModal} onCancel={() => { setShowAddedModal(false) }} headerClass='pet-page-modal-header'
                headerText={`${formState.inputs.name.value} has been added to the Pets Database`}
            >
            </Modal>
        </>
    );
}

export default AddPet;
