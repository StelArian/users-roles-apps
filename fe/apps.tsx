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
        {feed.map((item) => (
          <div key={item.GUID}>
            <div title={item.GUID}>{item.GUID}</div>
            <div title={item.Name}>{item.Name}</div>
            <div title={item.iconPath}>{item.iconPath}</div>
            <div title={item.URL}>{item.URL}</div>
            <div><input type="checkbox" /></div>
            <div>🗑</div>
            <div>✏️</div>
          </div>
        ))}
      </div>
    </div>
  );
};
