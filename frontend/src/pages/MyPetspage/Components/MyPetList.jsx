import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PetSimple from "../../../pages/Searchpage/Components/PetSimple";
import { useHttpClient } from "../../../shared/Hooks/http-hook";
import { Center, ImageContainer, Inner, Btn } from "../../../shared/UIKit";
import ErrorModal from "../../../shared/UIKit/Elements/ErrorModal";
import LoadingSpinner from "../../../shared/UIKit/Elements/LoadingSpinner/LoadingSpinner";

const MyPetList = () => {
  const userId = useParams().userId;

  const [loadedPets, setLoadedPets] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fullUserRequest = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/full/${userId}`,
        'GET'
      );
      setLoadedPets(responseData.userPets);
    };
    fullUserRequest();
  }, [sendRequest, userId]);

  if (!loadedPets) {
    return (
      <>
        <ErrorModal nobackdrop={false} error={error} onClear={clearError} />
        {isLoading && <LoadingSpinner asOverlay={true} />}
        <div className="">
          <Inner>
            <Center><h3 style={{ padding: '25px 0' }}>No pets found. You should adopt one!</h3></Center>
            <Center><Btn to='/search'>Go To The Search Page</Btn></Center>
          </Inner>
        </div>
      </>
    );
  };

  if (!loadedPets || loadedPets.length === 0) {
    return (
        <>
            {isLoading && <LoadingSpinner asOverlay={true} />}

            <div className="">
                <Inner>
                    <Center><h3 style={{ padding: '25px 0' }}>You don't have any pets yet. Check out the search page!</h3></Center>
                    <Center><Btn to='/search'>Go To The Search Page</Btn></Center>
                </Inner>
            </div>
        </>
    );
};

  return (
    <>
      <ErrorModal nobackdrop={false} error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay={true} />}

      <ImageContainer>
        {loadedPets.map((pet) => (
          <PetSimple key={pet._id} id={pet._id} name={pet.name} image={`${pet.image}`} breed={pet.breed} status={pet.status} />
        ))}
      </ImageContainer>
    </>
  );
}

export default MyPetList;