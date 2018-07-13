const Gpio = require('onoff').Gpio;

const MESSAGES = {
  OFF: 'Pin switched off',
  ON: 'Pin switched on',
  OFF_ALREADY: 'Pin is already off state = 0',
  ON_ALREADY: 'Pin is already on state = 1',
};

class PinState {
  constructor(pin) {
    this.pin = new Gpio(pin, 'out');
    this.state = this.fetchState();
  }
  static getMessages() {
    return MESSAGES;
  }
  fetchState() {
    return this.pin.readSync();
  }
  on() {
    if (this.state === 1) {
      return MESSAGES.ON_ALREADY;
    }
    this.pin.writeSync(1);
    this.fetchState();

    return MESSAGES.ON;
  }
  off() {
    if (this.state === 0) {
      return MESSAGES.OFF_ALREADY;
    }
    this.pin.writeSync(0);
    this.fetchState();

    return MESSAGES.OFF;
  }
  unExport(){
    this.pin.unexport();
  }
}
module.exports = PinState;
