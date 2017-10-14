import React from 'react';
import 'whatwg-fetch';

class URLS {
  static base_url = "https://spreadsheets.google.com/feeds/list/";
  static data_format = "/od6/public/values?alt=json";
  // + "/od6/public/basic?alt=json"; // Alternate data format
  static base_spreadsheet = "1cUNmwV693zl2zqbH_IG4Wz8o9Va_sOHe7pAZF6M59Es";
  get base_image() { return "https://drive.google.com/uc?id="; }

  static path(spreadsheetID) {
    return URLS.base_url + spreadsheetID + URLS.data_format;
  }

  constructor() {
    // This sets up urls
    this.urls = {};
    var self = this;
    this.getSpreadsheet(URLS.path(URLS.base_spreadsheet), function(data) {
      data.forEach(function(d) {
        if (!self.urls[d.gsx$type.$t]) self.urls[d.gsx$type.$t] = {};
        self.urls[d.gsx$type.$t][d.gsx$subtype.$t] = d.gsx$url.$t;
      });
    });
  }

  // Singleton
  instance = null;
  static getInstance() {
      if (!URLS.instance) { URLS.instance = new URLS(); }
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

  /* Creatures */
  /* TODO remove legacy getters when introducing state management*/
  get Creatures_Card_Data() {
    return URLS.path("1fUFYhG1NLLkSTzrdbevm6ZMKNP6xLiKUZvM1sY10pVI");
  }

  get Creatures() {
    return {
      'Overworld': URLS.path("1Z4_MmlV7uE34nLzrcxslqQKRwL4OBXNA15s7G8eteXU"),
      'Underworld': URLS.path("1c_XAxQsDIWVdzUxWl5t-K_mQumNjX-yrg0X-0NsZVts"),
      'Mipedian': URLS.path("1P4FKASfnhR46j2bqm89T9xhI1Yyyy-jiZ1CkRglSy2k"),
      'Danian': URLS.path("1-Lz-itwOobEvqr8HSLFFwg3JFkT64NbwyGFEPfj9rxU")
    };
  }

  get Mugic() {
    return {
      'Overworld': URLS.path("1KsVX5SkygwPP6I8yd6xgcN8gB746o_FTh6SK1TvAcbU"),
      'Underworld': URLS.path("1F7FHlob52cb_7J65cddM3The7w-kFiStBRd5wm4JRlA"),
      'Mipedian': URLS.path("1QDsiSUuBV_4Jn6mvl96EGU06XEoVqILGN4suYKvh9CA"),
      'Danian': URLS.path("1tEuwPGixJH2A03YtYL6Ar-MSFvtfrlaveT98GwJhw1g"),
      'Generic': URLS.path("1M9iAbpYAHq_ppwm0PZKUvZGfu-zbrK1CZMY16m4Plf8")
    };
  }

}

export default URLS.getInstance();
