import { Sequelize } from "sequelize-typescript";
import Player from "../models/Player/Player";
import EnvVars from "@src/constants/EnvVars";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const connection = new Sequelize(EnvVars.ORM.Database, EnvVars.ORM.User, EnvVars.ORM.Password, {
    dialect: "postgres",
    host: EnvVars.ORM.Host,
    port: EnvVars.ORM.Port,
    define:{ collate: "utf8_general_ci", charset: "utf8"},
});


function Prepare(){
    connection.addModels([Player]);
}




async function Sincronize(): Promise<void>{
    await connection.authenticate();

    if(EnvVars.ORM.Dialect == "postgres"){
        await connection.query("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";");
    }

    await connection.sync({force:true});
}




export default {
    Connection: connection,
    Sincronize,
    Prepare,
};

