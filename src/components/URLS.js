import React from 'react';

class URLS {
  static base_url = "https://spreadsheets.google.com/feeds/list/";
  static data_format = "/od6/public/values?alt=json";
  // + "/od6/public/basic?alt=json"; // Alternate data format

  constructor() {}

  static path(spreadsheetID) {
    return URLS.base_url + spreadsheetID + URLS.data_format;
  }

  get Creature_Overworld() {
    return URLS.path("1Z4_MmlV7uE34nLzrcxslqQKRwL4OBXNA15s7G8eteXU");
  }

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
}

export default URLS.getInstance();
