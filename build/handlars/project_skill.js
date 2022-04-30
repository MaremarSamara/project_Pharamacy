"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_skill_1 = require("../models/project_skill");
const t_obj = new project_skill_1.Project_skill();
//return all brands in database
async function index(req, res) {
    try {
        const resault = await t_obj.index();
        res.status(200).json(resault);
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return only one brand from databse using id in request params
async function show(req, res) {
    try {
        const resault = await t_obj.show(req.params.slug);
        if (resault == undefined)
            return res.status(400).json('row not exist');
        res.status(200).json(resault);
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
function mainRoutes(app) {
    app.get('/project_skill', index);
    app.get('/project_skill/:slug', show);
}
exports.default = mainRoutes;
