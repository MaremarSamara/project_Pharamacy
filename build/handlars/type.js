"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../models/type");
const type_obj = new type_1.Type();
//return all brands in database
async function index(req, res) {
    try {
        const resault = await type_obj.index();
        res.status(200).json(resault);
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return only one brand from databse using id in request params
async function show(req, res) {
    try {
        const resault = await type_obj.show(req.params.slug);
        if (resault == undefined)
            return res.status(400).json('row not exist');
        res.status(200).json(resault);
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
function mainRoutes(app) {
    app.get('/types', index);
    app.get('/types/:slug', show);
}
exports.default = mainRoutes;
