"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skill_1 = require("../models/skill");
const skill_obj = new skill_1.Skill();
//return all brands in database
async function index(req, res) {
    try {
        const resault = await skill_obj.index();
        res.status(200).json(resault);
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return only one brand from databse using id in request params
async function show(req, res) {
    try {
        const resault = await skill_obj.show(req.params.slug);
        if (resault == undefined)
            return res.status(400).json('row not exist');
        res.status(200).json(resault);
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
function mainRoutes(app) {
    app.get('/skills', index);
    app.get('/skills/:slug', show);
}
exports.default = mainRoutes;
