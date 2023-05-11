import { useState } from "react";
import { Center } from "../../../shared/UIKit";
import MyPetList from "../Components/MyPetList";
import SavedPetList from "../Components/SavedPetList";

const MyPets = () => {
    const [inMyPetsState, setInMyPetsState] = useState(true);

    const savedPetsViewHandler = () => {
        setInMyPetsState(false);
    };
    const myPetsViewHandler = () => {
        setInMyPetsState(true);
    };

    return (
        <>
            <div style={{ padding: '0 25px' }}>
                <Center><h1 style={{ padding: '15px 0' }}>{inMyPetsState ? 'My Pets' : 'Saved Pets'}</h1></Center>
                <Center><div className='new-user-prompt'>Show me
                    {inMyPetsState ?
                        <span className='signup-link' onClick={savedPetsViewHandler}> Saved Pets</span>
                        :
                        <span className='signup-link' onClick={myPetsViewHandler}> My Pets</span>}</div></Center>
                <Center><div className='dividing-line'></div></Center>
                {inMyPetsState ? <MyPetList /> : <SavedPetList />}
            </div>
        </>
    );
}

export default MyPets;