class Voltmeter {
  getValue() {
    return Math.round((Math.random() * (18 - 9) + 9) * 10) / 10;
  }
}
module.exports = new Voltmeter();
