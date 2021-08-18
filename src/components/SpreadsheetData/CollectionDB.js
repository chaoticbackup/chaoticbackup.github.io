import Loki from 'lokijs';
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
    
    // example format
    // this.setup(this.api.urls.Attacks["portal"], "Attack", (data) => {});
    @action
    async setupType(type, resolve, reject) {
      if (this.building.hasOwnProperty(type)) {
        const uc_type = type.charAt(0).toUpperCase() + type.slice(1);
        const building = this.building[type].get();

        if (building == "built") {
          // Check if data has been updated
          return this.api.getSpreadsheetTime(this.api.urls[uc_type][this.format])
          .then((modifiedTime) => {
            const cookie = cookies.get(`${this.format}_${type}`);
            if (cookie) {
              if ((new Date(modifiedTime)) > (new Date(cookie))) {
                this[type].clear();
                this.building[type].set("setup");
                return this.setupType(type, resolve, reject);
              }
              else {
                return resolve();
              }
            }
            else {
              cookies.set(`${this.format}_${type}`, modifiedTime, { path: '/' });
              return resolve();
            }
          })
          .catch(() => {
            return resolve();
          });
        }
        else if (building == "building") {
          const disposer = observe(this.building[type], (change) => {
            disposer();
            resolve();
          });
          return disposer;
        }
        else if (building == "setup") {
          // check if the collection already exists in memory
          if (this[type].data.length == 0) {
            this.building[type].set("building");
            return this.api.parseSpreadsheetData(this.api.urls[uc_type][this.format], uc_type, true)
            .then(async (data) => {
              this[type].insert(data);
              this.building[type].set("built");

              try {
                const modifiedTime = await this.api.getSpreadsheetTime(this.api.urls[uc_type][this.format]);
                cookies.set(`${this.format}_${type}`, modifiedTime, { path: '/' });
              } catch (err) {/* */}
              
              return resolve();
            })
            .catch(() => {
              return reject();
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
      function databaseInitialize() {
        ["attacks", "battlegear", "creatures", "locations", "mugic"].forEach((type) => {
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

      const db = new Loki(`chaotic_${format}.db`, {
        autosave: true,
        autoload: true,
        autoloadCallback: databaseInitialize.bind(this),
        autosaveInterval: 4000,
        persistenceMethod: 'localStorage'
      });
  
      this.db = db;
    }
  
    purgeDB = () => {
      ["attacks", "battlegear", "creatures", "locations", "mugic"].forEach((type) => {
        this.db.removeCollection(type);
      });
      this.db.saveDatabase();
    }
}

export default CollectionDB;
