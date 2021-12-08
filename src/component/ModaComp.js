import React, { Fragment, useState } from "react";
import { Button, Loader, Modal } from "semantic-ui-react";
import config from "../constant/config";
import UserList from "./reusableComp/UserList";

const ModaComp = (props) => {
  let {
    setPopupDataFunc,
    messageObj,
    showPopup,
    users,
    addRemoveFriend,
    user,
    userSpecific,
    setUserSpecificData,
  } = props;

  const temp = JSON.parse(localStorage.getItem("userData")) || {};
  const [friends, setFriends] = useState(temp[user.id] ?? users);

  const addFriends = (val) => {
    let res = friends.map((f) => {
      if (f.id == val.id) {
        f.addFriends = true;
      }
      return f;
    });
    setFriends(res);
  };

  const removeFriends = (val) => {
    let res = friends.map((f) => {
      if (f.id == val.id) {
        f.addFriends = false;
      }
      return f;
    });
    setFriends(res);
  };

  let userListProsp = {
    setFriends,
    users: friends?.filter((a) => a.id != user.id),
    addFriends,
    removeFriends,
  };

  return (
    <Modal size="tiny" open={showPopup} onClose={() => setPopupDataFunc(false)}>
      <Modal.Header>Add Friends for {user?.first_name}</Modal.Header>
      <Fragment>
        <Modal.Content scrolling>
          <UserList {...userListProsp} />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setPopupDataFunc(false)}>
            Cancel
          </Button>
          <Button
            positive
            onClick={() => {
              setUserSpecificData(user?.id, [...friends]);

              addRemoveFriend(user, friends);
              setPopupDataFunc(false);
            }}
          >
            Done
          </Button>
        </Modal.Actions>
      </Fragment>
    </Modal>
  );
};

export default ModaComp;
