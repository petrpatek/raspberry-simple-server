const app = require('express')();
const basicAuth = require('express-basic-auth');
const dotEnv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  dotEnv.config({ path: './development.env' });
}
app.use(basicAuth({
  users: { admin: process.env.PASSWORD },
}));

app.get('/', (req, res) => res.send('Hello World!'));

const server = app.listen(process.env.PORT, () => console.log(`Server started at port: ${server.address().port}`));
