import { Application, Response, Request } from 'express';
import { Pharmacy } from '../models/pharmacy';



const project_obj = new Pharmacy();
//return all brands in database
async function index(req: Request, res: Response) {
    
    try {
        const resault = await project_obj.index();
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return only one brand from databse using id in request params
async function show(req: Request, res: Response) {
    try {
        const resault = await project_obj.show(req.params.slug);
        if(resault == undefined)
            return res.status(400).json('row not exist');
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}



function mainRoutes(app: Application) {
    app.get('/pharmacies', index);
    app.get('/pharmacies/:slug', show);
}

export default mainRoutes;
 