"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressMain = void 0;
const https_1 = require("https");
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
class ExpressMain {
    constructor(main) {
        this.web = (0, express_1.default)();
        this.main = main;
        if (process.env.SSL === 'true') {
            if (!(0, fs_1.existsSync)(process.env.SSL_PRIVATEKEY || `./asdft.jsen`) || !(0, fs_1.existsSync)(process.env.SSL_FULLCHAIN || `./asdft.jsen`)) {
                console.log(`[ERROR] Para que funcione con el modo SSL activado debe estiular la ruta del certificado.`);
                process.exit();
            }
            const privateKey = (0, fs_1.readFileSync)(process.env.SSL_PRIVATEKEY || `./asdft.jsen`);
            const certificate = (0, fs_1.readFileSync)(process.env.SSL_FULLCHAIN || `./asdft.jsen`);
            (0, https_1.createServer)({
                key: privateKey,
                cert: certificate
            }, this.web).listen(process.env.WEB_PORT || 443);
            console.log(`Servidor web abierto en puerto ${process.env.WEB_PORT || 443}`);
        }
        else {
            this.web.listen(process.env.WEB_PORT || 80);
            console.log(`Servidor web abierto en puerto ${process.env.WEB_PORT || 80}`);
        }
        this.web.use(body_parser_1.default.urlencoded({ extended: true }));
        this.web.use(body_parser_1.default.json());
        this.web.all(`*`, (req, res, next) => {
            res.setHeader(`Access-Control-Allow-Origin`, `*`);
            res.setHeader('Access-Control-Allow-Methods', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');
            next();
        });
        const api = express_1.default.Router();
        this.web.use(`/api`, api);
        api.get(`/methods`, (req, res) => {
            const methods = main.getConfig(`config`).methods;
            const response = {
                categories: []
            };
            for (let i = 0; i < methods.length; i++) {
                const method = methods[i];
                const category = {
                    icon: method.faIcon,
                    title: method.title,
                    pages: []
                };
                for (let i = 0; i < method.pages.length; i++) {
                    const page = method.pages[i];
                    const page_info = main.getConfig(`config`).pages[page];
                    category.pages.push({
                        id: page,
                        type: page_info.type,
                        title: page_info.title,
                        description: page_info.description,
                        testurl: page_info.testurl,
                        params: page_info.params,
                        observation: page_info.observation
                    });
                }
                response.categories.push(category);
            }
            res.send(response);
        });
        api.get(`/page/:id`, (req, res) => {
            const id = req.params.id;
            const pages = main.getConfig(`config`).pages;
            const page_info = pages[id];
            res.send(page_info);
        });
        api.get(`/home`, (req, res) => {
            const homePage = (0, fs_1.readFileSync)(`configs/homePage.html`).toString();
            res.send({ homePage: homePage });
        });
        api.get(`/config`, (req, res) => {
            const config = main.getConfig(`config`);
            const response = {
                title: config.site.title,
                homePageTitle: config.site.homeTitle
            };
            res.send(response);
        });
        this.web.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/")));
        this.web.get("*", function (req, res) {
            res.sendFile(path_1.default.join(__dirname, "../../frontend", "index.html"));
        });
    }
}
exports.ExpressMain = ExpressMain;
