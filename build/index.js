"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const drugs_1 = require("./models/drugs");
const pharmacy_1 = require("./models/pharmacy");
const pharmacy_2 = __importDefault(require("./handlars/pharmacy"));
const drugs_2 = __importDefault(require("./handlars/drugs"));
const filtter_1 = __importDefault(require("./services/filtter"));
dotenv_1.default.config();
//initial port and app
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
//usig middel ware cors and body parser
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use((0, cookie_parser_1.default)());
app.set('view engine', 'ejs');
app.set('views', 'front');
const p = path_1.default.join(__dirname, 'static/../../static');
app.use(express_1.default.static(p));
//configre the server to listen to port and running it
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
});
const pharmacy_obj = new pharmacy_1.Pharmacy(), drugs_obj = new drugs_1.Drugs();
app.get('/', async (req, res) => {
    //const pharmacy = await pharmacy_obj.index();
    const model_result = await drugs_obj.index();
    res.render('index', { drugs: model_result });
});
app.post('/search', async (req, res) => {
    const drugName = req.body.search;
    let model_result = await drugs_obj.index();
    if (drugName != undefined) {
        model_result = model_result.filter(x => (0, filtter_1.default)(x.pharmaceuticalname, drugName));
    }
    res.render('index', { drugs: model_result });
});
(0, drugs_2.default)(app);
(0, pharmacy_2.default)(app);
//export the app to use when importing the file
exports.default = app;
