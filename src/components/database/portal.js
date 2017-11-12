import loki from 'lokijs';
import {observable, autorun} from "mobx";

export default class PortalDB {
  @observable built = []; // Keeps track of what collections have been populated

  constructor(API) {
    this.api = API;
    // ignoring persistence for now
    // this.setupDB();
    //autorun(() => console.log(this.creatures));
    let db = new loki("chaotic_portal.db");
    this.attacks = db.addCollection('attacks');
    this.battlegear = db.addCollection('battlegear');
    this.creatures = db.addCollection('creatures');
    this.locations = db.addCollection('locations');
    this.mugic = db.addCollection('mugic');
    this.db = db;
  }

  setupDB() {
    var self = this;
    let db = new loki("chaotic_portal.db", { autosave: true, autoload: true, autoloadCallback: databaseInitialize, autosaveInterval: 4000, persistenceMethod: 'localStorage' });
    this.db = db;

    let databaseInitialize = () => {
      var entries;
      if ((entries = db.getCollection("attacks")) === null)
        entries = db.addCollection("attacks");
      self.attacks = entries;

      if ((entries = db.getCollection("battlegear")) === null)
        entries = db.addCollection("battlegear");
      self.battlegear = entries;

      console.log(db.getCollection("creatures"));
      if ((entries = db.getCollection("creatures")) === null)
        entries = db.addCollection("creatures");
      self.creatures = db.addCollection('creatures');

      if ((entries = db.getCollection("locations")) === null)
        entries = db.addCollection("locations");
      self.locations = entries

      if ((entries = db.getCollection("mugic")) === null)
        entries = db.addCollection("mugic");
      self.mugic = entries;
    };
  }

  setup(spreadsheet, callback) {
    this.api.getSpreadsheet(spreadsheet, (data) => {
      callback(data.map((item) => {
        let temp = {};
        delete item.content;
        for (const key of Object.keys(item)) {
          temp[key] = item[key].$t;
        }
        return temp;
      }));
    });
  }

  setupAttacks() {

  }

  setupBattleGear() {

  }

  setupCreatures(tribe) {
    this.setup(this.api.urls.Creatures[tribe], (data) => {
      this.creatures.insert(data);
      this.built.push("creatures_"+tribe);
    });
  }

  setupLocations() {

  }

  setupMugic(tribe) {

  }
}
