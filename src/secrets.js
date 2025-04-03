import { getDB, insertDB, saveDB } from "./db.js";

export const newSecret = async (secret, tags) => {
  const data = {
    tags,
    content: secret,
    id: Date.now(),
  };
  await insertDB(data);
  return data;
};

export const getAllSecrets = async () => {
  const data = await getDB();
  return data.secrets;
};

export const findSecret = async (filter) => {
  const secrets = await getDB();
  return secrets.filter((secret) =>
    secret.content.toLowerCase().includes(filter.toLowerCase())
  );
};

export const removeSecret = async (id) => {
  const secrets = await getDB();
  const match = secrets.find((secret) => secret.id === id);
  if (match) {
    const newSecret = secrets.filter((secret) => secret.id !== id);
    await saveDB({ secrets: { newSecret } });
    return id;
  }
};

export const removeAllSecrets = async () => {
  await saveDB({ secrets: [] });
};
