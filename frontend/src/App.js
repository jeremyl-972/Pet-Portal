import { Routes, Route, Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';

import './App.css';
import { Grid } from './shared/UIKit';
import LoadingSpinner from './shared/UIKit/Elements/LoadingSpinner/LoadingSpinner';
import { AuthContext } from './shared/contexts/auth-context';
import { useAuth } from './shared/Hooks/auth-hook';
import MainNavigation from './AuthAndNavigation/MainNavigation';

const Home = React.lazy(() => import('./pages/Homepage/Views/Home'));
const Search = React.lazy(() => import('./pages/Searchpage/Views/Search'));
const Pet = React.lazy(() => import('./pages/Petpage/Views/Pet'));
const MyPets = React.lazy(() => import('./pages/MyPetspage/Views/MyPets'));
const Profile = React.lazy(() => import('./pages/MyProfilepage/Profile'));
const EditPet = React.lazy(() => import('./pages/Adminpages/Views/EditPet'));
const AddPet = React.lazy(() => import('./pages/Adminpages/Views/AddPet'));
const AllPets = React.lazy(() => import('./pages/Adminpages/Views/AllPets'));
const AllUsers = React.lazy(() => import('./pages/Adminpages/Views/AllUsers'));
const FullUser = React.lazy(() => import('./pages/Adminpages/Views/FullUser'));


const App = () => {
  const {token, login, logout, User, isAdmin } = useAuth();
  
  return (
    <AuthContext.Provider value={{isAdmin:isAdmin, User: User, token: token, login: login, logout: logout}}>
      <div className='App'>
        <Grid>
          <MainNavigation />
          <div>
          <Suspense fallback={<LoadingSpinner asOverlay={true} />}>
            <Routes>
              {token ? <>
                <Route path="/" exact element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/pet/:petId" element={<Pet />} />
                <Route path="/mypets/:userId" element={<MyPets />} />
                <Route path="/myProfile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/home" />} />
                {isAdmin && <>
                  <Route path="/admin/editPet/:petId" element={<EditPet pet />} />
                  <Route path="/admin/addPet" element={<AddPet />} />
                  <Route path="/admin/allPets" element={<AllPets />} />
                  <Route path="/admin/allUsers" element={<AllUsers />} />
                  <Route path="/admin/fullUser/:userId" element={<FullUser />} />
                  <Route path="*" element={<Navigate to="/home" />} />
                </>
                }
              </> : <>
                <Route path="/" exact element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/pet/:petId" element={<Pet />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </>
              }
            </Routes>
            </Suspense>
          </div>
        </Grid>
      </div>
    </AuthContext.Provider>
  )
}

export default App;
