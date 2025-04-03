import fs from "fs/promises";

const DB_PATH = new URL("../db.json", import.meta.url).pathname;

export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};

export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};

export const insertDB = async (data) => {
  const db = await getDB();
  db.secrets.push(data);
  await saveDB(db);
  return data;
};
