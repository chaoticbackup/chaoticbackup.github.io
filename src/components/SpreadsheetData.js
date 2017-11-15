import 'whatwg-fetch';
import loki from 'lokijs';
import {observable, autorun} from "mobx";

class API {
  @observable portal = null;
  @observable cards = null;
  @observable urls = null;
  instance = null;

  static base_url = "https://spreadsheets.google.com/feeds/list/";
  static data_format = "/od6/public/values?alt=json";
  // + "/od6/public/basic?alt=json"; // Alternate data format
  static base_spreadsheet = "1cUNmwV693zl2zqbH_IG4Wz8o9Va_sOHe7pAZF6M59Es";
  get base_image() { return "https://drive.google.com/uc?id="; }

  // Singleton
  static getInstance() {
      if (!this.instance) { this.instance = new API(); }
      return this.instance;
  }

  static path(spreadsheetID) {
    return API.base_url + spreadsheetID + API.data_format;
  }

  constructor() {
    // This sets up urls and kicks off db
    let urls = {};
    this.getSpreadsheet(API.path(API.base_spreadsheet), (data) => {
      if (data == null) return;
      data.forEach((d) => {
        if (!urls[d.gsx$type.$t]) urls[d.gsx$type.$t] = {};
        urls[d.gsx$type.$t][d.gsx$subtype.$t] = API.path(d.gsx$url.$t);
      });
      this.urls = urls;
      this.setupDB();
    });
  }

  getSpreadsheet(spreadsheet, callback) {
    fetch(spreadsheet)
      .then(function(response) {
        // console.log(response);
        return response.json();
      }).then(function(json) {
        return callback(json.feed.entry);
      }).catch(function(err) {
        console.log('parsing failed', err);
        return callback(null);
      });
  }

  setupDB() {
    try {
      this.portal = new CollectionDB(this);
      this.cards = new CollectionDB(this);
    }
    catch (err) {
      console.log('setting up database failed', err);
    }
  }
}

export default API.getInstance();

// export default new API();

class CollectionDB {
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

  // setupDB() {
  //   var self = this;
  //   let db = new loki("chaotic_portal.db", { autosave: true, autoload: true, autoloadCallback: databaseInitialize, autosaveInterval: 4000, persistenceMethod: 'localStorage' });
  //   this.db = db;

  //   let databaseInitialize = () => {
  //     var entries;
  //     if ((entries = db.getCollection("attacks")) === null)
  //       entries = db.addCollection("attacks");
  //     self.attacks = entries;

  //     if ((entries = db.getCollection("battlegear")) === null)
  //       entries = db.addCollection("battlegear");
  //     self.battlegear = entries;

  //     console.log(db.getCollection("creatures"));
  //     if ((entries = db.getCollection("creatures")) === null)
  //       entries = db.addCollection("creatures");
  //     self.creatures = db.addCollection('creatures');

  //     if ((entries = db.getCollection("locations")) === null)
  //       entries = db.addCollection("locations");
  //     self.locations = entries

  //     if ((entries = db.getCollection("mugic")) === null)
  //       entries = db.addCollection("mugic");
  //     self.mugic = entries;
  //   };
  // }

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

  setupCreatures(tribe="Generic") {
    this.setup(this.api.urls.Creatures[tribe], (data) => {
      this.creatures.insert(data);
      this.built.push("creatures_"+tribe);
    });
  }

  setupLocations() {

  }

  // Portal or Cards
  setupMugic(tribe="Generic") {
    this.setup(this.api.urls.Mugic[tribe], (data) => {
      this.mugic.insert(data);
      this.built.push("mugic_"+tribe);
    });
  }
}
