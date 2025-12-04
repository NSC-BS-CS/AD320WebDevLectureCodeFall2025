import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: //Something here,
  storage: //Something here,
  logging: true,
});

export default sequelize;
