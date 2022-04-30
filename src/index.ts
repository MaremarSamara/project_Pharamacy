import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { Drugs } from './models/drugs';
import {Pharmacy} from './models/pharmacy';
import pharmaciesRoutes from './handlars/pharmacy';
import drugsRoutes from './handlars/drugs';
import isTrue from './services/filtter';

dotenv.config();


//initial port and app
const PORT = process.env.PORT ||5000;
const app = express();
//usig middel ware cors and body parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', 'front');
const p = path.join(__dirname, 'static/../../static');
app.use(express.static(p));
//configre the server to listen to port and running it
app.listen(PORT, (): void => {
    console.log(`server running on port ${PORT}...`);
});

const pharmacy_obj = new Pharmacy(), drugs_obj = new Drugs();


app.get('/',async (req,res)=>{
    //const pharmacy = await pharmacy_obj.index();
    const model_result = await drugs_obj.index();
    
    res.render('index', {drugs: model_result});
});


app.post('/search',async(req, res)=>{
    const drugName = req.body.search;
    let model_result = await drugs_obj.index();
    if(drugName != undefined){
        model_result = model_result.filter(x => isTrue(x.pharmaceuticalname as unknown as string, drugName));
    }

    
    res.render('index', {drugs: model_result});
    
});

drugsRoutes(app);
pharmaciesRoutes(app);

//export the app to use when importing the file
export default app;
