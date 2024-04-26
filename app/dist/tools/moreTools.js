"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoreTools = void 0;
class MoreTools {
    static removeInt(array, item_eliminado) {
        var newarray = array.filter(function (item) {
            return item != item_eliminado;
        });
        if (newarray == undefined)
            return array;
        return newarray;
    }
    static removeString(array, item_eliminado) {
        var newarray = array.filter(function (item) {
            return item != item_eliminado;
        });
        if (newarray == undefined)
            return array;
        return newarray;
    }
    static removeResponse(array, item_eliminado) {
        var newarray = array.filter(function (item) {
            return item != item_eliminado;
        });
        if (newarray == undefined)
            return array;
        return newarray;
    }
    static jsonParser(string) {
        try {
            return JSON.parse(string);
        }
        catch (error) {
            console.log(`\u001B[31m[ERROR] \u001B[33mJSON parse failed.\nJSON:${string}\nError:\n\u001B[31m${error}\u001B[37m`);
            return undefined;
        }
    }
    static generateRandomString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
    static getRandomNumber(inferior, superior) {
        var numPosibilidades = superior - inferior;
        var aleatorio = Math.random() * (numPosibilidades + 1);
        aleatorio = Math.floor(aleatorio);
        return inferior + aleatorio;
    }
    static shuffle(array) {
        let currentIndex = array.length, randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }
        return array;
    }
}
exports.MoreTools = MoreTools;
