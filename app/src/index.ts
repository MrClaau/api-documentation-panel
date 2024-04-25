import { readFileSync, writeFileSync } from "fs";
import dotenv from 'dotenv';
import { ExpressMain } from "./web/expressMain";
import { dirname } from "path";

export class Main {

    private configs:Map<string, any> = new Map();

    constructor() {
        dotenv.config();
        this.loadConfig("config");

        new ExpressMain(this);

    }

    loadConfig(name:string){

        var file:any = readFileSync(`configs/${name}.json`,
        {encoding:'utf8', flag:'r'});

        try {
            this.configs.set(name, JSON.parse(file));
        } catch (error) {
            console.log(`Error al cargar la config ${name}, error: ` + error);
        }

    }

    getConfig(name:string){

        if (this.configs.has(name)) {
            return this.configs.get(name);
        }else{
            return {};
        }

    }

    saveConfig(name:string){

        writeFileSync('configs/' + name + '.json', JSON.stringify(this.getConfig(name)));

    }

}

new Main();