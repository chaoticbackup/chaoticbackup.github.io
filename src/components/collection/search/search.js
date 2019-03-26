import loki from 'lokijs';
import API from '../../SpreadsheetData';

export default function search_api(input) {

  // Sort data descending alphabetically
  let filter = (new loki("filter.db")).addCollection('filter');
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
    // clean name
    let inputname = input.name.replace(/\\/g, '').replace(/\(|\)/g, (match) => {return ("\\"+match)});
    attackResults = attackResults.find({'$or': [
      {'gsx$name': {'$regex': new RegExp(inputname, 'i')}},
      {'gsx$tags': {'$regex': new RegExp(inputname, 'i')}},
    ]});
    battlegearResults = battlegearResults.find({'$or': [
      {'gsx$name': {'$regex': new RegExp(inputname, 'i')}},
      {'gsx$tags': {'$regex': new RegExp(inputname, 'i')}},
    ]});
    creatureResults = creatureResults.find({'$or': [
      {'gsx$name': {'$regex': new RegExp(inputname, 'i')}},
      {'gsx$tags': {'$regex': new RegExp(inputname, 'i')}},
    ]});
    locationResults = locationResults.find({'$or': [
      {'gsx$name': {'$regex': new RegExp(inputname, 'i')}},
      {'gsx$tags': {'$regex': new RegExp(inputname, 'i')}}
    ]});
    mugicResults = mugicResults.find({'$or': [
      {'gsx$name': {'$regex': new RegExp(inputname, 'i')}},
      {'gsx$tags': {'$regex': new RegExp(inputname, 'i')}},
    ]});
  }


  // Card Text
  if (input.text.length > 0) {
    let textList = input.text.split(",").filter(Boolean).map((item) => {
      return ({'$regex': new RegExp(item.trim(), 'i')});
    });

    let parm = (() => {
      let list = [
        {'gsx$tags': {"$or": textList}},
        {'gsx$ability': {"$or": textList}},
        {'gsx$artist': {"$or": textList}}
      ]
      if (input.flavor) 
        list.splice(3, 0, {'gsx$flavortext': {"$or": textList}});

      return list;
    })();

    attackResults = attackResults.find({'$or': parm});
    battlegearResults = battlegearResults.find({'$or': parm});
    creatureResults = creatureResults.find({'$or': 
      (parm.concat([{'gsx$brainwashed': {"$or": textList}}]))
    });
    locationResults = locationResults.find({'$or': parm});
    mugicResults = mugicResults.find({'$or': parm});
  }

  // Past
  if (input.past) {
    attackResults = attackResults.find({'gsx$past': {'$gt': 0}});
    battlegearResults = battlegearResults.find({'gsx$past': {'$gt': 0}});
    creatureResults = creatureResults.find({'gsx$types': {'$regex': new RegExp("past", 'i')}});
    locationResults = locationResults.find({'gsx$past': {'$gt': 0}});
    mugicResults = mugicResults.find({'gsx$past': {'$gt': 0}});
  }

  // Mirage
  if (input.mirage) {
    locationResults = locationResults.find({'gsx$mirage': {'$gt': 0}});
    attackResults = attackResults.limit(0);
    battlegearResults = battlegearResults.limit(0);
    creatureResults = creatureResults.limit(0);
    mugicResults = mugicResults.limit(0);
  }

  // Subtypes / Initiative
  if (input.subtypes.length > 0) {
    let subtypesList = input.subtypes.split(",").filter(Boolean).map((item) => {
      return ({'$regex': new RegExp(item.trim(), 'i')});
    });

    creatureResults = creatureResults.find({'gsx$types': {'$or': subtypesList} });
    locationResults = locationResults.find({'gsx$initiative': {'$or': subtypesList}});
    attackResults = attackResults.limit(0);
    battlegearResults = battlegearResults.limit(0);
    mugicResults = mugicResults.limit(0);
  }

  // Minion
  if (input.minion) {
    locationResults = locationResults.limit(0);
    attackResults = attackResults.limit(0);
    battlegearResults = battlegearResults.limit(0);
    creatureResults = creatureResults.where((obj) => {
      return obj.gsx$brainwashed != ('');
    });
    mugicResults = mugicResults.limit(0);
  }


  // Search by tribe
  let tribesList = [];
  for (const tribe in input.tribes) {
    if (input.tribes[tribe])
      tribesList.push({'$regex': new RegExp(tribe, 'i')});
  }
  if (tribesList.length > 0) {
    creatureResults = creatureResults.find({'gsx$tribe': {'$or': tribesList} });
    mugicResults = mugicResults.find({'gsx$tribe': {'$or': tribesList} });
    attackResults = attackResults.limit(0);
    battlegearResults = battlegearResults.limit(0);
    locationResults = locationResults.limit(0);
  }

  // Search by elements
  if (input.elements.none) {
    if (!input.elements.and) {
      attackResults = attackResults
        .where((obj) => {return (obj.gsx$fire == (''))})
        .where((obj) => {return (obj.gsx$air == (''))})
        .where((obj) => {return (obj.gsx$earth == (''))})
        .where((obj) => {return (obj.gsx$water == (''))});

      creatureResults = creatureResults
        .where(obj => (obj.gsx$elements == ''));
    }
    else {
      attackResults = attackResults.where(
        (obj) => {return (input.elements.fire ? obj.gsx$fire != ('') : obj.gsx$fire == (''));}
      ).where(
        (obj) => {return (input.elements.air ? obj.gsx$air != ('') : obj.gsx$air == (''));}
      ).where(
        (obj) => {return (input.elements.earth ? obj.gsx$earth != ('') : obj.gsx$earth == (''));}
      ).where(
        (obj) => {return (input.elements.water ? obj.gsx$water != ('') : obj.gsx$water == (''));}
      );

      let el = "";
      ["fire", "air", "earth", "water"].forEach((element) => {
        if (input.elements[element])
          el += element + ", ";
      });

      if (el !== "") {
        creatureResults = creatureResults.find({'gsx$elements': 
            {'$regex': new RegExp("^" + el.substring(0, el.length-2), 'i')}
        });
      }
    }

    battlegearResults = battlegearResults.limit(0);
    locationResults = locationResults.limit(0);
    mugicResults = mugicResults.limit(0);
  }
  else {
    let elementsList = [];
    let elementsList2 = [];
    for (const element in input.elements) {
      if (element === "none" || element === "and") continue;
      if (input.elements[element]) {
        elementsList.push({'$regex': new RegExp(element, 'i')});
        elementsList2.push({['gsx$'+element]: {'$gte': 0}})
      }
    }
    if (elementsList.length > 0) {
      if (input.elements.and) {
       creatureResults = creatureResults.find({'gsx$elements': {'$and': elementsList} });
       attackResults = attackResults.find({'$and': elementsList2});
      }
      else {
        creatureResults = creatureResults.find({'gsx$elements': {'$or': elementsList} });
        attackResults = attackResults.find({'$or': elementsList2});
      }

      battlegearResults = battlegearResults.limit(0);
      locationResults = locationResults.limit(0);
      mugicResults = mugicResults.limit(0);
    }
  }

  // Stats
  if (input.disciplines.courage > 0)
    creatureResults = creatureResults.find({'gsx$courage': {'$gte': input.disciplines.courage}});

  if (input.disciplines.power > 0)
    creatureResults = creatureResults.find({'gsx$power': {'$gte': input.disciplines.power}});

  if (input.disciplines.wisdom > 0)
    creatureResults = creatureResults.find({'gsx$wisdom': {'$gte': input.disciplines.wisdom}});

  if (input.disciplines.speed > 0)
    creatureResults = creatureResults.find({'gsx$speed': {'$gte': input.disciplines.speed}});

  if (input.energy.min > 0)
    creatureResults = creatureResults.find({'gsx$energy': {'$gte': input.energy.min}});

  if (input.energy.max > 0 && input.energy.max >= input.energy.min)
    creatureResults = creatureResults.find({'gsx$energy': {'$lte': input.energy.max}});

  // (if any stats, filter out non-Creatures)
  if (input.energy.min > 0 || input.energy.max > 0 || input.disciplines.courage > 0 || input.disciplines.power > 0 || input.disciplines.wisdom > 0 || input.disciplines.speed > 0) {
    attackResults = attackResults.limit(0);
    battlegearResults = battlegearResults.limit(0);
    locationResults = locationResults.limit(0);
    mugicResults = mugicResults.limit(0);
  }

  // Mugic Counters/Cost | Build Points
  if (input.mcbp.min !== "" && input.mcbp.min >= 0) {
    attackResults = attackResults.find({'gsx$bp': {'$gte': input.mcbp.min}});
    creatureResults = creatureResults.find({'gsx$mugicability': {'$gte': input.mcbp.min}});
    mugicResults = mugicResults.find({'gsx$cost': {'$gte': input.mcbp.min}});
  }
  if (input.mcbp.max !== "" && input.mcbp.max >= 0 && input.mcbp.max >= input.mcbp.min) {
    attackResults = attackResults.find({'gsx$bp': {'$lte': input.mcbp.max}});
    creatureResults = creatureResults.find({'gsx$mugicability': {'$lte': input.mcbp.max}});
    mugicResults = mugicResults.find({'gsx$cost': {'$lte': input.mcbp.max}});
  }

  // filter out Battlegear and Locations if mcbp
  if (input.mcbp.max > 0 || input.mcbp.min > 0) {
    battlegearResults = battlegearResults.limit(0);
    locationResults = locationResults.limit(0);
  }

  // Unique
  if (input.mull.unique) {
    attackResults = attackResults.find({'gsx$unique': {'$gt': 0}});
    battlegearResults = battlegearResults.find({'gsx$unique': {'$gt': 0}});
    creatureResults = creatureResults.find({'gsx$unique': {'$gt': 0}});
    locationResults = locationResults.find({'gsx$unique': {'$gt': 0}});
    mugicResults = mugicResults.find({'gsx$unique': {'$gt': 0}});
  }

  // Loyal
  if (input.mull.loyal) {
    attackResults = attackResults.limit(0);
    battlegearResults = battlegearResults.find({'gsx$loyal': {'$gt': 0}});
    creatureResults = creatureResults.find({'gsx$loyal': {'$gt': 0}});
    mugicResults = mugicResults.limit(0);
    locationResults = locationResults.limit(0);
  }

  // Legendary
  if (input.mull.legendary) {
    attackResults = attackResults.find({'gsx$legendary': {'$gt': 0}});
    battlegearResults = battlegearResults.find({'gsx$legendary': {'$gt': 0}});
    creatureResults = creatureResults.find({'gsx$legendary': {'$gt': 0}});
    locationResults = locationResults.find({'gsx$legendary': {'$gt': 0}});
    mugicResults = mugicResults.find({'gsx$legendary': {'$gt': 0}});
  }

  // Non Loyal
  if (input.mull.mixed) {
    attackResults = attackResults.limit(0);
    creatureResults = creatureResults.find({'gsx$loyal': {'$lte': 0}});
    battlegearResults = battlegearResults.find({'gsx$loyal': {'$lte': 0}});
    mugicResults = mugicResults.limit(0);
    locationResults = locationResults.limit(0);
  }

  // Sets
  let setsList = [];
  for (const key in input.sets) {
    if (input.sets[key])
      setsList.push({'$eq': key.toUpperCase()});
  }
  if (setsList.length > 0) {
    attackResults = attackResults.find({'gsx$set': {'$or': setsList} });
    battlegearResults = battlegearResults.find({'gsx$set': {'$or': setsList} });
    creatureResults = creatureResults.find({'gsx$set': {'$or': setsList} });
    locationResults  = locationResults.find({'gsx$set': {'$or': setsList} });
    mugicResults = mugicResults.find({'gsx$set': {'$or': setsList} });
  }

  // Rarity
  let rarityList = [];
  for (const key in input.rarity) {
    if (input.rarity[key])
      rarityList.push({'$eq': key.split(" ").map(st => {return st.charAt(0).toUpperCase()+st.slice(1)}).join(" ")});
  }
  if (rarityList.length > 0) {
    attackResults = attackResults.find({'gsx$rarity': {'$or': rarityList} });
    battlegearResults = battlegearResults.find({'gsx$rarity': {'$or': rarityList} });
    creatureResults = creatureResults.find({'gsx$rarity': {'$or': rarityList} });
    locationResults = locationResults.find({'gsx$rarity': {'$or': rarityList} });
    mugicResults = mugicResults.find({'gsx$rarity': {'$or': rarityList} });
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
  let types = !(input.types.attack | input.types.battlegear | input.types.creature | input.types.location | input.types.mugic);

  if (types || input.types.attack) {
    let temp = attackResults.data();
    temp.forEach(function(v){ delete v.$loki });
    filter.insert(temp);
  }
  if (types || input.types.battlegear) {
    let temp = battlegearResults.data();
    temp.forEach(function(v){ delete v.$loki });
    filter.insert(temp);
  }
  if (types || input.types.creature) {
    let temp = creatureResults.data()
    temp.forEach(function(v){ delete v.$loki });
    filter.insert(temp);
  }
  if (types || input.types.location) {
    let temp = locationResults.data()
    temp.forEach(function(v){ delete v.$loki });
    filter.insert(temp);
  }
  if (types || input.types.mugic) {
    let temp = mugicResults.data()
    temp.forEach(function(v){ delete v.$loki });
    filter.insert(temp);
  }

  return pview.data();
}
