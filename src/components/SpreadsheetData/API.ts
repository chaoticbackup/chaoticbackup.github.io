import 'whatwg-fetch';
import { observable } from "mobx";
import CollectionDB from './CollectionDB';
import spreadsheet_data from './meta_spreadsheet.json';
import { Card } from '../common/definitions';

type card_type = 'attacks' | 'battlegear' | 'creatures' | 'locations' | 'mugic';

type data_type = 'cards' | 'portal';

function retry (fn: () => any, retries=0, err=null) {
  if (retries < 0) {
    return Promise.reject(err);
  }
  return fn().catch((err: any) => {
    return retry(fn, (retries - 1), err);
  });
}

// For the conversion of shorthand in database
export const sets = {
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

class API {
    @observable portal;
    @observable cards;
    @observable urls;
    private static instance: API;
  
    get base_image() { return "https://drive.google.com/uc?id=" }
    get thumb_missing() { return "1JYjPzkv74IhzlHTyVh2niTDyui73HSfp" }
    get card_back() { return "https://i.imgur.com/xbeDBRJ.png" }
    // such secure, much wow
    get key() { 
      return ["AIz", "aSy", "Bfq", "09-", "tBi", "78b", "nH6", "6f1", "Lkn", "zGD", "XM9", "Zu9", "JG0"].join("");
    }
  
    private constructor () {
      // This sets up urls and kicks off db
      try {
        const urls = {};
        spreadsheet_data.forEach(({ type, subtype, url }) => {
          if (!urls[type]) urls[type] = {};
          urls[type][subtype] = url;
        });
        this.urls = urls;
      
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
    
    path(spreadsheetID: string) {
      return `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/Sheet1?key=${this.key}`;
    }
    
    async getSpreadsheetTime(spreadsheetId: string) {
      const url = `https://content.googleapis.com/drive/v3/files/${spreadsheetId}?fields=modifiedTime&key=${this.key}`;
      const response = await fetch(url);

      if (response.status === 200) {
        const json = await response.json();
        if ("modifiedTime" in json) {
          return Promise.resolve(json.modifiedTime); 
        }
      } 
      return Promise.reject();
    }

    async getSpreadsheetData(spreadsheetId: string, doRetry: boolean = false) {
      const url = this.path(spreadsheetId);

      const cmd = async () => {
        const response = await fetch(url);

        if (response.status === 404) {
          throw new Error("Can't Open File");
        }

        try {
          const json = await response.json();
          return json.values;
        } catch (err) {
          throw new Error(err);
        }
      };

      return retry(cmd, doRetry ? 3 : 0);
    }
  
    // Wrapper that transforms spreadsheet data into expected object
    async parseSpreadsheetData(spreadsheetId: string, cardType: string, doRetry: boolean = false) {
      return this.getSpreadsheetData(spreadsheetId, doRetry)
      .then((data: Array<Array<string>>) => {
        if (data.length < 2) return [];

        const header = data.shift()!.map((h: string) => h.toLowerCase().replace(" ", ""));
        const cards = data.map((card: string[]) => {
          const obj = { "gsx$type": cardType };
  
          for (let i = 0; i < header.length; i++) {
            obj[`gsx$${header[i]}`] = card[i];
          }
  
          return obj;
        });

        return cards;
      });
    }
    
    // Input format
    // [{cards: 'attacks'}, {portal: 'attacks'}]
    async LoadDB(input: { [key in data_type]?: card_type }[]) {
      if (this.urls && this.portal && this.cards) {
        return Promise.all(input.map((item) => {
          return new Promise((resolve, reject) => {
            if ('cards' in item) {
              return this.cards!.setupType(item.cards, resolve, reject);
            }
            else if ('portal' in item) {
              return this.portal!.setupType(item.portal, resolve, reject);
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

    hasFullart = (card: Card) => (
      Boolean(card.gsx$if !== undefined && card.gsx$if !== '') ||
      Boolean(card.gsx$splash !== undefined && card.gsx$splash !== '') ||
      Boolean(card.gsx$alt !== undefined && card.gsx$alt !== '')
    );

    /* Wrapper for full art */
    cardFullart = (card: Card) => {
      if (card.gsx$if && card.gsx$if !== '') {
        return card.gsx$if;
      } else if (card.gsx$splash && card.gsx$splash !== '') {
        return this.base_image + card.gsx$splash;
      } else if (card.gsx$alt) { 
        return card.gsx$alt;
      } else {
        return this.card_back;
      }
    };
  
    get tribes() {
      return ["Danian", "Generic", "Mipedian", "M'arrillian", "OverWorld", "UnderWorld"];
    }
  
    get sets() {
      return sets;
    }
  
    purgeDB() {
      if (this.cards) this.cards.purgeDB();
      if (this.portal) this.portal.purgeDB();
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  
}

export default API.getInstance();
