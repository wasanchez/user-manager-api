import express, {Application as ExApplication } from "express";
import morgan from "morgan";
import routes  from "./routes/userRoutes";
import AppDataSource from "./datasources/AppDataSource";

class Application {
    private readonly _instance: ExApplication;

    get instance() : ExApplication {
        return this._instance;
    }

    constructor() {
        this._instance = express();
        this.initialize();
    }

    private initialize() : void {
        this.use();
        this.registerRoutes();
        this.initilizeDataSource();
    }

    private registerRoutes() : void {
        this._instance.use("/api/users", routes);
    }

    private use() : void {
        this._instance.use(express.json());
        //**Logging */
        this._instance.use(morgan("dev"));
        /** Parse the request */
        this._instance.use(express.urlencoded({ extended: false }));
    }

    private initilizeDataSource() : void {
        //Initialize the datasource
        AppDataSource.instance.initialize()
        .then(() =>  console.info("Connected to the database."))
        .catch((ex) => console.error("Unexpected error has occurred.\nError: ", ex));
    }
}

export default new Application();