import { useContext, useEffect, useState } from "react";

import './Profile.css';
import { AuthContext } from "../../shared/contexts/auth-context";
import useFormReducer from "../../shared/Hooks/formReducer";
import { Btn, Center, Input, Modal } from "../../shared/UIKit";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/Utils/validators";
import { useHttpClient } from "../../shared/Hooks/http-hook";
import ErrorModal from "../../shared/UIKit/Elements/ErrorModal";
import LoadingSpinner from "../../shared/UIKit/Elements/LoadingSpinner/LoadingSpinner";

const Profile = () => {
    const auth = useContext(AuthContext);
    const { User, token } = auth;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    // input state setup
    const [formState, inputHandler, setFormData] = useFormReducer({
        firstName: {
            value: User.firstName,
            isValid: true
        },
        lastName: {
            value: User.lastName,
            isValid: true
        },
        phone: {
            value: User.phone,
            isValid: true
        },
        email: {
            value: User.email,
            isValid: true
        },
        password: {
            value: User.password,
            isValid: true
        },
        bio: {
            value: User.bio,
            isValid: true
        }
    }, true);

    useEffect(() => {
        if (User) {
            setFormData({
                firstName: {
                    value: User.firstName,
                    isValid: true
                },
                lastName: {
                    value: User.lastName,
                    isValid: true
                },
                phone: {
                    value: User.phone,
                    isValid: true
                },
                email: {
                    value: User.email,
                    isValid: true
                },
                password: {
                    value: User.password,
                    isValid: true
                },
                bio: {
                    value: User.bio,
                    isValid: true
                },
            }, true);
        };
    }, [setFormData, User]);

    //save actions
    const [showSaveModal, setShowSaveModal] = useState(false);

    const saveHandler = async (event) => {
        event.preventDefault();
        //console.log(formState.inputs);//send this to the backend- PUT users/:userId
        await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/${User._id}`,
            'PUT',
            JSON.stringify({
                firstName: formState.inputs.firstName.value,
                lastName: formState.inputs.lastName.value,
                phone: formState.inputs.phone.value,
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
                bio: formState.inputs.bio.value
            }),
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        );
        setShowSaveModal(true);
        setTimeout(() => {
            setShowSaveModal(false);
        }, 2000);
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay={true} />}

            <Center className='profile-settings-title'><h4>Edit Profile Settings</h4></Center>
            <div className='profile-settings-container'>
                <Input label={<span>First Name:</span>} id='firstName' onInput={inputHandler} element='input' type='text' initialvalue={formState.inputs.firstName.value} initialvalid={formState.inputs.firstName.isValid} validators={[VALIDATOR_REQUIRE()]} errorText='First Name required' />

                <Input label={<span>Last Name:</span>} id='lastName' onInput={inputHandler} element='input' type='text' initialvalue={formState.inputs.lastName.value} initialvalid={formState.inputs.lastName.isValid} validators={[VALIDATOR_REQUIRE()]} errorText='Last Name required' />

                <Input label={<span>Phone Number:</span>} id='phone' onInput={inputHandler} element='input' type='text' initialvalue={formState.inputs.phone.value} initialvalid={formState.inputs.phone.isValid} validators={[VALIDATOR_REQUIRE()]} errorText='Enter valid phone number' />

                <Input label={<span>Email:</span>} id='email' onInput={inputHandler} element='input' type='email' initialvalue={formState.inputs.email.value} initialvalid={formState.inputs.email.isValid} validators={[VALIDATOR_EMAIL()]} errorText='Enter valid email' />

                <Input label={<span>Password:</span>} id='password' onInput={inputHandler} element='input' type='password' initialvalue={formState.inputs.password.value} initialvalid={formState.inputs.password.isValid} validators={[VALIDATOR_MINLENGTH(6)]} errorText='Password needs 6 characters min' />

                <Input label={<span>Bio:</span>} id='bio' onInput={inputHandler} type='text' initialvalue={formState.inputs.bio.value} initialvalid={formState.inputs.bio.isValid} validators={[VALIDATOR_REQUIRE()]} errorText='Bio required' />

                <Center>
                    <Btn disabled={!formState.isValid} onClick={saveHandler}>Submit Changes</Btn>
                </Center>
            </div>

            <Modal show={showSaveModal} onCancel={() => { setShowSaveModal(false) }} headerClass='pet-page-modal-header' headerText='Your profile details have been saved.'></Modal>
        </>
    );
}

export default Profile;