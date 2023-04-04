import loki from 'lokijs';

import API from '../../SpreadsheetData';

function cleanInputRegex(input, check=true) {
  input = input.replace(/\‘|\’/g, "'");
  if (check === true) {
    const testRegex = /[\^$+*\[\]|]/g;
    if (testRegex.test(input)) {
      try {
        return new RegExp(input, 'i');
      } catch (e) {/* */}
    } 
  }

  input = input
    .replace(/[\^$+*\[\]\\]/g, '')
    .replace(/[\(\)]/g, (match) => {
      console.log(match);
      return ("\\"+match);
    });
  // .replace(/~(\w+)/, (match) => (`\(?!${match}\)`));

  return new RegExp(input, 'i');
}

export default function search_api(input) {

  // Sort data descending alphabetically
  const filter = (new loki("filter.db")).addCollection('filter');
  var pview = filter.addDynamicView('filter');
  pview.applySimpleSort('gsx$name');

  // begin data filtering
  let attackResults = API.cards.attacks.chain();
  let battlegearResults = API.cards.battlegear.chain();
  let creatureResults = API.cards.creatures.chain();
  let locationResults = API.cards.locations.chain();
  let mugicResults = API.cards.mugic.chain();

  // ignore cards with no set
  attackResults = attackResults.where((obj) => {
    return obj.gsx$set != ('');
  });
  battlegearResults = battlegearResults.where((obj) => {
    return obj.gsx$set != ('');
  });
  creatureResults = creatureResults.where((obj) => {
    return obj.gsx$set != ('');
  });
  locationResults = locationResults.where((obj) => {
    return obj.gsx$set != ('');
  });
  mugicResults = mugicResults.where((obj) => {
    return obj.gsx$set != ('');
  });

  // Search by name
  if (input.name.length > 0) {
    const negates = [];
    let inputname = input.name.replace(/(?:~)([\w,()]+)/g, (_, p1) => { negates.push(p1); return "" });

    if (inputname.length > 0) {
      inputname = cleanInputRegex(inputname);

      attackResults = attackResults.find({ '$or': [
        { 'gsx$name': { '$regex': inputname }},
        { 'gsx$tags': { '$regex': inputname }},
      ]});
      battlegearResults = battlegearResults.find({ '$or': [
        { 'gsx$name': { '$regex': inputname }},
        { 'gsx$tags': { '$regex': inputname }},
      ]});
      creatureResults = creatureResults.find({ '$or': [
        { 'gsx$name': { '$regex': inputname }},
        { 'gsx$tags': { '$regex': inputname }},
      ]});
      locationResults = locationResults.find({ '$or': [
        { 'gsx$name': { '$regex': inputname }},
        { 'gsx$tags': { '$regex': inputname }}
      ]});
      mugicResults = mugicResults.find({ '$or': [
        { 'gsx$name': { '$regex': inputname }},
        { 'gsx$tags': { '$regex': inputname }},
      ]});
    }

    if (negates.length > 0) {
      const ignoreText = (obj) => {
        let truth = false;
        negates.forEach((word) => {
          truth |= (obj.gsx$name.toLowerCase().indexOf(word.toLowerCase().replace('_', ' ')) > -1);
        });
        return !truth;
      };

      attackResults = attackResults.where(ignoreText);
      battlegearResults = battlegearResults.where(ignoreText);
      creatureResults = creatureResults.where(ignoreText);
      locationResults = locationResults.where(ignoreText);
      mugicResults = mugicResults.where(ignoreText);
    }

  }


  // Card Text
  if (input.text.length > 0) {
    const negates = [];
    let inputtext = input.text.replace(/(?:~)(\w+)/g, (_, p1) => { negates.push(p1); return "" });

    if (inputtext.length > 0) {
      inputtext = cleanInputRegex(inputtext);

      const parm = (() => {
        const list = [
          { 'gsx$tags': { '$regex': inputtext }},
          { 'gsx$ability': { '$regex': inputtext }}
        ];
        if (input.flavor) {
          list.push({ 'gsx$flavortext': { '$regex': inputtext }});
          list.push({ 'gsx$artist': { '$regex': inputtext }});
        }
        return list;
      })();
  
      attackResults = attackResults.find({ '$or': parm });
      battlegearResults = battlegearResults.find({ '$or': parm });
      creatureResults = creatureResults.find({ '$or':
        (parm.concat([{ 'gsx$brainwashed': { '$regex': inputtext }}]))
      });
      locationResults = locationResults.find({ '$or': parm });
      mugicResults = mugicResults.find({ '$or': parm });
    }

    if (negates.length > 0) {
      const ignoreText = (obj, creature=false) => {
        let truth = false;
        negates.forEach((word) => {
          truth |= (obj.gsx$ability.toLowerCase().indexOf(word.toLowerCase()) > -1);
          truth |= (obj.gsx$flavortext.toLowerCase().indexOf(word.toLowerCase()) > -1);
          if (creature) truth |= (obj.gsx$brainwashed.toLowerCase().indexOf(word.toLowerCase()) > -1);
        });
        return !truth;
      };

      attackResults = attackResults.where(ignoreText);
      battlegearResults = battlegearResults.where(ignoreText);
      creatureResults = creatureResults.where(obj => ignoreText(obj, true));
      locationResults = locationResults.where(ignoreText);
      mugicResults = mugicResults.where(ignoreText);
    }

  }

  // Subtypes / Initiative
  if (input.subtypes.length > 0) {
    const subtypesList = input.subtypes.split(",").filter(Boolean).map((item) => {
      return ({ '$regex': cleanInputRegex(item, false) });
    });

    creatureResults = creatureResults.find({ 'gsx$types': { '$or': subtypesList }});
    locationResults = locationResults.find({ '$or': [{ 'gsx$initiative': { '$or': subtypesList }}, { 'gsx$types': { '$or': subtypesList }}]});
    attackResults = attackResults.limit(0);
    battlegearResults = battlegearResults.find({ 'gsx$types': { '$or': subtypesList }});
    mugicResults = mugicResults.limit(0);
  }

  // Search by tribe
  const tribesList = [];
  for (const tribe in input.tribes) {
    if (input.tribes[tribe])
      tribesList.push({ '$regex': new RegExp(tribe, 'i') });
  }
  if (tribesList.length > 0) {
    creatureResults = creatureResults.find({ 'gsx$tribe': { '$or': tribesList }});
    mugicResults = mugicResults.find({ 'gsx$tribe': { '$or': tribesList }});
    attackResults = attackResults.limit(0);
    battlegearResults = battlegearResults.limit(0);
    locationResults = locationResults.limit(0);
  }

  // Search by elements
  if (input.elements.none) {
    const { fire, air, earth, water } = input.elements;

    // Note / None
    if (!input.elements.and) {
      // If any elements are present, then exclude them in the search
      if (fire || air || earth || water) {
        if (fire) attackResults = attackResults.where(obj => obj.gsx$fire == "");
        if (air) attackResults = attackResults.where(obj => obj.gsx$air == "");
        if (earth) attackResults = attackResults.where(obj => obj.gsx$earth == "");
        if (water) attackResults = attackResults.where(obj => obj.gsx$water == "");

        const el = ["fire", "air", "earth", "water"].reduce((prev, e) => 
          prev + (input.elements[e] ? `(?!${e})`: '')
        , "");

        creatureResults = creatureResults.find({ 'gsx$elements':
            { '$regex': new RegExp(`^(${el}.)*$`, "i") }
        });
      } else {
        attackResults = attackResults
          .where((obj) => obj.gsx$fire == (''))
          .where((obj) => obj.gsx$air == (''))
          .where((obj) => obj.gsx$earth == (''))
          .where((obj) => obj.gsx$water == (''));

        creatureResults = creatureResults
          .where(obj => (obj.gsx$elements == ''));
      }
    }
    else {
      attackResults = attackResults
        .where((obj) => (fire ? obj.gsx$fire != "" : obj.gsx$fire == ""))
        .where((obj) => (air ? obj.gsx$air != "" : obj.gsx$air == ""))
        .where((obj) => (earth ? obj.gsx$earth != "" : obj.gsx$earth == ""))
        .where((obj) => (water ? obj.gsx$water != "" : obj.gsx$water == ""));

      const el = ["fire", "air", "earth", "water"].filter((e) =>
        input.elements[e]
      ).join(', ');

      if (el !== "") {
        creatureResults = creatureResults.find({ 'gsx$elements':
            { '$regex': new RegExp("^" + el + "\s*$", 'i') }
        });
      }
    }

    battlegearResults = battlegearResults.limit(0);
    locationResults = locationResults.limit(0);
    mugicResults = mugicResults.limit(0);
  }
  else {
    const elementsList = [];
    const elementsList2 = [];
    for (const element in input.elements) {
      if (element === "none" || element === "and") continue;
      if (input.elements[element]) {
        elementsList.push({ '$regex': new RegExp(element, 'i') });
        elementsList2.push({ ['gsx$'+element]: { '$gte': 0 }});
      }
    }
    if (elementsList.length > 0) {
      if (input.elements.and) {
        creatureResults = creatureResults.find({ 'gsx$elements': { '$and': elementsList }});
        attackResults = attackResults.find({ '$and': elementsList2 });
      }
      else {
        creatureResults = creatureResults.find({ 'gsx$elements': { '$or': elementsList }});
        attackResults = attackResults.find({ '$or': elementsList2 });
      }

      battlegearResults = battlegearResults.limit(0);
      locationResults = locationResults.limit(0);
      mugicResults = mugicResults.limit(0);
    }
  }

  // Stats
  const max_disc = (input.disciplines.max ? input.disciplines.max : false) ? '$lte' : '$gte';
  if (input.disciplines.courage > 0)
    creatureResults = creatureResults.find({ 'gsx$courage': { [max_disc]: input.disciplines.courage }});

  if (input.disciplines.power > 0)
    creatureResults = creatureResults.find({ 'gsx$power': { [max_disc]: input.disciplines.power }});

  if (input.disciplines.wisdom > 0)
    creatureResults = creatureResults.find({ 'gsx$wisdom': { [max_disc]: input.disciplines.wisdom }});

  if (input.disciplines.speed > 0)
    creatureResults = creatureResults.find({ 'gsx$speed': { [max_disc]: input.disciplines.speed }});

  if (input.energy.min > 0)
    creatureResults = creatureResults.find({ 'gsx$energy': { '$gte': input.energy.min }});

  if (input.energy.max > 0 && input.energy.max >= input.energy.min)
    creatureResults = creatureResults.find({ 'gsx$energy': { '$lte': input.energy.max }});

  // (if any stats, filter out non-Creatures)
  if (input.energy.min > 0 || input.energy.max > 0 || input.disciplines.courage > 0 || input.disciplines.power > 0 || input.disciplines.wisdom > 0 || input.disciplines.speed > 0) {
    attackResults = attackResults.limit(0);
    battlegearResults = battlegearResults.limit(0);
    locationResults = locationResults.limit(0);
    mugicResults = mugicResults.limit(0);
  }

  // Mugic Counters/Cost | Build Points
  if (input.mcbp.min !== "" && input.mcbp.min >= 0) {
    attackResults = attackResults.find({ 'gsx$bp': { '$gte': input.mcbp.min }});
    creatureResults = creatureResults.find({ 'gsx$mugicability': { '$gte': input.mcbp.min }});
    mugicResults = mugicResults.find({ 'gsx$cost': { '$gte': input.mcbp.min }});
  }
  if (input.mcbp.max !== "" && input.mcbp.max >= 0 && input.mcbp.max >= input.mcbp.min) {
    attackResults = attackResults.find({ 'gsx$bp': { '$lte': input.mcbp.max }});
    creatureResults = creatureResults.find({ 'gsx$mugicability': { '$lte': input.mcbp.max }});
    mugicResults = mugicResults.find({ 'gsx$cost': { '$lte': input.mcbp.max }});
  }

  // filter out Battlegear and Locations if mcbp
  if (input.mcbp.max > 0 || input.mcbp.min > 0) {
    battlegearResults = battlegearResults.limit(0);
    locationResults = locationResults.limit(0);
  }

  // Unique
  if (input.mull.unique) {
    attackResults = attackResults.find({ 'gsx$unique': { '$gt': 0 }});
    battlegearResults = battlegearResults.find({ 'gsx$unique': { '$gt': 0 }});
    creatureResults = creatureResults.find({ 'gsx$unique': { '$gt': 0 }});
    locationResults = locationResults.find({ 'gsx$unique': { '$gt': 0 }});
    mugicResults = mugicResults.find({ 'gsx$unique': { '$gt': 0 }});
  }

  // Loyal
  if (input.mull.loyal) {
    attackResults = attackResults.limit(0);
    battlegearResults = battlegearResults.find({ 'gsx$loyal': { '$gt': 0 }});
    creatureResults = creatureResults.find({ 'gsx$loyal': { '$gt': 0 }});
    mugicResults = mugicResults.limit(0);
    locationResults = locationResults.limit(0);
  }

  // Legendary
  if (input.mull.legendary) {
    attackResults = attackResults.find({ 'gsx$legendary': { '$gt': 0 }});
    battlegearResults = battlegearResults.find({ 'gsx$legendary': { '$gt': 0 }});
    creatureResults = creatureResults.find({ 'gsx$legendary': { '$gt': 0 }});
    locationResults = locationResults.find({ 'gsx$legendary': { '$gt': 0 }});
    mugicResults = mugicResults.find({ 'gsx$legendary': { '$gt': 0 }});
  }

  // Non Loyal
  if (input.mull.mixed) {
    // attackResults = attackResults.limit(0);
    creatureResults = creatureResults.find({ 'gsx$loyal': { '$lte': 0 }});
    battlegearResults = battlegearResults.find({ 'gsx$loyal': { '$lte': 0 }});
    // mugicResults = mugicResults.limit(0);
    // locationResults = locationResults.limit(0);
  }

  // Sets
  const setsList = [];

  for (const key in input.sets) {
    if (input.sets[key])
      setsList.push({ '$eq': key.toUpperCase() });
  }
  if (setsList.length === 0) {
    // Only show prototype cards when explicitly selected
    const keys = Object.keys(input.sets);
    if (!input.sets.proto) keys.splice(keys.indexOf("proto"));
    for (const i in keys) {
      setsList.push({ '$eq': keys[i].toUpperCase() });
    }
  }
  if (setsList.length > 0) {
    attackResults = attackResults.find({ 'gsx$set': { '$or': setsList }});
    battlegearResults = battlegearResults.find({ 'gsx$set': { '$or': setsList }});
    creatureResults = creatureResults.find({ 'gsx$set': { '$or': setsList }});
    locationResults  = locationResults.find({ 'gsx$set': { '$or': setsList }});
    mugicResults = mugicResults.find({ 'gsx$set': { '$or': setsList }});
  }

  // Rarity
  const rarityList = [];
  for (const key in input.rarity) {
    if (input.rarity[key])
      rarityList.push({ '$eq': key.split(" ").map(st => {return st.charAt(0).toUpperCase()+st.slice(1)}).join(" ") });
  }
  if (rarityList.length > 0) {
    attackResults = attackResults.find({ 'gsx$rarity': { '$or': rarityList }});
    battlegearResults = battlegearResults.find({ 'gsx$rarity': { '$or': rarityList }});
    creatureResults = creatureResults.find({ 'gsx$rarity': { '$or': rarityList }});
    locationResults = locationResults.find({ 'gsx$rarity': { '$or': rarityList }});
    mugicResults = mugicResults.find({ 'gsx$rarity': { '$or': rarityList }});
  }

  // Gender
  // let genderList = [];
  // for (const key in input.gender) {
  //   if (input.gender[key])
  //     genderList.push({'$regex': new RegExp(key, 'i')})
  // }
  // if (genderList.length > 0) {
  //   attackResults = attackResults.limit(0);
  //   battlegearResults = battlegearResults.limit(0);
  //   creatureResults = creatureResults.find({'gsx$gender': {'$or': genderList} });
  //   locationResults = locationResults.limit(0);
  //   mugicResults = mugicResults.limit(0);
  // }

  // Merge data
  const types = !(input.types.attack | input.types.battlegear | input.types.creature | input.types.location | input.types.mugic);

  if (types || input.types.attack) {
    const temp = attackResults.data();
    temp.forEach((v) => { delete v.$loki });
    filter.insert(temp);
  }
  if (types || input.types.battlegear) {
    const temp = battlegearResults.data();
    temp.forEach((v) => { delete v.$loki });
    filter.insert(temp);
  }
  if (types || input.types.creature) {
    const temp = creatureResults.data();
    temp.forEach((v) => { delete v.$loki });
    filter.insert(temp);
  }
  if (types || input.types.location) {
    const temp = locationResults.data();
    temp.forEach((v) => { delete v.$loki });
    filter.insert(temp);
  }
  if (types || input.types.mugic) {
    const temp = mugicResults.data();
    temp.forEach((v) => { delete v.$loki });
    filter.insert(temp);
  }

  return pview.data();
}
