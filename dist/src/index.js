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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// index.ts handler para el manjo de end points
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const planetsService_1 = require("./services/planetsService");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000; // Puerto predeterminado o 8000 si no está definido
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
// Ruta para obtener todos los planetas
app.get("/planetas", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planetas = yield (0, planetsService_1.getAllPlanets)(); // Cambio en la llamada a la función
        return res.status(200).json(planetas); // Devuelve los resultados
    }
    catch (error) {
        console.error("Error al obtener los planetas:", error);
        return res.status(500).json({ error: "Error al obtener los planetas" });
    }
}));
// Ruta de ejemplo
app.get("/path", (req, res, next) => {
    return res.status(200).json({
        message: "Hello from path!",
    });
});
// Manejador para rutas no encontradas
app.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    });
});
// Exporta la aplicación para serverless
exports.handler = (0, serverless_http_1.default)(app);
