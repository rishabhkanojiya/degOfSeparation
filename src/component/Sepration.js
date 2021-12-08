import React, { Fragment } from "react";
import { Grid, Image, Modal, Segment, Step } from "semantic-ui-react";
import { getImage } from "../constant/actions";

const Sepration = (props) => {
  let { showSepPopup, user, users, setSepDataFunc, sepData } = props;

  const renderList = () => {
    let first = (
      <Step>
        <Image avatar src={getImage(user?.gender)} />
        <Step.Content>
          <Step.Title>{user?.first_name}</Step.Title>
        </Step.Content>
      </Step>
    );

    return Object.keys(sepData)?.map((us) => {
      if (sepData[us]) {
        let res = users?.find((a) => a.id == us);
        let sec = (
          <Step>
            <Image avatar src={getImage(res?.gender)} />
            <Step.Content>
              <Step.Title>{res?.first_name}</Step.Title>
            </Step.Content>
          </Step>
        );

        let ter = users?.map((usr) => {
          if (sepData[us]?.includes(usr.id)) {
            if (usr.id == user.id) {
              return <Fragment />;
            }

            return (
              <Fragment>
                <Image avatar src={getImage(usr?.gender)} />
                <Step.Content style={{ marginRight: "10px" }}>
                  <Step.Title>{usr?.first_name}</Step.Title>
                </Step.Content>
              </Fragment>
            );
          }
        });

        if (res.id == user.id) {
          return <Fragment />;
        }

        return (
          <Fragment>
            <Segment.Group compact>
              <Step.Group>
                {first}
                {sec}
                <Step>{ter}</Step>
              </Step.Group>
            </Segment.Group>
          </Fragment>
        );
      }
    });
  };

  return (
    <Modal
      size="large"
      open={showSepPopup}
      onClose={() => setSepDataFunc(false)}
    >
      <Modal.Header>Degree Of Separation for {user?.first_name}</Modal.Header>
      <Fragment>
        <Modal.Content scrolling>
          <Grid.Column>
            <Segment basic compact>
              {Object?.keys(sepData || {})?.length ? (
                renderList()
              ) : (
                <div>Add Friend For {user?.first_name} Friends</div>
              )}
            </Segment>
          </Grid.Column>
        </Modal.Content>
      </Fragment>
    </Modal>
  );
};

export default Sepration;
