import { Application, Response, Request } from 'express';
import { Drugs } from '../models/drugs';



const drug_obj = new Drugs();
//return all brands in database
async function index(req: Request, res: Response) {
    
    try {
        const resault = await drug_obj.index();
        res.status(200).json({result:resault});
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return only one brand from databse using id in request params
async function show(req: Request, res: Response) {
    try {
        const resault = await drug_obj.show(req.params.slug);
        if(resault == undefined)
            return res.status(400).json('row not exist');
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}



function mainRoutes(app: Application) {
    app.get('/drugs', index);
    app.get('/drugs/:slug', show);
}

export default mainRoutes;
 