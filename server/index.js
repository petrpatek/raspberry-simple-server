const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const basicAuth = require('express-basic-auth');
const cors = require('cors');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const Led = require('./controllers/led-controller');
const Voltmeter = require('./controllers/voltmeter-controller');
const Depth = require('./controllers/depth-controller');

if (process.env.NODE_ENV === 'development') {
  dotEnv.config({ path: './development.env' });
}
app.use(cors());

const socketauth = require('socketio-auth')(io, {
  authenticate: (socket, data, callback) => {
    const username = data.username;
    const password = data.password;

    return callback(null, password === process.env.PASSWORD && username === 'admin');
  },
  timeout: 1000,

});

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
Depth.startMeassuring();
io.on('connection', (socket) => {
  const interval = setInterval(() => {
   // socket.emit('voltmeter', { value: Voltmeter.getValue() });
    socket.emit('depth', { value: Depth.getValue() });
  }, 1000);
});
const serverInstace = server.listen(
  process.env.PORT,
  () => console.log(`Server started at port: ${serverInstace.address().port}`
  ));
