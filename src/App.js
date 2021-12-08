import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Dimmer,
  Grid,
  Image,
  Loader,
  Segment,
} from "semantic-ui-react";
import CardMain from "./component/CardMain";
import ModaComp from "./component/ModaComp";
import Sepration from "./component/Sepration";
import { DataContext, PopupContext, SepContext } from "./context";
import { Consume } from "./context/Consumer";
import bgImage from "./assets/bg/topography.svg";

function App(props) {
  const [user, setUser] = useState(null);
  const {
    mainData: { users, addRemoveFriend, userSpecific, setUserSpecificData },
    popupData: { setPopupDataFunc, messageObj, showPopup },
    sepData: { sepData, showSepPopup, setSepDataFunc, user: userVal },
  } = props;

  useEffect(() => {
    // getPosts();
    localStorage.removeItem("userData");

    props.mainData.setDataMain();
  }, []);

  let commonProps = {
    setPopupDataFunc,
    messageObj,
    showPopup,
    users,
    addRemoveFriend,
    user,
    setUser,
    setSepDataFunc,
    userSpecific,
    setUserSpecificData,
  };

  let separationProp = {
    showSepPopup,
    sepData,
    users,
    setSepDataFunc,
    user: userVal,
  };
  return (
    <>
      {users?.length ? (
        <Segment basic style={{ background: `url(${bgImage})` }}>
          <Container>
            <Grid stackable columns={3}>
              <CardMain {...commonProps} />
              {showPopup ? <ModaComp {...commonProps} /> : <Fragment />}
              {showSepPopup ? <Sepration {...separationProp} /> : <Fragment />}
            </Grid>
          </Container>
        </Segment>
      ) : (
        <Dimmer active inverted>
          <Loader size="medium">Loading</Loader>
        </Dimmer>
      )}
    </>
  );
}

export default Consume(App, [PopupContext, DataContext, SepContext]);
