const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const basicAuth = require('express-basic-auth');
const cors = require('cors');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const Led = require('./controllers/led-controller');
const Voltmeter = require('./controllers/voltmeter-controller');

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

io
  .of('/voltmeter')
  .on('connection', (socket) => {
    const interval = setInterval(() => socket.emit('voltmeter', { value: Voltmeter.getValue() }), 1000);
  });
const serverInstace = server.listen(
  process.env.PORT,
  () => console.log(`Server started at port: ${serverInstace.address().port}`
  ));
