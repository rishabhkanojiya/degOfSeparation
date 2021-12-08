import React, { useState } from "react";
import { DataContext, PopupContext, SepContext } from ".";
import { getData } from "../constant/actions";
import { GET_USERS_API } from "./apiUrl";

export const PopupContextProvider = (props) => {
  let [messageObj, setMessage] = useState({});
  let [showPopup, setShowPopup] = useState(false);

  const setPopupDataFunc = (display, data) => {
    setShowPopup(display);
    setMessage(data);
  };

  return (
    <PopupContext.Provider
      value={{
        messageObj,
        showPopup,
        setPopupDataFunc,
      }}
    >
      {props.children}
    </PopupContext.Provider>
  );
};

export const SeparationContextProvider = (props) => {
  const [sepData, setSepData] = useState({});
  const [user, setUser] = useState({});
  const [showSepPopup, setShowSepPopup] = useState(false);

  const setSepDataFunc = (display, data, us) => {
    setShowSepPopup(display);
    setSepData(data);
    setUser(us);
  };

  return (
    <SepContext.Provider
      value={{
        sepData,
        setSepData,
        showSepPopup,
        setShowSepPopup,
        setSepDataFunc,
        user,
        setUser,
      }}
    >
      {props.children}
    </SepContext.Provider>
  );
};

export const DataContextProvider = (props) => {
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [userSpecific, setUserSpecific] = useState({});

  const setDataMain = (paramsObj, cb, err) => {
    let apiParams = {
      url: GET_USERS_API,
      method: "GET",
      name: "POSTS",
      params: paramsObj,
    };
    getData(
      apiParams,
      (resp) => {
        setUsers(resp.data);
        if (cb) {
          cb(resp.data);
        }
      },
      (error) => {
        if (err) {
          err(error);
        }
      }
    );
  };

  const setUserSpecificData = (key, value, cb) => {
    let temp = JSON.parse(localStorage.getItem("userData")) || {};

    temp[key] = [...value];
    localStorage.setItem("userData", JSON.stringify(temp));
  };

  const addRemoveFriend = (user, friends) => {
    let finalVal = [];
    let res = users;

    for (let i = 0; i < friends.length; i++) {
      const fr = friends[i];
      if (fr.addFriends) {
        fr.addFriends = false;

        finalVal.push(fr.id);
      }
    }
    res = users.map((ur) => {
      if (ur.id == user.id) {
        ur.friends = finalVal;
      }
      return ur;
    });
    setUsers(res);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        users,
        setData,
        setDataMain,
        addRemoveFriend,
        userSpecific,
        setUserSpecific,
        setUserSpecificData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
