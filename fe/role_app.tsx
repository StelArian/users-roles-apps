import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, actions } from "./store";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

export default () => {
  const dispatch: AppDispatch = useDispatch();
  const role_app = useSelector((state: RootState) => state.props.role_app);

  useEffect(() => {
    fetch(`//${location.hostname}:${config.port.be}/users`)
      .then((response) => response.json())
      .then((data) => dispatch(actions.gotUsers(data)));
  }, []);

  return (
    <div className="dataTable">
      <h1>Role+App</h1>
      <div>
        {role_app.map((item, index) => (
          <div key={index}>
            <div title={item.RoleGUID}>{item.RoleGUID}</div>
            <div title={item.AppGUID}>{item.AppGUID}</div>
            <div>🗑</div>
          </div>
        ))}
      </div>
    </div>
  );
};
