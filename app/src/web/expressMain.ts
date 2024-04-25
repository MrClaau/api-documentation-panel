import { createServer } from "https";
import { Main } from "..";
import express, { Application, Router } from "express";
import { existsSync, readFileSync } from "fs";
import bodyParser from "body-parser";
import path from "path";

export class ExpressMain {

    main:Main;
    web: Application = express();

    constructor(main: Main) {
        this.main = main;

        if (process.env.SSL === 'true') {
            if (!existsSync(process.env.SSL_PRIVATEKEY || `./asdft.jsen`) || !existsSync(process.env.SSL_FULLCHAIN || `./asdft.jsen`)) {
                console.log(`[ERROR] Para que funcione con el modo SSL activado debe estiular la ruta del certificado.`);
                process.exit();
            }
            const privateKey = readFileSync(process.env.SSL_PRIVATEKEY || `./asdft.jsen`);
            const certificate = readFileSync(process.env.SSL_FULLCHAIN || `./asdft.jsen`);

            createServer({
                key: privateKey,
                cert: certificate
            }, this.web).listen(process.env.WEB_PORT || 443);
            console.log(`Servidor web abierto en puerto ${process.env.WEB_PORT || 443}`);
        } else {
            this.web.listen(process.env.WEB_PORT || 80);
            console.log(`Servidor web abierto en puerto ${process.env.WEB_PORT || 80}`);
        }
        this.web.use(bodyParser.urlencoded({ extended: true }));
        this.web.use(bodyParser.json());

        this.web.all(`*`, (req, res, next) => {
            res.setHeader(`Access-Control-Allow-Origin`, `*`);
            res.setHeader('Access-Control-Allow-Methods', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');
            next();
        });

        const api = express.Router();
        this.web.use(`/api`, api);

        api.get(`/methods`, (req, res) => {

            const methods = main.getConfig(`config`).methods;

            const response:any = {
                categories: []
            }

            for (let i = 0; i < methods.length; i++) {
                const method = methods[i];

                const category:any = {
                    icon: method.faIcon,
                    title: method.title,
                    pages: []
                }

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

        })

        api.get(`/page/:id`, (req, res) => {

            const id = req.params.id;

            const pages = main.getConfig(`config`).pages;

            const page_info = pages[id];

            res.send(page_info);

        })

        api.get(`/home`, (req, res) => {
            const homePage = readFileSync(`configs/homePage.html`).toString();
            res.send({homePage: homePage});
        })

        api.get(`/config`, (req, res) => {

            const config = main.getConfig(`config`);

            const response = {
                title: config.site.title,
                homePageTitle: config.site.homeTitle
            }

            res.send(response);

        })

        this.web.use(express.static(path.join(__dirname, "../../frontend/")));

        this.web.get("*", function (req, res) {
            res.sendFile(path.join(__dirname, "../../frontend", "index.html"));
        });

    }

}