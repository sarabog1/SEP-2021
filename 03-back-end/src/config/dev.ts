import IConfig from './IConfig.interface';
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

        }
    },
};

export default Config;