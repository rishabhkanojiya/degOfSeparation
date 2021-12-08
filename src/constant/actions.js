import axios from "axios";
import config from "./config";

export const getData = (params, cb, errCB) => {
  axios(params)
    .then((result) => {
      if (cb) {
        cb(result);
      }
    })
    .catch((err) => {
      if (errCB) {
        errCB(err);
      }
    });
};

export const getImage = (gender) => {
  let name = gender == "M" ? "matthew" : "molly";

  return config.IMG_BASE.replace("{{gender}}", name);
};

export const degreeOfSperation = (user, users) => {
  let finalList = {};

  const addToList = (user) => {
    user?.forEach((us) => {
      let res = users?.find((a) => a.id == us)?.friends;
      if (res) {
        finalList[us] = res;
      }
    });
  };

  addToList(user?.friends);
  Object.keys(finalList).map((key) => {
    if (finalList[key]) {
      addToList(finalList[key]);
    }
  });

  return finalList;
};
