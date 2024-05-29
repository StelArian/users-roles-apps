import React, { useEffect, useState } from "react";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

export default () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    fetch(`//${location.hostname}:${config.port.be}/apps`)
      .then((response) => response.json())
      .then((data) => setFeed(data));
  }, []);

  return (
    <div className="dataTable">
      <h1>Apps<span>+</span></h1>
      <div>
        {feed.map((user) => (
          <div key={user.GUID}>
            <div>{user.GUID}</div>
            <div>{user.Name}</div>
            <div>{user.iconPath}</div>
            <div>{user.URL}</div>
            <div><input type="checkbox" /></div>
            <div>🗑</div>
            <div>✏️</div>
          </div>
        ))}
      </div>
    </div>
  );
};
