import React from "react";
import { AppDispatch, RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { RoleApp } from "../common";
import fs from "fs";
import { refreshRoleApp } from "./role_app";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

export default () => {
  const dispatch: AppDispatch = useDispatch();
  const roles_selected = useSelector(
    (state: RootState) => state.props.roles_selected
  );
  const apps_selected = useSelector(
    (state: RootState) => state.props.apps_selected
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (roles_selected.length && apps_selected.length) {
      const roleAppPairs: RoleApp[] = roles_selected.flatMap((role) =>
        roles_selected.map((app) => ({
          RoleGUID: role.GUID,
          AppGUID: app.GUID,
        }))
      );
      fetch(`//${location.hostname}:${config.port.be}/role_app`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roleAppPairs),
      })
        .then((response) => response.json())
        .then((data) => {
          refreshRoleApp(dispatch);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return <button onClick={handleClick}>↘ Join selected to Role+App ↙</button>;
};
