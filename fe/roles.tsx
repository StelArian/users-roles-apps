import React, { useEffect, useState } from "react";
import fs from "fs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, actions } from "./store";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

export default () => {
  const dispatch: AppDispatch = useDispatch();
  const roles = useSelector((state: RootState) => state.props.roles);

  useEffect(() => {
    fetch(`//${location.hostname}:${config.port.be}/roles`)
      .then((response) => response.json())
      .then((data) => dispatch(actions.gotRoles(data)));
  }, []);

  return (
    <div className="dataTable">
      <h1>Roles<span title="Add role">+</span></h1>
      <div>
        {roles.map((item) => (
          <div key={item.GUID}>
            <div title={item.GUID}>{item.GUID}</div>
            <div title={item.Name}>{item.Name}</div>
            <div><input type="checkbox" /></div>
            <div>🗑</div>
            <div>✏️</div>
          </div>
        ))}
      </div>
    </div>
  );
};
