import loki from 'lokijs';

export default class PortalDB {
  constructor(API) {
    this.api = API;
    this.setupDB();
    this.setupCreatures("Overworld");
  }

  setupDB() {
    var self = this;
    // let db = new loki("chaotic_portal.db", { autosave: true, autoload: true, autoloadCallback: databaseInitialize, autosaveInterval: 4000, persistenceMethod: 'localStorage' });
    let db = new loki("chaotic_portal.db"); // ignoring persistence for now
    this.attacks = db.addCollection('attacks');
    this.battlegear = db.addCollection('battlegear');
    this.creatures = db.addCollection('creatures');
    this.locations = db.addCollection('locations');
    this.mugic = db.addCollection('mugic');
    this.db = db;

    // function databaseInitialize() {
    //   var entries;
    //   if ((entries = db.getCollection("attacks")) === null)
    //     entries = db.addCollection("attacks");
    //   self.attacks = entries;

    //   if ((entries = db.getCollection("battlegear")) === null)
    //     entries = db.addCollection("battlegear");
    //   self.battlegear = entries;

    //   console.log(db.getCollection("creatures"));
    //   if ((entries = db.getCollection("creatures")) === null)
    //     entries = db.addCollection("creatures");
    //   self.creatures = db.addCollection('creatures');

    //   if ((entries = db.getCollection("locations")) === null)
    //     entries = db.addCollection("locations");
    //   self.locations = entries

    //   if ((entries = db.getCollection("mugic")) === null)
    //     entries = db.addCollection("mugic");
    //   self.mugic = entries;
    // }
  }

  setup(spreadsheet, callback) {
    this.api.getSpreadsheet(spreadsheet, function(data) {
      data.map(function(item) {
        // delete item.category;
        // delete item.id;
        // delete item.updated;
        // delete item.content;
        // delete item.link;
        // delete item.title;
        item.name = item.gsx$name.$t;
        return item;
      });
      callback(data);
    });
  }

  setupAttacks() {

  }

  setupBattleGear() {

  }

  setupCreatures(tribe) {
    // console.log(this);
    var self = this;
    this.setup(this.api.urls.Creatures[tribe], function(data) {
      self.creatures.insert(data);
    });
  }

  setupLocations() {

  }

  setupMugic(tribe) {

  }
}
