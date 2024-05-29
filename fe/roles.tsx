import React, { useEffect, useState } from "react";
import fs from "fs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, actions } from "./store";
import { Role } from "../common";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

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

  useEffect(() => {
    fetch(`//${location.hostname}:${config.port.be}/roles`)
      .then((response) => response.json())
      .then((data) => dispatch(actions.gotRoles(data)));
  }, []);

  return (
    <div className="dataTable">
      <h1>
        Roles<span title="Add role">+</span>
      </h1>
      <div>
        {roles.map((role) => (
          <div key={role.GUID}>
            <div title={role.GUID}>{role.GUID}</div>
            <div title={role.Name}>{role.Name}</div>
            <div>
              <input
                type="checkbox"
                data-role={JSON.stringify(role)}
                onClick={handleCheckbox}
                checked={roles_selected.some((rs) => rs.GUID === role.GUID)}
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
