import React, { useEffect } from "react";
import fs from "fs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, actions } from "./store";
import { App } from "../common";
import { refreshRoleApp } from "./role_app";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

export const refreshApps = (dispatch: AppDispatch) => {
  fetch(`//${location.hostname}:${config.port.be}/apps`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => dispatch(actions.gotApps(data)))
    .catch((error) => {
      console.error("Error:", error);
      dispatch(actions.fetchFailed(error.message));
    });
};

export default () => {
  const dispatch: AppDispatch = useDispatch();
  const apps = useSelector((state: RootState) => state.props.apps);
  const apps_selected = useSelector(
    (state: RootState) => state.props.apps_selected
  );

  const handleCheckbox = (e: React.MouseEvent<HTMLInputElement>) => {
    const app: App = JSON.parse(e.currentTarget.dataset.app || "");
    if (apps_selected.some((as) => as.GUID === app.GUID)) {
      dispatch(actions.appsSelectedRm(app));
    } else {
      dispatch(actions.appsSelectedAdd(app));
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const app: App = JSON.parse(e.currentTarget.dataset.app || "");
    fetch(`//${location.hostname}:${config.port.be}/apps/${app.GUID}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        refreshApps(dispatch);
        refreshRoleApp(dispatch);
      })
      .catch((error) => {
        console.error("Error:", error);
        dispatch(actions.fetchFailed(error.message));
      });
  };

  useEffect(() => {
    refreshApps(dispatch);
  }, []);

  return (
    <div className="dataTable">
      <h1>
        Apps<span title="Add app (WiP)">+</span>
      </h1>
      <div>
        {apps.map((app) => (
          <div key={app.GUID}>
            <div title={app.GUID}>{app.GUID}</div>
            <div title={app.Name}>{app.Name}</div>
            <div title={app.IconPath}>{app.IconPath}</div>
            <div title={app.URL}>
              <a href={app.URL} target="_blank">
                {app.URL}
              </a>
            </div>
            <div>
              <input
                type="checkbox"
                title="Select row"
                data-app={JSON.stringify(app)}
                onClick={handleCheckbox}
                checked={apps_selected.some((sa) => sa.GUID === app.GUID)}
                onChange={() => {}}
              />
            </div>
            <div
              onClick={handleDelete}
              data-app={JSON.stringify(app)}
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
