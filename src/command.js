import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  getAllSecrets,
  newSecret,
  removeSecret,
  findSecret,
  removeAllSecrets,
} from "./secrets.js";
import { start } from "./server.js";

const listSecrets = (secrets) => {
  secrets.forEach((secret) => {
    console.log("id: ", secret.id);
    console.log("tags: ", secret.tags.join(", ")),
      console.log("secret: ", secret.content);
  });
};

yargs(hideBin(process.argv))
  .command(
    "add <secret>",
    "create a new secret",
    (yargs) => {
      return yargs.positional("secret", {
        description: "the content of the secret you want to create",
        type: "string",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const secret = await newSecret(argv.secret, tags);
      console.log("secret added!", secret.id);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to the secret",
  })
  .command(
    "all",
    "get all secrets saved",
    () => {},
    async (argv) => {
      const data = await getAllSecrets();
      listSecrets(data);
    }
  )
  .command(
    "find <filter>",
    "get matching secret",
    (yargs) => {
      return yargs.positional("filter", {
        type: "string",
        describe:
          "The search term to filter secret by, will be applied to secret.content",
      });
    },
    async (argv) => {
      const filter = await findSecret(argv.filter);
      listSecrets(filter);
    }
  )
  .command(
    "remove <id>",
    "remove a secret by its id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "the id of the secret you want to remove",
      });
    },
    async (argv) => {
      const id = await removeSecret(argv.id);
      if (id) {
        console.log("Secret removed: ", id);
      } else {
        console.log("Secret not found");
      }
    }
  )
  .command(
    "web [port]",
    "launch website to see all the secret",
    (yargs) => {
      yargs.positional("port", {
        type: "number",
        default: 5000,
        description: "port to bind on",
      });
    },
    async (argv) => {
      const secrets = await getAllSecrets();
      start(secrets, argv.port);
    }
  )
  .command(
    "clean",
    "remove all secrets",
    () => {},
    async () => {
      await removeAllSecrets();
      console.log("All secrets removed");
    }
  )
  .demandCommand(1)
  .parse();
