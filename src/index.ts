import http from "http";
import express, { Express } from "express";
import config from "config";
import morgan from "morgan";

const port: string = process.env.PORT ?? config.get("server.port");
const app: Express = express();

//**Logging */
app.use(morgan("dev"));
/** Parse the request */
app.use(express.urlencoded({ extended: false }));
//**Take care of JSON data*/
app.use(express.json());

app.use((request, response, next) => {
  // set the CORS policy
  request.headers["access-control-allow-origin"] = "*";
  // set the CORS headers
  request.headers["access-control-allow-headers"] =
    "origin, X-Requested-With, Content-Type, Accept, Authorization";
  // set the CORS method headers
  if (request.method === "OPTIONS") {
    response.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return response.status(200).json({});
  }
  next();
});

/** Error handler */
app.use((request, response, next) => {
  return response.status(404).json({
    status: false,
    message: "not found",
  });
});

/**Starting server */
const httpServer = http.createServer(app);
httpServer.listen(port, () => {
  console.log(
    `The server is running on port ${port} in ${config.util.getEnv(
      "NODE_ENV"
    )} environment.`
  );
});
