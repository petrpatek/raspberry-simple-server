const app = require('express')();
const basicAuth = require('express-basic-auth');
const cors = require('cors');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const Led = require('./controllers/led-controller');

if (process.env.NODE_ENV === 'development') {
  dotEnv.config({ path: './development.env' });
}
app.use(cors());

app.use(basicAuth({
  users: { admin: process.env.PASSWORD },
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/blink', (req, res) => {
  console.log(req.body, 'body');
  if (req.body.state === 'on') {
    console.log(Led.on());
  } else if (req.body.state === 'off') {
    console.log(Led.off());
  }
  // Led.blink();
  res.send('Hello - Blinking started');
});

const server = app.listen(process.env.PORT, () => console.log(`Server started at port: ${server.address().port}`));
