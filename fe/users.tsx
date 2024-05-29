import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, actions } from "./store";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

export default () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.props.users);

  useEffect(() => {
    fetch(`//${location.hostname}:${config.port.be}/users`)
      .then((response) => response.json())
      .then((data) => dispatch(actions.gotUsers(data)));
  }, []);

  return (
    <div className="dataTable">
      <h1>
        Users<span title="Add user">+</span>
      </h1>
      <div>
        {users.map((item) => (
          <div key={item.GUID}>
            <div title={item.GUID}>{item.GUID}</div>
            <div title={item.FullName}>{item.FullName}</div>
            <div title={item.PicturePath}>{item.PicturePath}</div>
            <div>
              <input type="checkbox" />
            </div>
            <div>🗑</div>
            <div>✏️</div>
          </div>
        ))}
      </div>
    </div>
  );
};
