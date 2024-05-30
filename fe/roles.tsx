import React, { useEffect, useState } from "react";
import fs from "fs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, actions } from "./store";
import { Role } from "../common";
import { refreshRoleApp } from "./role_app";
import { refreshUserRole } from "./user_role";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

export const refreshRoles = (dispatch: AppDispatch) => {
  fetch(`//${location.hostname}:${config.port.be}/roles`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => dispatch(actions.gotRoles(data)))
  .catch((error) => {
    console.error("Error:", error);
    dispatch(actions.fetchFailed(error.message));
  });
};

export default () => {
  const dispatch: AppDispatch = useDispatch();
  const roles = useSelector((state: RootState) => state.props.roles);
  const roles_selected = useSelector(
    (state: RootState) => state.props.roles_selected
  );

  const handleCheckbox = (e: React.MouseEvent<HTMLInputElement>) => {
    const role: Role = JSON.parse(e.currentTarget.dataset.role || "");
    if (roles_selected.some((rs) => rs.GUID === role.GUID)) {
      dispatch(actions.rolesSelectedRm(role));
    } else {
      dispatch(actions.rolesSelectedAdd(role));
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const role: Role = JSON.parse(e.currentTarget.dataset.role || "");
    fetch(`//${location.hostname}:${config.port.be}/roles/${role.GUID}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        refreshRoles(dispatch);
        refreshUserRole(dispatch);
        refreshRoleApp(dispatch);
      })
      .catch((error) => {
        console.error("Error:", error);
        dispatch(actions.fetchFailed(error.message));
      });
  };

  useEffect(() => {
    refreshRoles(dispatch);
  }, []);

  return (
    <div className="dataTable">
      <h1>
        Roles<span title="Add role (WiP)">+</span>
      </h1>
      <div>
        {roles.map((role) => (
          <div key={role.GUID}>
            <div title={role.GUID}>{role.GUID}</div>
            <div title={role.Name}>{role.Name}</div>
            <div>
              <input
                type="checkbox"
                title="Select row"
                data-role={JSON.stringify(role)}
                onClick={handleCheckbox}
                checked={roles_selected.some((rs) => rs.GUID === role.GUID)}
                onChange={() => {}}
              />
            </div>
            <div
              onClick={handleDelete}
              data-role={JSON.stringify(role)}
              title="Delete row"
            >
              🗑
            </div>
            {/* <div>✏️</div> */}
          </div>
        ))}
      </div>
    </div>
  );
};
