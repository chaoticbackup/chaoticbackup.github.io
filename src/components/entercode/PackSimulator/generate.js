import React from 'react';
import loki from 'lokijs';
import API from '../../SpreadsheetData';
import { observable } from 'mobx';

class GenerateCard {
    @observable filter = null;

    setupDB = () => {
        let filter = (new loki("filter.db")).addCollection('filter');

        // Sort data descending alphabetically
        var pview = filter.addDynamicView('alphabetical');
        pview.applySimpleSort('gsx$name');

        let temp;

        temp = API.cards.attacks.find();
        temp.forEach((v) => delete v.$loki);
        filter.insert(temp);

        temp = API.cards.battlegear.find();
        temp.forEach((v) => delete v.$loki);
        filter.insert(temp);

        temp = API.cards.creatures.find();
        temp.forEach((v) => delete v.$loki);
        filter.insert(temp);

        temp = API.cards.locations.find();
        temp.forEach((v) => delete v.$loki);
        filter.insert(temp);

        temp = API.cards.mugic.find();
        temp.forEach((v) => delete v.$loki);
        filter.insert(temp);

        this.filter = filter;
    }

    generate = ({ packs, set }) => {
        let cards = []; // Returned list of card divs
        let card_names = []; // Prevent duplicates in pack
        let key = 0; // React key iterator uniqueness

        let pview = this.filter.addDynamicView('set');

        const gendisp = (avg) => {
            let min = parseInt(avg) - 10;
            if (min < 0) min = 0;
            return (Math.floor(Math.random() * 5)) * 5 + min;
        }
        const geneng = (avg) => {
            let min = parseInt(avg) - 5;
            if (min < 0) min = 0;
            return (Math.floor(Math.random() * 3)) * 5 + min;
        }

        const gencard = (results) => {
            let id = Math.floor(Math.random() * results.length);
            let card = results[id];

            if (!card) {
                cards.push(<div key={key++} className="card" style={{ backgroundImage: `url("${API.base_image + API.card_back}")` }}></div>);
                return;
            }

            if (card_names.indexOf(card.gsx$name) > -1 || card.gsx$exclusive.includes("Starter")) {
                return gencard(results);
            }
            card_names.push(card.gsx$name);

            if (card.gsx$type != "Creatures") {
                cards.push(<div key={key++} className="card" style={{ backgroundImage: `url("${API.base_image + (card.gsx$image || API.card_back)}")` }}></div>);
            }
            else {
                const courage = gendisp(card.gsx$courage);
                const power = gendisp(card.gsx$power);
                const wisdom = gendisp(card.gsx$wisdom);
                const speed = gendisp(card.gsx$speed);
                const energy = geneng(card.gsx$energy);
                cards.push(<div key={key++} className="card" style={{ backgroundImage: `url("${API.base_image + (card.gsx$image || API.card_back)}")` }}>
                    <div className="stats">
                        <span key="courage">{courage}</span>
                        <span key="power">{power}</span>
                        <span key="wisdom">{wisdom}</span>
                        <span key="speed">{speed}</span>
                        <span key="energy">{energy}</span>
                    </div>
                </div>);
            }

        }

        const genrarity = (rarity, num) => {
            pview.applyFind({ 'gsx$set': set })
                .applyFind({ 'gsx$rarity': rarity });
            let results = pview.data();
            for (let i = 0; i < num; i++) gencard(results);
            pview.removeFilters();
        }



        // DOP to FUN had 9 cards: 4 Common, 3 Uncommon, 2 Rare+
        // OP1 had 3 cards: 2 Common, 1 Uncommon+
        // Premium Packs had 6 cards, 5 Super and 1 Ultra
        // AU sets had 9 cards: 6 Common and 3 Rare+
        const randomRare = () => {
            let randomNumber = Math.floor(Math.random() * 24) + 1;
            if (randomNumber == 24) return "Ultra Rare";
            else if (randomNumber % 3 == 0) return "Super Rare";
            else return "Rare";
        };

        const newSets = ["AU", "FAS"];

        for (let i = 0; i < packs; i++) {
            if (set === "OP1") {
                genrarity("Common", 2);
                genrarity((() => {
                    const rnd = Math.floor(Math.random() * 75) + 1;
                    if (rnd == 75) return "Ultra Rare";
                    else if (rnd < 19) return "Super Rare";
                    else if (rnd < 44) return "Rare";
                    else return "Uncommon";
                })(), 1);
            }
            else if (set === "PE1") {
                genrarity("Super Rare", 5);
                genrarity("Ultra Rare", 1);
            }
            // AU sets and after
            else if (newSets.indexOf(set) > -1) {
                genrarity('Common', 6);
                genrarity('Rare', 2);
                genrarity(randomRare(), 1);
            }
            else {
                // Before AU sets
                genrarity('Common', 4);
                genrarity('Uncommon', 3);
                genrarity('Rare', 1);
                genrarity(randomRare(), 1);
            }
            card_names = [];
        }

        this.filter.removeDynamicView('set');

        return cards;
    }
}

const { generate, setupDB } = new GenerateCard();

export { generate, setupDB };