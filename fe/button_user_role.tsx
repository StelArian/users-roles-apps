import React from "react";
import { AppDispatch, RootState, actions } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { UserRole } from "../common";
import fs from "fs";
import { refreshUserRole } from "./user_role";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

export default () => {
  const dispatch: AppDispatch = useDispatch();
  const users_selected = useSelector(
    (state: RootState) => state.props.users_selected
  );
  const roles_selected = useSelector(
    (state: RootState) => state.props.roles_selected
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (users_selected.length && roles_selected.length) {
      const userRolePairs: UserRole[] = users_selected.flatMap((user) =>
        roles_selected.map((role) => ({
          UserGUID: user.GUID,
          RoleGUID: role.GUID,
        }))
      );
      fetch(`//${location.hostname}:${config.port.be}/user_role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRolePairs),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          refreshUserRole(dispatch);
        })
        .catch((error) => {
          console.error("Error:", error);
          dispatch(actions.fetchFailed(error.message));
        });
    }
  };
  return <button onClick={handleClick}>↘ Join selected to User+Role ↙</button>;
};
