"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Work = void 0;
const database_1 = __importDefault(require("../database"));
class Work {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from work;';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    async show(slug) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from work where slug =($1);';
            const res = await conn.query(sql, [slug]);
            conn.release();
            return res.rows[0];
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
}
exports.Work = Work;
