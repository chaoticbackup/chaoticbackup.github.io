import React from 'react';
import 'whatwg-fetch';

class URLS {
  static base_url = "https://spreadsheets.google.com/feeds/list/";
  static data_format = "/od6/public/values?alt=json";
  // + "/od6/public/basic?alt=json"; // Alternate data format

  // base url for image
  get image() { return "https://drive.google.com/uc?id="; }

  constructor() {}

  // Singleton
  static instance = null;
  static createInstance() {
      var object = new URLS();
      return object;
  }

  static getInstance() {
      if (!URLS.instance) {
          URLS.instance = URLS.createInstance();
      }
      return URLS.instance;
  }

  getSpreadsheet(spreadsheet, callback) {
    fetch(spreadsheet)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        return callback(json.feed.entry);
      }).catch(function(err) {
        console.log('parsing failed', err);
        return callback(null);
      });
  }

  static path(spreadsheetID) {
    return URLS.base_url + spreadsheetID + URLS.data_format;
  }

  get Creature_Card_Data() {
    return URLS.path("1fUFYhG1NLLkSTzrdbevm6ZMKNP6xLiKUZvM1sY10pVI");
  }

  get Creature_Overworld() {
    return URLS.path("1Z4_MmlV7uE34nLzrcxslqQKRwL4OBXNA15s7G8eteXU");
  }

}

export default URLS.getInstance();
