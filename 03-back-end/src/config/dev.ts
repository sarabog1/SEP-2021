import IConfig from '../common/IConfig.interface';
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
    }
};

export default Config;