import 'whatwg-fetch';
import loki from 'lokijs';
import {observable, observe, action} from "mobx";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class CollectionDB {
  // Keeps track of what collections have been populated
  @observable building = {};

  constructor(API, format) {
    this.api = API;
    this.format = format;
    this.setupDB(format);
  }

  async getSpreadsheetData(spreadsheet, type, callback) {
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
  @action
  async setupType(type, resolve) {
    if (this.building.hasOwnProperty(type)) {
      let uc_type = type.charAt(0).toUpperCase() + type.slice(1);
      if (this.building[type].get() == "built") {
        // Check if data has been updated
        this.getSpreadsheetData(this.api.urls[uc_type][this.format], uc_type, (data) => {
          let cookie = cookies.get(`${this.format}_${type}`);
          if (cookie) {
            if ((new Date(data[0].updated)) > (new Date(cookie))) {
              this[type].clear();
              this[type].insert(data);
              cookies.set(`${this.format}_${type}`, data[0].updated, { path: '/' });
            }
          }
          else {
            cookies.set(`${this.format}_${type}`, data[0].updated, { path: '/' });
          }
        });
        return resolve();
      }
      if (this.building[type].get() == "building") {
        const disposer = observe(this.building[type], (change) => {
          disposer();
          resolve();
        });
        return disposer;
      }
      if (this.building[type].get() == "setup") {
        this.building[type].set("building");
        // check if the collection already exists in memory
        if (this[type].data.length == 0) {
          return this.getSpreadsheetData(this.api.urls[uc_type][this.format], uc_type, (data) => {
            this[type].insert(data);
            this.building[type].set("built");
            return resolve();
          });
        }
        else {
          this.building[type].set("built");
          return resolve();
        }
      }
    }
    else {
      // Wait until the database is initialized
      this.building[type] = observable.box("wait");
      const disposer = observe(this.building[type], () => {
        disposer();
        return this.setupType(type, resolve);
      });
      return disposer;
    }
  }

  @action
  setupDB(format) {
    let db = new loki(`chaotic_${format}.db`, {
      autosave: true,
      autoload: true,
      autoloadCallback: databaseInitialize.bind(this),
      autosaveInterval: 4000,
      persistenceMethod: 'localStorage'
    });

    this.db = db;

    function databaseInitialize() {
      ["attacks","battlegear", "creatures", "locations", "mugic"]
        .forEach((type) => {
          // check if the db already exists in memory
          let entries = db.getCollection(type);
          if (entries === null || entries.data.length === 0) {
            this[type] = db.addCollection(type);
            if (this.building[type])
              this.building[type].set("setup");
            else
              this.building[type] = observable.box("setup");
          }
          else {
            this[type] = entries;
            if (this.building[type])
              this.building[type].set("built");
            else
              this.building[type] = observable.box("built");
          }
      });
    }
  }

  purgeDB = () => {
    this.db.deleteDatabase();
  }
}

class API {
  @observable portal = null;
  @observable cards = null;
  @observable urls = null;
  instance = null;

  static base_url = "https://spreadsheets.google.com/feeds/list/";
  static data_format = "/od6/public/values?alt=json";
  // + "/od6/public/basic?alt=json"; // Alternate data format
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
    this.setupDB();
  }

  async getSpreadsheet(spreadsheet, callback) {
    fetch(spreadsheet)
      .then((response) => {
        return response.json();
      }).then((json) => {
        return callback(json.feed.entry);
      }).catch((err) => {
        console.error('parsing failed', err);
        return callback(null);
      });
  }

  // This sets up urls and kicks off db
  setupDB() {
    // let base_spreadsheet = "1cUNmwV693zl2zqbH_IG4Wz8o9Va_sOHe7pAZF6M59Es";
    try {
      let urls = {};
      let data = require('./meta_spreadsheet.json');
      // this.getSpreadsheet(API.path(API.base_spreadsheet), (data) => {
      //   if (data == null) throw "no data from base_spreadsheet";
      data.forEach((d) => {
        if (!urls[d.gsx$type.$t]) urls[d.gsx$type.$t] = {};
        urls[d.gsx$type.$t][d.gsx$subtype.$t] = API.path(d.gsx$url.$t);
      });
      this.urls = urls;
      // });

      this.portal = new CollectionDB(this, 'portal');
      this.cards = new CollectionDB(this, 'cards');
    }
    catch (err) {
      console.error('setting up database failed', err);
    }
  }

  // Input format
  // [{cards: 'attacks'}, {portal: 'attacks'}]
  async LoadDB(collection) {
    return new Promise((resolve, reject) => {
      if (this.urls !== null &&
        this.portal !== null &&
        this.cards !== null
      ) {
        this.buildCollection(collection)
        .then(() => {
          resolve();
        });
      }
      else resolve();
    });
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
        console.error('cards or portal');
        return reject();
      });
    }));
  }

  get tribes() {
    return ["Danian", "Generic", "Mipedian", "M'arrillian", "OverWorld", "UnderWorld"];
  }

  // For the conversion of shorthand in database
  get sets() {
    return {
      "DOP": "Dawn of Perim",
      "ZOTH": "Zenith of the Hive",
      "SS": "Silent Sands",
      "MI": "Beyond the Doors",
      "ROTO": "Rise of the Oligarch",
      "TOTT": "Turn of the Tide",
      "FUN": "Forged Unity",
      "AU": "Alliance Unraveled",
      "FAS": "Fire and Stone",
      "SAS": "Storm and Sea",
      "EE": "Elemental Emperors",
      "BR": "Beyond Rare",
      "LR": "League Rewards",
      "OP1": "Organized Play 1",
      "PROMO": "Promotional"
    };
  }

  purgeDB()
  {
    this.cards.purgeDB();
    this.portal.purgeDB();
    window.location.reload();
  }

}

export default API.getInstance();
