"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlanets = void 0;
// planetsService.ts
const dynamodbConfig_1 = require("../../dynamodbConfig");
function getAllPlanets() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const params = {
                TableName: 'planetas' //tabla
            };
            const data = yield dynamodbConfig_1.dynamodb.scan(params).promise(); // escanear
            console.info("Obteniendo todos los planetas guardados en db");
            return data.Items;
        }
        catch (error) {
            console.error("Error al obtener los planetas:", error);
            throw error;
        }
    });
}
exports.getAllPlanets = getAllPlanets;
