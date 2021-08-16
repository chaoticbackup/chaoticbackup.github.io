import 'whatwg-fetch';
import { observable } from "mobx";
import pRetry from 'p-retry';
import CollectionDB from './CollectionDB';
import spreadsheet_data from './meta_spreadsheet.json';
import { Card } from '../common/definitions';

type card_type = 'attacks' | 'battlegear' | 'creatures' | 'locations' | 'mugic';

type data_type = 'cards' | 'portal';

class API {
    @observable portal;
    @observable cards;
    @observable urls;
    private static instance: API;
  
    static base_url = "https://spreadsheets.google.com/feeds/list/";
    static data_format = "/od6/public/values?alt=json";
    // + "/od6/public/basic?alt=json"; // Alternate data format
    get base_image() { return "https://drive.google.com/uc?id=" }
    get thumb_missing() { return "1JYjPzkv74IhzlHTyVh2niTDyui73HSfp" }
    get card_back() { return "https://i.imgur.com/xbeDBRJ.png" }
  
    private constructor () {
      // This sets up urls and kicks off db
      // let base_spreadsheet = "1cUNmwV693zl2zqbH_IG4Wz8o9Va_sOHe7pAZF6M59Es";
      try {
        const urls = {};
        // this.getSpreadsheet(API.path(API.base_spreadsheet), (data) => {
        //   if (data == null) throw "no data from base_spreadsheet";
        spreadsheet_data.forEach((d) => {
          if (!urls[d.gsx$type.$t]) urls[d.gsx$type.$t] = {};
          urls[d.gsx$type.$t][d.gsx$subtype.$t] = this.path(d.gsx$url.$t);
        });
        this.urls = urls;
        // });
      
        this.portal = new CollectionDB(this, 'portal');
        this.cards = new CollectionDB(this, 'cards');
      }
      catch (err) {
        this.portal = null;
        this.cards = null;
        this.urls = null;
        console.error('setting up database failed', err);
      }
    }

    // Singleton
    static getInstance(): API {
      if (!API.instance) { API.instance = new API() }
      return API.instance;
    }
    
    // Wrapper
    path(spreadsheetID: string) {
      return API.base_url + spreadsheetID + API.data_format;
    }
  
    async getSpreadsheet(spreadsheet: string, retry: boolean, callback: (data: any) => any) {
      await pRetry(async () => {
        return fetch(spreadsheet)
        .then((response) => {
          if (response.status === 404) throw new Error("Can't Open File");
          return response.json();
        })
        .then((json) => {
          callback(json.feed.entry);
        })
        .catch((err) => {
          throw new pRetry.AbortError(err);
        });
      }, { retries: retry ? 3 : 0 });
    }
    
    // Input format
    // [{cards: 'attacks'}, {portal: 'attacks'}]
    async LoadDB(input: { [key in data_type]?: card_type }[]) {
      if (this.urls && this.portal && this.cards) {
        return Promise.all(input.map((item) => {
          return new Promise((resolve, reject) => {
            if ('cards' in item) {
              return this.cards!.setupType(item.cards, resolve);
            }
            else if ('portal' in item) {
              return this.portal!.setupType(item.portal, resolve);
            }
            else {
              console.error('key must be cards or portal');
              return reject();
            }
          });
        }));
      }
      else return Promise.reject();
    }
    
    /* Wrappers for images */
    cardImage(card: Card) {
      if (card.gsx$ic && card.gsx$ic !== '') {
        return card.gsx$ic;
      } else if (card.gsx$image && card.gsx$image !== '') {
        return this.base_image + card.gsx$image;
      } else {
        return this.card_back;
      }
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
        "OP1": "Organized Play 1",
        "PE1": "Premium Edition 1",
        "SAS": "Storm and Sea",
        "EE": "Elemental Emperors",
        "BR": "Beyond Rare",
        "LR": "League Rewards",
        "PROMO": "Promotional",
        "PROTO": "Prototype"
      };
    }
  
    purgeDB() {
      if (this.cards) this.cards.purgeDB();
      if (this.portal) this.portal.purgeDB();
      window.location.reload();
    }
  
}

export default API;
