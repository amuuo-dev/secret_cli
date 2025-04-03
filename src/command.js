import yargs, { argv } from "yargs";
import { hideBin } from "yargs/helpers";

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
    async (argv) => {}
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
    async (argv) => {}
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
    async (argv) => {}
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
    async (argv) => {}
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
    async () => {}
  )
  .command(
    "clean",
    "remove all secrets",
    () => {},
    async () => {}
  )
  .demandCommand(1)
  .parse();
