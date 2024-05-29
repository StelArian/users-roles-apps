import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, actions } from "./store";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

export default () => {
  const dispatch: AppDispatch = useDispatch();
  const user_role = useSelector((state: RootState) => state.props.user_role);

  useEffect(() => {
    fetch(`//${location.hostname}:${config.port.be}/users`)
      .then((response) => response.json())
      .then((data) => dispatch(actions.gotUsers(data)));
  }, []);

  return (
    <div className="dataTable">
      <h1>User+Role</h1>
      <div>
        {user_role.map((item, index) => (
          <div key={index}>
            <div title={item.UserGUID}>{item.UserGUID}</div>
            <div title={item.RoleGUID}>{item.RoleGUID}</div>
            <div>🗑</div>
          </div>
        ))}
      </div>
    </div>
  );
};
