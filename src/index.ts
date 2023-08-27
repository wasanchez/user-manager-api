import http from "http";
import config from "config";
import application from "./application";
import "reflect-metadata";

//Gets the server port
const port: string = process.env.PORT ?? config.get<string>("server.port");


// app.use((request, response, next) => {
//   // set the CORS policy
//   request.headers["access-control-allow-origin"] = "*";
//   // set the CORS headers
//   request.headers["access-control-allow-headers"] = "origin, X-Requested-With, Content-Type, Accept, Authorization";
 
//   if (request.method === "OPTIONS") {
//     response.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
//     return response.status(200).json({});
//   }
//   next();
// });


/** Error handler */
/*
app.use((request, response, next) => {
  return response.status(404).json({
    status: false,
    message: "not found",
  });
});
*/

/**Starting server */
const httpServer = http.createServer(application.instance);
httpServer.listen(port, () => {
  console.log(
    `The server is running on port ${port} in the ${config.util.getEnv(
      "NODE_ENV"
    )} environment.`
  );
});
