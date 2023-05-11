import { useState } from "react";

import "./Search.css";
import {
  Line,
  Inner,
  Icon,
  Btn,
  Center,
  ImageContainer,
} from "../../../shared/UIKit";
import AllPets from "../Components/AllPets";
import Dropdown from "../../../shared/UIKit/Elements/Dropdown/Dropdown";
import ErrorModal from "../../../shared/UIKit/Elements/ErrorModal";
import LoadingSpinner from "../../../shared/UIKit/Elements/LoadingSpinner/LoadingSpinner";
import { useHttpClient } from "../../../shared/Hooks/http-hook";
import PetSimple from "../Components/PetSimple";

const typeList = [
  { id: "1", value: "Dog" },
  { id: "2", value: "Cat" },
  { id: "3", value: "Bird" },
  { id: "4", value: "Reptile" },
  { id: "5", value: "Arachnid" },
];
const statusList = [
  { id: "1", value: "Available" },
  { id: "2", value: "Fostered" },
  { id: "3", value: "Adopted" },
];
const heightList = [
  { id: "1", value: 25 },
  { id: "2", value: 50 },
  { id: "3", value: 75 },
  { id: "4", value: 100 },
  { id: "6", value: 125 },
  { id: "7", value: 150 },
];
const weightList = [
  { id: "1", value: 2 },
  { id: "2", value: 5 },
  { id: "3", value: 12 },
  { id: "4", value: 25 },
  { id: "6", value: 40 },
  { id: "7", value: 90 },
];

const Search = () => {
  const [typeSelectedItem, setTypeSelectedItem] = useState("");
  const [statusSelectedItem, setStatusSelectedItem] = useState("");
  const [heightSelectedItem, setHeightSelectedItem] = useState("");
  const [weightSelectedItem, setWeightSelectedItem] = useState("");
  const [nameValue, setNameValue] = useState("");

  const [queryResult, setQueryResult] = useState(null);
  const [justClosed, setJustClosed] = useState(false);
  const [justClicked, setjustClicked] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleNameInput = (e) => {
    setNameValue(e.target.value);
  };

  const [showAdvSearch, setShowAdvSearch] = useState(false);
  const openAdvSearch = () => {
    setShowAdvSearch(true);
  };
  const closeAdvSearch = () => {
    setShowAdvSearch(false);
    setStatusSelectedItem("");
    setHeightSelectedItem("");
    setWeightSelectedItem("");
    setNameValue("");
    if (!typeSelectedItem) {
      setQueryResult(null);
    }
    if (typeSelectedItem) {
      setJustClosed(true);
    }
  };

  const handleClick = async () => {
    if (!typeSelectedItem) {
      setjustClicked(true);
    }
    setJustClosed(false);

    if (typeSelectedItem) {
      setjustClicked(false);
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/pets/search?type=${typeSelectedItem.value}&name=${nameValue}&status=${statusSelectedItem.value}&height=${heightSelectedItem.value}&weight=${weightSelectedItem.value}`,
        "GET"
      );
      setQueryResult(responseData.petsArray);
    }
  };

  if (justClosed) {
    handleClick();
  }

  return (
    <>
      <ErrorModal nobackdrop={false} error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay={true} />}

      <div style={{ padding: "0 25px" }}>
        <Center>
          <h1 style={{ padding: "15px 0" }}>Pet Search</h1>
        </Center>
        <Inner>
          <Center className="search-page-intro">
            What type of pet is right for you?
          </Center>

          <Center className="outer-container">
            <Center className="container">
              <Line between className="line">
                <Dropdown
                  selectedItem={typeSelectedItem}
                  onSelect={setTypeSelectedItem}
                  id="type"
                  width={{ width: "90%" }}
                  text={
                    justClicked
                      ? "You must select a type of pet"
                      : "Select type of pet"
                  }
                  list={typeList}
                />
                <Btn onClick={handleClick} className="pet-search-button">
                  <Icon className="" i="magnifying-glass" />
                </Btn>
              </Line>
              {showAdvSearch && (
                <>
                  <Line between className="line">
                    <input
                      onChange={handleNameInput}
                      className="name-input"
                      placeholder="Enter name here"
                    />
                    <Dropdown
                      selectedItem={heightSelectedItem}
                      onSelect={setHeightSelectedItem}
                      id="height"
                      width={{ width: "43%" }}
                      text={"Max height (cm)"}
                      list={heightList}
                    />
                  </Line>
                  <Line between className="line">
                    <Dropdown
                      selectedItem={statusSelectedItem}
                      onSelect={setStatusSelectedItem}
                      id="status"
                      width={{ width: "54%" }}
                      text={"Select adoption status"}
                      list={statusList}
                    />
                    <Dropdown
                      selectedItem={weightSelectedItem}
                      onSelect={setWeightSelectedItem}
                      id="weight"
                      width={{ width: "43%" }}
                      text={"Max weight (kg)"}
                      list={weightList}
                    />
                  </Line>
                </>
              )}
            </Center>
            {showAdvSearch ? (
              <div className="adv-search-toggle" onClick={closeAdvSearch}>
                Close advanced search
              </div>
            ) : (
              <div className="adv-search-toggle" onClick={openAdvSearch}>
                Open advanced search
              </div>
            )}
          </Center>

          {queryResult && !isLoading && (
            <ImageContainer>
              {queryResult.map((pet) => (
                <PetSimple
                  key={pet._id}
                  id={pet._id}
                  name={pet.name}
                  image={`${pet.image}`}
                  breed={pet.breed}
                  status={pet.status}
                />
              ))}
            </ImageContainer>
          )}

          {!queryResult && !isLoading && <AllPets />}
          {queryResult && queryResult.length === 0 && !isLoading && (
            <Center>No pets match this search inquiry.</Center>
          )}
        </Inner>
      </div>
    </>
  );
};

export default Search;
