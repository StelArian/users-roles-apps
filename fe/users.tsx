import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, actions } from "./store";
import fs from "fs";
import { User } from "../common";
import { refreshUserRole } from "./user_role";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

export const refreshUsers = (dispatch: AppDispatch) => {
  fetch(`//${location.hostname}:${config.port.be}/users`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => dispatch(actions.gotUsers(data)))
    .catch((error) => {
      console.error("Error:", error);
      dispatch(actions.fetchFailed(error.message));
    });
};

export default () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.props.users);
  const users_selected = useSelector(
    (state: RootState) => state.props.users_selected
  );

  const handleCheckbox = (e: React.MouseEvent<HTMLInputElement>) => {
    const user: User = JSON.parse(e.currentTarget.dataset.user || "");
    if (users_selected.some((us) => us.GUID === user.GUID)) {
      dispatch(actions.usersSelectedRm(user));
    } else {
      dispatch(actions.usersSelectedAdd(user));
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const user: User = JSON.parse(e.currentTarget.dataset.user || "");
    fetch(`//${location.hostname}:${config.port.be}/users/${user.GUID}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        refreshUsers(dispatch);
        refreshUserRole(dispatch);
      })
      .catch((error) => {
        console.error("Error:", error);
        dispatch(actions.fetchFailed(error.message));
      });
  };

  useEffect(() => {
    refreshUsers(dispatch);
  }, []);

  return (
    <div className="dataTable">
      <h1>
        Users<span title="Add user (WiP)">+</span>
      </h1>
      <div>
        {users.map((user) => (
          <div key={user.GUID}>
            <div title={user.GUID}>{user.GUID}</div>
            <div title={user.FullName}>{user.FullName}</div>
            <div title={user.PicturePath}>{user.PicturePath}</div>
            <div className="actions">
              <div>
                <input
                  type="checkbox"
                  title="Select row"
                  data-user={JSON.stringify(user)}
                  onClick={handleCheckbox}
                  checked={users_selected.some((su) => su.GUID === user.GUID)}
                  onChange={() => {}}
                />
              </div>
              <div
                onClick={handleDelete}
                data-user={JSON.stringify(user)}
                title="Delete row"
              >
                🗑
              </div>
              <div title="Edit row (WiP)">✏️</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
