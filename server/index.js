const app = require('express')();
const expressWs = require('express-ws')(app);
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
  let msg;
  if (req.body.state === 'on') {
    msg = Led.on();
  } else if (req.body.state === 'off') {
    msg = Led.off();
  }
  // Led.blink();
  res.send(msg);
});

app.ws('/voltmeter', (ws, req) => {
  console.log(ws.url)
  ws.on('message', (msg) => {
    ws.send(msg);
  });
});

const server = app.listen(process.env.PORT, () => console.log(`Server started at port: ${server.address().port}`));
