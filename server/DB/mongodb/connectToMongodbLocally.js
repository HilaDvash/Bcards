const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose
  .connect(
    "mongodb+srv://hiladvash5d:LXVzfHYQPxbdvytx@cluster0.pqdoykb.mongodb.net/business_card_app"
  )
  .then(() => console.log(chalk.magentaBright("connected to MongoDb Locally!")))
  .catch((error) =>
    console.log(chalk.redBright.bold(`could not connect to mongoDb: ${error}`))
  );
