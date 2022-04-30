"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = require("../models/project");
const project_obj = new project_1.Project();
//return all brands in database
async function index(req, res) {
    try {
        const resault = await project_obj.index();
        res.status(200).json(resault);
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return only one brand from databse using id in request params
async function show(req, res) {
    try {
        const resault = await project_obj.show(req.params.slug);
        if (resault == undefined)
            return res.status(400).json('row not exist');
        res.status(200).json(resault);
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
function mainRoutes(app) {
    app.get('/projects', index);
    app.get('/projects/:slug', show);
}
exports.default = mainRoutes;
