import { open, Database } from "sqlite";
import * as sqlite3 from "sqlite3";
import { existsSync, mkdirSync, unlinkSync } from "fs";
import { v4 as uuidv4 } from "uuid";

const folder = "./be/sqlite";
const dbPath = `${folder}/data.db`;

if (!existsSync(folder)) {
  mkdirSync(folder);
}

if (existsSync(dbPath)) {
  unlinkSync(dbPath);
}

async function seed(db: Database) {
  await db.run(`
    CREATE TABLE Users (
      GUID TEXT PRIMARY KEY,
      FullName TEXT,
      PicturePath TEXT
    );
  `);

  const users = [
    {
      GUID: uuidv4(),
      FullName: "James T. Kirk",
      PicturePath: "kirk.jpg",
    },
    { GUID: uuidv4(), FullName: "Spock", PicturePath: "spock.jpg" },
    {
      GUID: uuidv4(),
      FullName: "Leonard McCoy",
      PicturePath: "mccoy.jpg",
    },
    {
      GUID: uuidv4(),
      FullName: "Montgomery Scott",
      PicturePath: "scott.jpg",
    },
    { GUID: uuidv4(), FullName: "Uhura", PicturePath: "uhura.jpg" },
    {
      GUID: uuidv4(),
      FullName: "Hikaru Sulu",
      PicturePath: "sulu.jpg",
    },
    {
      GUID: uuidv4(),
      FullName: "Pavel Chekov",
      PicturePath: "chekov.jpg",
    },
    {
      GUID: uuidv4(),
      FullName: "Jean-Luc Picard",
      PicturePath: "picard.jpg",
    },
    {
      GUID: uuidv4(),
      FullName: "William Riker",
      PicturePath: "riker.jpg",
    },
    { GUID: uuidv4(), FullName: "Data", PicturePath: "data.jpg" },
    {
      GUID: uuidv4(),
      FullName: "Geordi La Forge",
      PicturePath: "laforge.jpg",
    },
    { GUID: uuidv4(), FullName: "Worf", PicturePath: "worf.jpg" },
    {
      GUID: uuidv4(),
      FullName: "Deanna Troi",
      PicturePath: "troi.jpg",
    },
    {
      GUID: uuidv4(),
      FullName: "Beverly Crusher",
      PicturePath: "crusher.jpg",
    },
    {
      GUID: uuidv4(),
      FullName: "Wesley Crusher",
      PicturePath: "wesley.jpg",
    },
  ];

  for (const user of users) {
    await db.run(
      `INSERT INTO Users (GUID, FullName, PicturePath) VALUES (?, ?, ?)`,
      [user.GUID, user.FullName, user.PicturePath]
    );
  }

  await db.run(`
    CREATE TABLE Roles (
      GUID TEXT PRIMARY KEY,
      Name TEXT
    );
  `);

  const roles = [
    { GUID: uuidv4(), Name: "Ensign" },
    { GUID: uuidv4(), Name: "Lieutenant Junior Grade" },
    { GUID: uuidv4(), Name: "Lieutenant" },
    { GUID: uuidv4(), Name: "Lieutenant Commander" },
    { GUID: uuidv4(), Name: "Commander" },
    { GUID: uuidv4(), Name: "Captain" },
    { GUID: uuidv4(), Name: "Rear Admiral Lower Half" },
    { GUID: uuidv4(), Name: "Rear Admiral Upper Half" },
    { GUID: uuidv4(), Name: "Vice Admiral" },
    { GUID: uuidv4(), Name: "Admiral" },
    { GUID: uuidv4(), Name: "Fleet Admiral" },
  ];

  for (const role of roles) {
    await db.run(`INSERT INTO Roles (GUID, Name) VALUES (?, ?)`, [
      role.GUID,
      role.Name,
    ]);
  }

  await db.run(`
    CREATE TABLE Apps (
      GUID TEXT PRIMARY KEY,
      Name TEXT,
      IconPath TEXT,
      URL TEXT
    );
  `);

  const apps = [
    {
      GUID: uuidv4(),
      Name: "USS Enterprise (NCC-1701)",
      IconPath: "/path/to/enterprise.jpg",
      URL: "https://en.wikipedia.org/wiki/USS_Enterprise_(NCC-1701)",
    },
    {
      GUID: uuidv4(),
      Name: "USS Enterprise (NCC-1701-D)",
      IconPath: "/path/to/enterprise_d.jpg",
      URL: "https://en.wikipedia.org/wiki/USS_Enterprise_(NCC-1701-D)",
    },
    {
      GUID: uuidv4(),
      Name: "USS Voyager (NCC-74656)",
      IconPath: "/path/to/voyager.jpg",
      URL: "https://en.wikipedia.org/wiki/USS_Voyager_(Star_Trek)",
    },
    {
      GUID: uuidv4(),
      Name: "USS Defiant (NX-74205)",
      IconPath: "/path/to/defiant.jpg",
      URL: "https://en.wikipedia.org/wiki/USS_Defiant",
    },
    {
      GUID: uuidv4(),
      Name: "USS Discovery (NCC-1031)",
      IconPath: "/path/to/discovery.jpg",
      URL: "https://en.wikipedia.org/wiki/USS_Discovery_(Star_Trek)",
    },
  ];

  for (const app of apps) {
    await db.run(
      `INSERT INTO Apps (GUID, Name, IconPath, URL) VALUES (?, ?, ?, ?)`,
      [app.GUID, app.Name, app.IconPath, app.URL]
    );
  }

  await db.run(`
    CREATE TABLE User_Role (
      UserGUID TEXT,
      RoleGUID TEXT,
      PRIMARY KEY(UserGUID, RoleGUID),
      FOREIGN KEY(UserGUID) REFERENCES User(GUID),
      FOREIGN KEY(RoleGUID) REFERENCES Role(GUID)
    );
  `);

  await db.run(`
    CREATE TABLE Role_App (
      RoleGUID TEXT,
      ApplicationGUID TEXT,
      PRIMARY KEY(RoleGUID, ApplicationGUID),
      FOREIGN KEY(RoleGUID) REFERENCES Role(GUID),
      FOREIGN KEY(ApplicationGUID) REFERENCES Application(GUID)
    );
  `);
}

open({
  filename: dbPath,
  driver: sqlite3.Database,
}).then((database) => {
  seed(database).then(() => {
    console.log("Database seeded successfully.");
  });
});
