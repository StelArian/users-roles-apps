import React, { useEffect, useState } from "react";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

export default () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    fetch(`//${location.hostname}:${config.port.be}/users`)
      .then((response) => response.json())
      .then((data) => setFeed(data));
  }, []);

  return (
    <div className="dataTable">
      <h1>Users<span>+</span></h1>
      <div>
        {feed.map((item) => (
          <div key={item.GUID}>
            <div title={item.GUID}>{item.GUID}</div>
            <div title={item.FullName}>{item.FullName}</div>
            <div title={item.PicturePath}>{item.PicturePath}</div>
            <div><input type="checkbox" /></div>
            <div>🗑</div>
            <div>✏️</div>
          </div>
        ))}
      </div>
    </div>
  );
};
