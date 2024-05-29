import React, { useEffect, useState } from "react";
import fs from "fs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, actions } from "./store";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

export default () => {
  const dispatch: AppDispatch = useDispatch();
  const apps = useSelector((state: RootState) => state.props.apps);

  useEffect(() => {
    fetch(`//${location.hostname}:${config.port.be}/apps`)
      .then((response) => response.json())
      .then((data) => dispatch(actions.gotApps(data)));
  }, []);

  return (
    <div className="dataTable">
      <h1>Apps<span title="Add app">+</span></h1>
      <div>
        {apps.map((item) => (
          <div key={item.GUID}>
            <div title={item.GUID}>{item.GUID}</div>
            <div title={item.Name}>{item.Name}</div>
            <div title={item.IconPath}>{item.IconPath}</div>
            <div title={item.URL}>{item.URL}</div>
            <div><input type="checkbox" /></div>
            <div>🗑</div>
            <div>✏️</div>
            {/* TODO: launch app rocket */}
          </div>
        ))}
      </div>
    </div>
  );
};
