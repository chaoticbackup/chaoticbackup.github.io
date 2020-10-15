import 'mocha';
import { expect } from 'chai';

import { parseTune, output } from './mugicparser';

const cases = {
    "Canon of Casuality": {
        input: "2Eb 2F 2D 2G 2Bb 1A 3D",
        output: ["2Eb4", "2F4", "2D4", "2G4", "2Bb5", "1A5", "3D5"]
    },
    "Fortissimo": {
        input: "2G#4 1C#5 2E5 2C#5 2D#5 1G#4 4F#5",
        output: ["2G#4", "1C#5", "2E5", "2C#5", "2D#5", "1G#4", "4F#5"]
    }
}

Object.entries(cases).forEach(([key, value]) => {
    describe(key, () => {
        it(`should return ${value.output}`, () => {
            const tune = output(parseTune(value.input));
            expect(tune).to.deep.equal(value.output);
        });
    });
});
