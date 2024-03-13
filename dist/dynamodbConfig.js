"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamodb = exports.dynamodbConfig = void 0;
// dynamodbConfig.ts
const aws_sdk_1 = __importDefault(require("aws-sdk"));
exports.dynamodbConfig = {
    region: process.env.REGION || 'localhost',
    endpoint: process.env.URL || 'http://localhost:8000'
};
exports.dynamodb = new aws_sdk_1.default.DynamoDB(exports.dynamodbConfig);
