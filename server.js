require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');

app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    origin: '*',
    methods: "GET,HEAD,OPTIONS,POST,PUT,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static('uploads'));
app.set('trust proxy', true);

app.set('views', 'views');
app.set('view engine', 'ejs');

routes(app);

const startServer = () => {
    app.listen(port, () => {
        console.log(`RESTful API server started on: ${port}`);
    });
};

if (process.env.DEPLOY_TYPE !== "lambda") {
    startServer();
} else {
    const serverless = require('serverless-http');
    console.log('Running on lambda', process.env.STAGE);
    module.exports.handler = async (event, context) => {
        return serverless(app)(event, context);
    };
}
