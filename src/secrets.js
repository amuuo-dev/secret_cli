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
  const secrets = await getAllSecrets();

  return secrets.filter((secret) =>
    secret.content.toLowerCase().includes(filter.toLowerCase())
  );
};

export const removeSecret = async (id) => {
  const secrets = await getAllSecrets();
  const match = secrets.find((secret) => secret.id === id);
  if (match) {
    const newSecrets = secrets.filter((secret) => secret.id !== id);
    await saveDB({ secrets: newSecrets });
    return id;
  }
};

export const removeAllSecrets = async () => {
  await saveDB({ secrets: [] });
};
