"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drugs_1 = require("../models/drugs");
const drug_obj = new drugs_1.Drugs();
//return all brands in database
async function index(req, res) {
    try {
        const resault = await drug_obj.index();
        res.status(200).json({ result: resault });
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return only one brand from databse using id in request params
async function show(req, res) {
    try {
        const resault = await drug_obj.show(req.params.slug);
        if (resault == undefined)
            return res.status(400).json('row not exist');
        res.status(200).json(resault);
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
function mainRoutes(app) {
    app.get('/drugs', index);
    app.get('/drugs/:slug', show);
}
exports.default = mainRoutes;
