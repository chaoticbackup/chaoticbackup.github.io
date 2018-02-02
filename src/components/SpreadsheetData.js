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

  // Wrapper
  path(spreadsheetID) {
    return API.path(spreadsheetID);
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
      .then((response) => {
        // console.log(response);
        return response.json();
      }).then((json) => {
        return callback(json.feed.entry);
      }).catch((err) => {
        console.log('parsing failed', err);
        return callback(null);
      });
  }

  setupDB() {
    try {
      this.portal = new CollectionDB(this, 'portal');
      this.cards = new CollectionDB(this, 'cards');
    }
    catch (err) {
      console.log('setting up database failed', err);
    }
  }

  get tribes() {
    return ["Danian", "Generic", "Mipedian", "OverWorld", "UnderWorld"];
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

  // Input format
  // [{cards: 'attacks'}, {portal: 'attacks'}]
  async buildCollection(input) {
    return await Promise.all(input.map((item) => {
      return new Promise((resolve, reject) => {
        if ('cards' in item)
          return this.cards.setupType(item.cards, resolve);
        if ('portal' in item)
          return this.portal.setupType(item.portal, resolve);
        console.log('cards or portal');
        return reject();
      });
    }));
  }

}

export default API.getInstance();

class CollectionDB {
  // Keeps track of what collections have been populated
  @observable built = [];
  @observable building = {};

  constructor(API, format) {
    this.api = API;
    this.format = format;
    this.setupDB();
  }

  setupDB() {
    let db = new loki("chaotic_portal.db");
    this.attacks = db.addCollection('attacks');
    this.battlegear = db.addCollection('battlegear');
    this.creatures = db.addCollection('creatures');
    this.locations = db.addCollection('locations');
    this.mugic = db.addCollection('mugic');
    this.db = db;

    // ignoring persistence for now
    //autorun(() => console.log(this.creatures));

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
  }

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

  // example format
  // this.setup(this.api.urls.Attacks["portal"], "Attack", (data) => {});
  async setupType(type, resolve) {
    if (this.building[type]) {
      if (this.building[type] == "built") {
        return resolve();
      }
      if (this.building[type] == "building") {
        const disposer = observe(building[type], (change) => {
          disposer();
          resolve();
        });
        return disposer;
      }
    }
    else {
      this.building[type] = "building";
      let uc_type = type.charAt(0).toUpperCase() + type.slice(1);
      console.log(type, this.format, this.building[type]);
      return this.setup(this.api.urls[uc_type][this.format], uc_type, (data) => {
        this[type].insert(data);
        this.building[type] = "built";
        console.log(type, this.format, this.building[type]);
        resolve();
      });
    }
  }

  setupAttacks(type="portal") {
    this.setup(this.api.urls.Attacks[type], "Attack", (data) => {
      this.attacks.insert(data);
      this.built.push("attacks_"+type);
    });
  }

  setupBattlegear(type="portal") {
    this.setup(this.api.urls.Battlegear[type], "Battlegear", (data) => {
      this.battlegear.insert(data);
      this.built.push("battlegear_"+type);
    });
  }

  setupCreatures(type="portal") {
    this.setup(this.api.urls.Creatures[type], "Creature", (data) => {
      this.creatures.insert(data);
      this.built.push("creatures_"+type);
    });
  }

  setupLocations(type="portal") {
    this.setup(this.api.urls.Locations[type], "Location", (data) => {
      this.locations.insert(data);
      this.built.push("locations_"+type);
    });
  }

  setupMugic(type="portal") {
    this.setup(this.api.urls.Mugic[type], "Mugic", (data) => {
      this.mugic.insert(data);
      this.built.push("mugic_"+type);
    });
  }

}
