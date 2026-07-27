import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  //   error warn info http verbose debug silly log everything from info-> info, warn, error & leave the remaining
  // this line sets the minimum severity the logger should process.
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }), //stack:true lets us know the error stack. From where to where the error is thrown
    format.json(),
  ), //This is how the logs are formatted

  transports: [
    new transports.Console(), //without this transport nothing would appear in the console

    new transports.File({
      //save this in file as well
      filename: "logs/error.log",
      level: "error", //only error is saved to files , so when a prod error occurs, we can fix them
    }),

    new transports.File({
      //This saves from the users default level, which is info in our project.
      filename: "logs/combined.log",
    }),
  ],
});

export default logger;
