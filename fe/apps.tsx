import React, { useEffect } from "react";
import fs from "fs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, actions } from "./store";
import { App } from "../common";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

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

  useEffect(() => {
    fetch(`//${location.hostname}:${config.port.be}/apps`)
      .then((response) => response.json())
      .then((data) => dispatch(actions.gotApps(data)));
  }, []);

  return (
    <div className="dataTable">
      <h1>
        Apps<span title="Add app">+</span>
      </h1>
      <div>
        {apps.map((app) => (
          <div key={app.GUID}>
            <div title={app.GUID}>{app.GUID}</div>
            <div title={app.Name}>{app.Name}</div>
            <div title={app.IconPath}>{app.IconPath}</div>
            <div title={app.URL}>{app.URL}</div>
            <div>
              <input
                type="checkbox"
                data-app={JSON.stringify(app)}
                onClick={handleCheckbox}
                checked={apps_selected.some((sa) => sa.GUID === app.GUID)}
                onChange={() => {}}
              />
            </div>
            <div>🗑</div>
            <div>✏️</div>
            {/* TODO: launch app rocket */}
          </div>
        ))}
      </div>
    </div>
  );
};
