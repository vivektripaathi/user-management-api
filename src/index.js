const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const model = require('./models')
const errorHandler = require('./helper/error-handler')
const auth = require('./helper/jwt')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
require('dotenv').config({path: path.join(__dirname , '../', '.env')});

// Establishing DB Connection
require('./config/config')

// Middleware
app.use(express.json());
app.use(auth());

// Route
require('./routes')(router);
app.use('/api', router);

// Error Handler
app.use((err, req, res, next) => {
    errorHandler(err, req, res, next);
});

// Swagger Documentation Setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
    console.log(`App listening at http://localhost:${process.env.PORT}`);
});
