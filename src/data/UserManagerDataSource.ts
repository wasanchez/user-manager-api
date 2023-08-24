import config from "config";
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/User"

export class UserManagerDataSource {
  private readonly _appdatasource: DataSource;

  constructor() {
    this._appdatasource = new DataSource({
      type: "sqlite",
      database: config.get<string>("database.db"),
      //entities: ["/../**/*.{js,ts}"],
      // entities: [__dirname + "/src/entities/*.ts"],
      entities: [__dirname + "/src/entities/*.ts"],
      synchronize: false,
      logging: true,
    });
  }

  public getDataSource(): DataSource {
    return this._appdatasource;
  }

  public initilize() : void {
    //Initilize the connection with the database, register all entities
    //and syncrhonize database schema
    console.log("Initializing data source...");
    this._appdatasource
      .initialize()
      .then(() => console.info("The data source has been created successfully!"))
      .catch((error) =>
        console.error("Unexpected error has occurred.\nError: ", error)
      );
  }
}

