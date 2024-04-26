"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const fs_1 = require("fs");
const dotenv_1 = __importDefault(require("dotenv"));
const expressMain_1 = require("./web/expressMain");
class Main {
    constructor() {
        this.configs = new Map();
        dotenv_1.default.config();
        this.loadConfig("config");
        new expressMain_1.ExpressMain(this);
    }
    loadConfig(name) {
        var file = (0, fs_1.readFileSync)(`configs/${name}.json`, { encoding: 'utf8', flag: 'r' });
        try {
            this.configs.set(name, JSON.parse(file));
        }
        catch (error) {
            console.log(`Error al cargar la config ${name}, error: ` + error);
        }
    }
    getConfig(name) {
        if (this.configs.has(name)) {
            return this.configs.get(name);
        }
        else {
            return {};
        }
    }
    saveConfig(name) {
        (0, fs_1.writeFileSync)('configs/' + name + '.json', JSON.stringify(this.getConfig(name)));
    }
}
exports.Main = Main;
new Main();
