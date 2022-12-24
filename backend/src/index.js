const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');

const usersRoutes = require('./routes/users');

const adminhistoryRoutes = require('./routes/adminhistory');

const administratorRoutes = require('./routes/administrator');

const cashierRoutes = require('./routes/cashier');

const clientRoutes = require('./routes/client');

const employeeRoutes = require('./routes/employee');

const invoiceRoutes = require('./routes/invoice');

const lineRoutes = require('./routes/line');

const productRoutes = require('./routes/product');

const salespersonRoutes = require('./routes/salesperson');

const supplierRoutes = require('./routes/supplier');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Management Dashboard - Laalej Store',
      description:
        'Management Dashboard - Laalej Store Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/adminhistory',
  passport.authenticate('jwt', { session: false }),
  adminhistoryRoutes,
);

app.use(
  '/api/administrator',
  passport.authenticate('jwt', { session: false }),
  administratorRoutes,
);

app.use(
  '/api/cashier',
  passport.authenticate('jwt', { session: false }),
  cashierRoutes,
);

app.use(
  '/api/client',
  passport.authenticate('jwt', { session: false }),
  clientRoutes,
);

app.use(
  '/api/employee',
  passport.authenticate('jwt', { session: false }),
  employeeRoutes,
);

app.use(
  '/api/invoice',
  passport.authenticate('jwt', { session: false }),
  invoiceRoutes,
);

app.use(
  '/api/line',
  passport.authenticate('jwt', { session: false }),
  lineRoutes,
);

app.use(
  '/api/product',
  passport.authenticate('jwt', { session: false }),
  productRoutes,
);

app.use(
  '/api/salesperson',
  passport.authenticate('jwt', { session: false }),
  salespersonRoutes,
);

app.use(
  '/api/supplier',
  passport.authenticate('jwt', { session: false }),
  supplierRoutes,
);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
