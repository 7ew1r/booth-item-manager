export default class DB {
  static db: any;

  func() {
    const Datastore = require("nedb");
    DB.db = new Datastore();
  }
}
