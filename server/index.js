const cfg = require('../local.config.json');
require('dotenv').config();


const app = require('express')();
const basicAuth = require('express-basic-auth');

app.use(basicAuth({
  users: { admin: cfg.password },
}));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(process.env.PORT, () => console.log('Example app listening on port 3000!'));
