import config from "config"
import { DataSource } from "typeorm"
import { User } from "../entities/User"

class AppDataSource {
  private readonly _datasource : DataSource;

  get instance() : DataSource {
    return this._datasource;
  }

  constructor() {
    this._datasource = new DataSource({
      type: "sqlite",
      database: config.get<string>("database.db"),
      entities: [User],
      synchronize: true,
      logging: true,
    });
  }
}

export default new AppDataSource();