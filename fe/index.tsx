import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.scss";
import Users from "./users";
import Roles from "./roles";
import Apps from "./apps";
import UserRole from "./user_role";
import RoleApp from "./role_app";
import { store } from "./store";

const App = () => (
  <Provider store={store}>
    <div>
      <div className="lists">
        <div>
          <Users />
        </div>
        <div>
          <Roles />
        </div>
        <div>
          <Apps />
        </div>
      </div>
      <div className="buttons">
        <div></div>
        <div style={{ textAlign: "left" }}>
          <button>↘ Join selected to User+Role ↙</button>
        </div>
        <div style={{ textAlign: "right" }}>
          <button>↘ Join selected to Role+App ↙</button>
        </div>
        <div></div>
      </div>
      <div className="groups">
        <div>
          <UserRole />
        </div>
        <div>
          <RoleApp />
        </div>
      </div>
    </div>
  </Provider>
);

const root = document.getElementById("root");

if (root !== null) {
  ReactDOM.render(<App />, root);
}
