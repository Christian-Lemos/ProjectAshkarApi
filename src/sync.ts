import "./pre-start"; // Must be the first import
import OrmSetUp from "@src/SetUp/OrmSetUp";

async function sync(){
    OrmSetUp.Prepare();
    await OrmSetUp.Sincronize();
}

sync();