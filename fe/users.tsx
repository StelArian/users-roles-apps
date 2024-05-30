import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, actions } from "./store";
import fs from "fs";
import { User } from "../common";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

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

  useEffect(() => {
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
  }, []);

  return (
    <div className="dataTable">
      <h1>
        Users<span title="Add user">+</span>
      </h1>
      <div>
        {users.map((user) => (
          <div key={user.GUID}>
            <div title={user.GUID}>{user.GUID}</div>
            <div title={user.FullName}>{user.FullName}</div>
            <div title={user.PicturePath}>{user.PicturePath}</div>
            <div>
              <input
                type="checkbox"
                data-user={JSON.stringify(user)}
                onClick={handleCheckbox}
                checked={users_selected.some((su) => su.GUID === user.GUID)}
                onChange={() => {}}
              />
            </div>
            <div>🗑</div>
            <div>✏️</div>
          </div>
        ))}
      </div>
    </div>
  );
};
