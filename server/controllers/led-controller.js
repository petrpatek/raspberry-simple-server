const PinState = require('./pin-state');

class Led extends PinState {
  constructor(pin) {
    super(pin);
    this.blinkInterval = null;
  }
  blinkOnce() {
    if (this.state === 0) {
      super.on();
    } else {
      super.off();
    }
  }
  endBlink() {
    clearInterval(this.blinkInterval);
    super.off();
    super.unExport();
  }
  blink() {
    this.blinkInterval = setInterval(this.blinkOnce, 250);

    setTimeout(this.endBlink, 5000);
  }
}

module.exports = new Led(4);
