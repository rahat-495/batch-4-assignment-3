
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

const main = async () => {
    try {

        await mongoose.connect(config.databaseUrl as string) ;

        app.listen(config.port , () => {
            console.log(`The server is running on port ${config.port} !`) ;
        })
    }catch(error) {
        console.log(error) ;   
    }
}

main() ;
