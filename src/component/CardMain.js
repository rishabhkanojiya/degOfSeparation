import React, { Fragment } from "react";
import { Button, Card, Grid, Icon, Image, Segment } from "semantic-ui-react";
import { degreeOfSperation, getImage } from "../constant/actions";

const CardMain = (props) => {
  const {
    setPopupDataFunc,
    messageObj,
    showPopup,
    users,
    user,
    setUser,
    setSepDataFunc,
  } = props;

  const renderFriends = (user) => {
    let res = "No Friends Added";
    let frList = [];
    if (user?.friends?.length) {
      users?.map((us) => {
        if (user.friends.includes(us.id)) {
          frList.push(us.first_name);
        }
      });
    }
    if (frList?.length) {
      res = `Friend of ${frList}`;
    }
    return res;
  };

  const renderCard = (users) => {
    return users?.slice(0, 10)?.map((us) => {
      let img = getImage(us?.gender);
      return (
        <Grid.Column key={us.id}>
          <Segment basic>
            <Card fluid>
              <Card.Content>
                <Image floated="right" src={img} avatar />
                <Card.Header>
                  {us.first_name} {us.last_name}
                </Card.Header>
                <Card.Meta>{renderFriends(us)}</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    icon
                    color="teal"
                    labelPosition="left"
                    onClick={() => {
                      setUser(us);
                      setPopupDataFunc(true);
                    }}
                  >
                    <Icon name="user" />
                    Add Friend
                  </Button>
                  <Button
                    icon
                    color="blue"
                    labelPosition="right"
                    disabled={us?.friends?.length ? false : true}
                    onClick={() => {
                      let list = degreeOfSperation(us, users);
                      setSepDataFunc(true, list, us);
                    }}
                  >
                    <Icon name="chart line" />
                    Separation
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Segment>
        </Grid.Column>
      );
    });
  };

  return <Fragment>{renderCard(users)}</Fragment>;
};

export default CardMain;
