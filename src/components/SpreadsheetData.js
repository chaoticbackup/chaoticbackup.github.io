import 'whatwg-fetch';
import CollectionDB from './CollectionDB';
import {observable} from "mobx";

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
      this.portal = new CollectionDB(this, "portal");
      this.cards = new CollectionDB(this, "cards");
    }
    catch (err) {
      console.log('setting up database failed', err);
    }
  }
}

export default API.getInstance();

// export default new API();
