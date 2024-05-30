import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, actions } from "./store";
import fs from "fs";
import { UserRole } from "../common";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

export const refreshUserRole = (dispatch: AppDispatch) => {
  fetch(`//${location.hostname}:${config.port.be}/user_role`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => dispatch(actions.gotUserRole(data)))
    .catch((error) => {
      console.error("Error:", error);
      dispatch(actions.fetchFailed(error.message));
    });
};

export default () => {
  const dispatch: AppDispatch = useDispatch();
  const user_role = useSelector((state: RootState) => state.props.user_role);

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const pair: UserRole = JSON.parse(e.currentTarget.dataset.pair || "");
    fetch(`//${location.hostname}:${config.port.be}/user_role`, {
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
      .then((data) => refreshUserRole(dispatch))
      .catch((error) => {
        console.error("Error:", error);
        dispatch(actions.fetchFailed(error.message));
      });
  };

  useEffect(() => {
    refreshUserRole(dispatch);
  }, []);

  return (
    <div className="dataTable">
      <h1>User+Role</h1>
      <div>
        {user_role.map((pair, index) => (
          <div key={index}>
            <div title={pair.UserGUID}>{pair.UserGUID}</div>
            <div title={pair.RoleGUID}>{pair.RoleGUID}</div>
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
