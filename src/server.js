import http from "http";
import open from "open";
import fs from "fs/promises";

//a regex to remove all the html and make this see the notes
const interpolate = (html, data) => {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || "";
  });
};

const formatSecrets = (secrets) => {
  return secrets
    .map((secret) => {
      return `
         <div class="note">
        <p>${secret.content}</p>
        <div class="tags">
          ${secret.tags
            .map((tag) => `<span class="tag">${tag}</span>`)
            .join("")}
        </div>
      </div>
        `;
    })
    .join("/n");
};

const createServer = async (secrets) => {
  return http.createServer(async (req, res) => {
    const HTML_PATH = new URL("./template.html", import.meta.url).pathname;
    const template = await fs.readFile(HTML_PATH, "utf-8");
    const html = interpolate(template, { secrets: formatSecrets(secrets) });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
};

export const start = (secrets, port) => {
  const server = createServer(secrets);
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  open(`http://localhost:${port}`);
};
