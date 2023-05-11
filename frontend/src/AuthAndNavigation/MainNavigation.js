import { useCallback, useContext, useReducer, useState } from "react";
import { NavLink } from "react-router-dom";

import "./MainNav.css";
import {
  Center,
  Icon,
  Inner,
  Line,
  Btn,
  Input,
  Backdrop,
  Modal,
} from "../shared/UIKit";
import SideDrawer from "./Components/SideDrawer";
import MainHeader from "./Components/MainHeader";
import { formReducer } from "../shared/Hooks/formReducer";
import useFormReducer from "../shared/Hooks/formReducer";
import ErrorModal from "../shared/UIKit/Elements/ErrorModal";
import LoadingSpinner from "../shared/UIKit/Elements/LoadingSpinner/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/Utils/validators";
import { AuthContext } from "../shared/contexts/auth-context";
import { useHttpClient } from "../shared/Hooks/http-hook";

const MainNavigation = () => {
  const auth = useContext(AuthContext);
  const { login, logout, User, isAdmin } = auth; //userId needed for sideDrawer

  const [showRegModal, setShowRegModal] = useState(false);
  const openRegModal = () => {
    setShowRegModal(true);
  };
  const closeRegModal = () => {
    setShowRegModal(false);
  };

  const [showLogModal, setShowLogModal] = useState(false);
  const openLogModal = () => {
    setShowLogModal(true);
  };
  const closeLogModal = () => {
    setShowLogModal(false);
  };

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawer = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };

  const { isLoading, error, sendRequest, clearError } = useHttpClient(
    openRegModal,
    closeRegModal,
    openLogModal,
    closeLogModal
  );

  //register-form state & logic
  const [regFormState, dispatch] = useReducer(formReducer, {
    inputs: {
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      repassword: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const regInputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  //login-form state & logic

  const [formState, inputHandler] = useFormReducer(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const regSubmitHandler = async (event) => {
    event.preventDefault();
    //console.log(regFormState.inputs);//send this to the backend
    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/users/`,
      "POST",
      JSON.stringify({
        firstName: regFormState.inputs.firstName.value,
        lastName: regFormState.inputs.lastName.value,
        phone: regFormState.inputs.phone.value,
        email: regFormState.inputs.email.value,
        password: regFormState.inputs.password.value,
        repassword: regFormState.inputs.password.value,
      }),
      { "Content-Type": "application/json" },
      "reg"
    );

    await login(responseData.user, responseData.token);
  };

  const logSubmitHandler = async (event) => {
    event.preventDefault();
    //send this to the backend
    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      "POST",
      JSON.stringify({
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      }),
      { "Content-Type": "application/json" },
      "log"
    );

    await login(responseData.user, responseData.token);
  };
  //Admin Stuff
  const [adminDrawerIsOpen, setAdminDrawerIsOpen] = useState(false);
  const openAdminDrawer = () => {
    setAdminDrawerIsOpen(true);
  };
  const closeAdminDrawer = () => {
    setAdminDrawerIsOpen(false);
  };

  const adminLinkHandler = () => {
    openAdminDrawer(true);
  };

  return (
    <div className="MainNavigation">
      <ErrorModal nobackdrop={true} error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay={true} />}
      {drawerIsOpen && (
        <Backdrop className="nobackdrop" onClick={closeDrawer} />
      )}
      {adminDrawerIsOpen && (
        <Backdrop className="nobackdrop" onClick={closeAdminDrawer} />
      )}

      <SideDrawer className="drawer" show={drawerIsOpen} onClick={closeDrawer}>
        <div className="drawer-content-container">
          <div className="drawer-icons-container">
            <Icon className="small-icon" i="house"></Icon>
            <Icon className="small-icon" i="magnifying-glass"></Icon>
            {User && <Icon className="small-icon" i="folder-open"></Icon>}
            <Icon className="small-icon" i="user"></Icon>
          </div>
          <div className="drawer-links-container">
            <NavLink className="drawer-link" to="/">
              Home
            </NavLink>
            <NavLink className="drawer-link" to="/search">
              Search
            </NavLink>
            {User ? (
              <NavLink className="drawer-link" to={`/mypets/${User._id}`}>
                My Pets
              </NavLink>
            ) : (
              <div className="drawer-link link-selector" onClick={openLogModal}>
                Login
              </div>
            )}
            {User && (
              <NavLink className="drawer-link" to="/myprofile">
                Profile
              </NavLink>
            )}
          </div>
        </div>
      </SideDrawer>

      <SideDrawer
        className="drawer"
        show={adminDrawerIsOpen}
        onClick={closeAdminDrawer}
      >
        <div className="drawer-content-container">
          <div className="drawer-icons-container">
            <Icon className="small-icon" i="dog"></Icon>
            <Icon className="small-icon" i="folder-open"></Icon>
            <Icon className="small-icon" i="user"></Icon>
          </div>
          <div className="drawer-links-container">
            <NavLink className="drawer-link" to="/admin/addPet">
              Add Pet
            </NavLink>
            <NavLink className="drawer-link" to="/admin/allPets">
              All Pets
            </NavLink>
            <NavLink className="drawer-link" to="/admin/allUsers">
              All Users
            </NavLink>
          </div>
        </div>
      </SideDrawer>

      <MainHeader className="nav-header">
        <Inner>
          <Line between>
            <Line>
              <button className="paw-button" onClick={openDrawer}>
                <Icon i="paw"></Icon>
              </button>
              {isAdmin && (
                <div className="link-selector" onClick={adminLinkHandler}>
                  Admin
                </div>
              )}
            </Line>
            <Line>
              {!User && (
                <div className="link-selector" onClick={openLogModal}>
                  Login
                </div>
              )}
              {User && (
                <div className="link-selector" onClick={logout}>
                  Logout
                </div>
              )}
            </Line>
          </Line>
        </Inner>

        <Modal
          show={showRegModal}
          onCancel={closeRegModal}
          header="modal header"
          contentClass="modal-content"
          footerClass="modal-actions"
          footer={
            <Btn
              disabled={!regFormState.isValid}
              className="register-log-btn"
              onClick={regSubmitHandler}
            >
              Signup
            </Btn>
          }
        >
          <div className="modal-container">
            <div>
              <Center className="register-log-header">
                <h4>Enter Your Info</h4>
              </Center>
              <Input
                id="firstName"
                onInput={regInputHandler}
                element="input"
                type="text"
                placeholder="First Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="First Name required"
              />
              <Input
                id="lastName"
                onInput={regInputHandler}
                element="input"
                type="text"
                placeholder="Last Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Last Name required"
              />
              <Input
                id="email"
                onInput={regInputHandler}
                element="input"
                type="email"
                placeholder="Email"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Enter valid email"
              />
              <Input
                id="phone"
                onInput={regInputHandler}
                element="input"
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="Phone Number"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter valid email"
              />
              <Input
                id="password"
                onInput={regInputHandler}
                element="input"
                type="password"
                placeholder="Password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Password needs 6 characters min"
              />
              <Input
                id="repassword"
                onInput={regInputHandler}
                element="input"
                type="password"
                placeholder="Re-enter Password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Password needs 6 characters min"
              />
            </div>
          </div>
        </Modal>

        <Modal
          show={showLogModal}
          onCancel={closeLogModal}
          header="modal header"
          headerClass="register-header"
          headerText="Enter Your Info"
          contentClass="modal-content"
          footerClass="modal-actions"
          footer={
            <>
              <Center>
                <Btn
                  disabled={!formState.isValid}
                  className="log-btn"
                  onClick={logSubmitHandler}
                >
                  Login
                </Btn>
              </Center>
              <Center style={{ margin: "0 2rem" }}>
                <div className="dividing-line"></div>
              </Center>
              <Center>
                <div className="new-user-prompt">
                  New to Pet Portal?{" "}
                  <span
                    className="signup-link"
                    onClick={() => {
                      closeLogModal();
                      openRegModal();
                    }}
                  >
                    Signup here
                  </span>
                </div>
              </Center>
            </>
          }
        >
          <div className="modal-container">
            <div>
              <Input
                id="email"
                onInput={inputHandler}
                element="input"
                type="email"
                placeholder="Email"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Enter valid email"
              />
              <Input
                id="password"
                onInput={inputHandler}
                element="input"
                type="password"
                placeholder="Password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Password needs 6 characters min"
              />
            </div>
          </div>
        </Modal>
      </MainHeader>
    </div>
  );
};

export default MainNavigation;
