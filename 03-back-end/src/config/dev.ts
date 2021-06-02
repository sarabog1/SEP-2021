import IConfig from '../common/IConfig.interface';
import * as dotenv from "dotenv";
import { readFileSync } from "fs";

const dotEnvResult = dotenv.config();

if (dotEnvResult.error) throw "The enviroment file error:" + dotEnvResult.error;

const Config: IConfig = {
    server: {
        port: 40080,
        static: {
            path: "./static/",
            route: "/static",
            cacheControl: false,
            dotfiles: "deny",
            etag: false,
            index: false,
            maxAge: 3600000

        },
    }, 
    database: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "salon_app",
        charset: "utf8",
        timezone: "+01:00"
    },
    mail: {
        hostname: process.env?.MAIL_HOST,
        port: +(process.env?.MAIL_PORT),
        secure: process.env?.MAIL_SECURE === "true",
        username: process.env?.MAIL_USERNAME,
        password: process.env?.MAIL_PASSWORD,
        fromEmail: process.env?.MAIL_FROM,
        debug: true
    },
    auth:{
        admin:{
            algorithm:"RS256",
            issuer:"localhost",
            auth:{
                duration: 60*60*24*7, // samo dok radio razvoj: 60*60*5
                public:readFileSync("keystore/admin-auth.public", "utf-8"),
                private:readFileSync("keystore/admin-auth.private", "utf-8"),
            },
            refresh:{
                duration: 60*60*24*365, 
                public:readFileSync("keystore/admin-refresh.public", "utf-8"),
                private:readFileSync("keystore/admin-refresh.private", "utf-8"),
            }
        },
        allowRequestsEvenWithoutValidTokens: true,
    }
};

export default Config;