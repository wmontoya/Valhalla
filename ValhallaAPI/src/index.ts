import "reflect-metadata";
import * as dotenv from 'dotenv';
import { startServer } from "./app";
import { connect } from "./config/typeorm.config";

async function main() {
    dotenv.config();
    connect();
    const app = await startServer();
    app.listen(3000);
    var bodyParser = require('body-parser');
    app.use(bodyParser.json({limit: '200mb'}));
    app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
    console.log("Server  Listening on http://localhost:" + 3000);

}
main();