import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, actions } from "./store";
import fs from "fs";
import { RoleApp } from "../common";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

export const refreshRoleApp = (dispatch: AppDispatch) => {
  fetch(`//${location.hostname}:${config.port.be}/role_app`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => dispatch(actions.gotRoleApp(data)))
    .catch((error) => {
      console.error("Error:", error);
      dispatch(actions.fetchFailed(error.message));
    });
};

export default () => {
  const dispatch: AppDispatch = useDispatch();
  const role_app = useSelector((state: RootState) => state.props.role_app);

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const pair: RoleApp = JSON.parse(e.currentTarget.dataset.pair || "");
    fetch(`//${location.hostname}:${config.port.be}/role_app`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pair),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => refreshRoleApp(dispatch))
      .catch((error) => {
        console.error("Error:", error);
        dispatch(actions.fetchFailed(error.message));
      });
  };

  useEffect(() => {
    refreshRoleApp(dispatch);
  }, []);

  return (
    <div className="dataTable">
      <h1>Role+App</h1>
      <div>
        {role_app.map((pair, index) => (
          <div key={index}>
            <div title={pair.RoleGUID}>{pair.RoleGUID}</div>
            <div title={pair.AppGUID}>{pair.AppGUID}</div>
            <div className="actions">
              <div
                onClick={handleDelete}
                data-pair={JSON.stringify(pair)}
                title="Delete row"
              >
                🗑
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
