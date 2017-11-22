module.exports = class BaseDecorator {
  constructor(obj) {
    this.obj = obj;
  }

  static mapJSON(collection) {
    return collection.map(c => new this(c).asJSON());
  }

  asJSON() {
    return this.obj;
  }
}
