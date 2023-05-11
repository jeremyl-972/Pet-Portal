import { useContext } from "react";

import "./Home.css";
import { AuthContext } from "../../../shared/contexts/auth-context";
import { Box, Center, Inner, Btn } from "../../../shared/UIKit";
import doggy5 from "../../../Images/doggy5.jpg";

const Home = () => {
  const auth = useContext(AuthContext);
  const { User } = auth;
  //const [name, setname] = useState('JJ');

  return (
    <div className="Home">
      <Box style={{ backgroundImage: `url(${doggy5})` }}>
        <Inner>
          <div className="welcome-container">
            <div className="welcome-header">
              Welcome{" "}
              {User ? <span>{User.firstName}</span> : <span>Friend,</span>} to
              the
              <br /> Pet Portal
            </div>
            <div className="welcome-text">
              The Pet Portal is the place for pet adoptions. We have many cats
              and dogs at our Mission Campus. Our animals are spayed-neutered,
              microchipped, and appropriately vaccinated.
            </div>
          </div>
        </Inner>
      </Box>
      <Center>
        <h1 className="appeal">Your New Bestie Awaits</h1>
        <Btn to="/search">Go To The Search Page</Btn>
      </Center>
    </div>
  );
};

export default Home;
