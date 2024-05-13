import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "ep-floral-glade-a1xtdkzb.ap-southeast-1.aws.neon.tech",
  username: "novinbukannopin",
  password: "zX3n0KYeNlpP",
  database: "spotify",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: false,
  migrations: ["dist/database/migrations/*{.ts,.js}"],
  ssl: true
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;