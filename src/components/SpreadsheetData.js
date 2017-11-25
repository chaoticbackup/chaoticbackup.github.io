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
  get thumb_missing() { return "1JYjPzkv74IhzlHTyVh2niTDyui73HSfp"; }
  get card_back() { return "1_MgWDPsPGf-gPBArn2v6ideJcqOPsSYC"; }

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

  // For the conversion of shorthand in database
  get sets() {
    return {
      "DOP": "Dawn of Perim",
      "ZOTH": "Zenith of the Hive",
      "SS": "Silent Sands",
      "MI": "M'arrillian Invasion",
      "ROTO": "Rise of the Oligarch",
      "TOTT": "Turn of the Tide",
      "FUN": "Forged Unity",
      "AU": "Alliance Unraveled",
      "FAS": "Fire and Stone",
      "SAS": "Storm and Sea",
      "BR": "Beyond Rare",
      "LR": "League Rewards",
      "OP1": "Organized Play 1"
    };
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

  setup(spreadsheet, type, callback) {
    this.api.getSpreadsheet(spreadsheet, (data) => {
      callback(data.map((item) => {
        let temp = {};
        delete item.content;
        for (const key of Object.keys(item)) {
          temp[key] = item[key].$t;
        }
        temp["gsx$type"] = type;
        return temp;
      }));
    });
  }

  setupAttacks(tribe="Generic") {
    this.setup(this.api.urls.Attacks[tribe], "Attack", (data) => {
      this.attacks.insert(data);
      this.built.push("attacks_"+tribe);
    });
  }

  setupBattlegear(tribe="Generic") {
    this.setup(this.api.urls.Battlegear[tribe], "Battlegear", (data) => {
      this.battlegear.insert(data);
      this.built.push("battlegear_"+tribe);
    });
  }

  setupCreatures(tribe="Generic") {
    this.setup(this.api.urls.Creatures[tribe], "Creature", (data) => {
      this.creatures.insert(data);
      this.built.push("creatures_"+tribe);
    });
  }

  setupLocations(tribe="Generic") {
    this.setup(this.api.urls.Locations[tribe], "Locations", (data) => {
      this.locations.insert(data);
      this.built.push("locations_"+tribe);
    });
  }

  setupMugic(tribe="Generic") {
    this.setup(this.api.urls.Mugic[tribe], "Mugic", (data) => {
      this.mugic.insert(data);
      this.built.push("mugic_"+tribe);
    });
  }
}
