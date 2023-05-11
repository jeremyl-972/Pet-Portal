import { useContext, useEffect, useState } from "react";

import PetSimple from "../../../pages/Searchpage/Components/PetSimple";
import { AuthContext } from "../../../shared/contexts/auth-context";
import { useHttpClient } from "../../../shared/Hooks/http-hook";
import { Center, ImageContainer, Inner, Btn } from "../../../shared/UIKit";
import ErrorModal from "../../../shared/UIKit/Elements/ErrorModal";
import LoadingSpinner from "../../../shared/UIKit/Elements/LoadingSpinner/LoadingSpinner";

const SavedPetList = () => {
  const auth = useContext(AuthContext);
  const { User } = auth;
  const [savedPets, setSavedPets] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const userRequest = async () => {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${User._id}`,
        "GET"
      );
      const currentUserData = response.user;
      setSavedPets(currentUserData.savedPets);
    };
    userRequest();
  }, [User, sendRequest]);

  if (!savedPets || savedPets.length === 0) {
    return (
      <>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <LoadingSpinner asOverlay={true} />}

        <div className="">
          <Inner>
            <Center>
              <h3 style={{ padding: "25px 0" }}>
                No saved pets found. Check out the search page!
              </h3>
            </Center>
            <Center>
              <Btn to="/search">Go To The Search Page</Btn>
            </Center>
          </Inner>
        </div>
      </>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay={true} />}

      <ImageContainer>
        {savedPets.map((pet) => (
          <PetSimple
            isSaved={true}
            key={pet._id}
            id={pet._id}
            name={pet.name}
            image={`${pet.image}`}
            breed={pet.breed}
            status={pet.status}
          />
        ))}
      </ImageContainer>
    </>
  );
};

export default SavedPetList;
