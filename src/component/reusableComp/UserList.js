import React, { useEffect } from "react";
import { Button, Image, List } from "semantic-ui-react";
import { getImage } from "../../constant/actions";
import config from "../../constant/config";

const UserList = (props) => {
  const { users, addFriends, removeFriends } = props;

  const renderUsers = (users) => {
    return users?.map((user) => {
      let img = getImage(user?.gender);
      return (
        <List.Item key={user?.id}>
          <List.Content floated="right">
            {!user?.addFriends ? (
              <Button color="teal" onClick={() => addFriends(user)}>
                Add
              </Button>
            ) : (
              <Button color="red" onClick={() => removeFriends(user)}>
                Remove
              </Button>
            )}
          </List.Content>
          <Image avatar src={img} />
          <List.Content>{user?.first_name}</List.Content>
        </List.Item>
      );
    });
  };

  return <List verticalAlign="middle">{renderUsers(users)}</List>;
};

export default UserList;
