
import app from "./app";
import config from "./app/config";

const main = async () => {
    try {
        app.listen(config.port , () => {
            console.log(`The server is running on port ${config.port} !`) ;
        })
    }catch(error) {
        console.log(error) ;   
    }
}

main() ;
