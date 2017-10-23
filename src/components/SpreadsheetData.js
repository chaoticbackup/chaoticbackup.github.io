import 'whatwg-fetch';
import CardsDB from './database/cards';
import PortalDB from './database/portal';

class API {
  static base_url = "https://spreadsheets.google.com/feeds/list/";
  static data_format = "/od6/public/values?alt=json";
  // + "/od6/public/basic?alt=json"; // Alternate data format
  static base_spreadsheet = "1cUNmwV693zl2zqbH_IG4Wz8o9Va_sOHe7pAZF6M59Es";
  get base_image() { return "https://drive.google.com/uc?id="; }

  // Singleton
  instance = null;
  static getInstance() {
      if (!API.instance) { API.instance = new API(); }
      return API.instance;
  }

  static path(spreadsheetID) {
    return API.base_url + spreadsheetID + API.data_format;
  }

  constructor() {
    var self = this;

    // This sets up urls and kicks off db
    this.urls = {};
    this.getSpreadsheet(API.path(API.base_spreadsheet), function(data) {
      if (data == null) return;
      data.forEach(function(d) {
        if (!self.urls[d.gsx$type.$t]) self.urls[d.gsx$type.$t] = {};
        self.urls[d.gsx$type.$t][d.gsx$subtype.$t] = API.path(d.gsx$url.$t);
      });
      self.setupDB();
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
      this.portal = new PortalDB(this);
      this.cards = new CardsDB(this);
    }
    catch (err) {
      console.log('setting up database failed', err);
    }
  }
}

export default API.getInstance();
