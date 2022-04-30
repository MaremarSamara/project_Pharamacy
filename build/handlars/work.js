"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const work_1 = require("../models/work");
const work_obj = new work_1.Work();
//return all brands in database
async function index(req, res) {
    try {
        const resault = await work_obj.index();
        res.status(200).json({ result: resault });
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return only one brand from databse using id in request params
async function show(req, res) {
    try {
        const resault = await work_obj.show(req.params.slug);
        if (resault == undefined)
            return res.status(400).json('row not exist');
        res.status(200).json(resault);
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
function mainRoutes(app) {
    app.get('/works', index);
    app.get('/works/:slug', show);
}
exports.default = mainRoutes;
