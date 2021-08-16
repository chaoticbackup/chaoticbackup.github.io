import loki from 'lokijs';
import { observable, observe, action } from "mobx";
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
  
    // Wrapper that transforms spreadsheet data into expected object
    async getSpreadsheetData(spreadsheet, type, retry, callback) {
      this.api.getSpreadsheet(spreadsheet, retry, (data) => {
        callback(data.map((item) => {
          const temp = {};
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
        const uc_type = type.charAt(0).toUpperCase() + type.slice(1);
        if (this.building[type].get() == "built") {
          // Check if data has been updated
          this.getSpreadsheetData(this.api.urls[uc_type][this.format], uc_type, false, (data) => {
            const cookie = cookies.get(`${this.format}_${type}`);
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
            return this.getSpreadsheetData(this.api.urls[uc_type][this.format], uc_type, true, (data) => {
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
      const db = new loki(`chaotic_${format}.db`, {
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
            const entries = db.getCollection(type);
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

export default CollectionDB;
