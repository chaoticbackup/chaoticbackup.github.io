const Tone = require('tone');

// https://github.com/Tonejs/Tone.js/wiki/Time
// https://github.com/Tonejs/Tone.js/wiki/Events
export class Note {
    time: number;
    pitch: string;
    octave: number;

    constructor(time: number, value: {pitch: string, octave: number}) {
        this.time = time;
        this.pitch = value.pitch;
        this.octave = value.octave;
    }

    get pair() {
        return [this.time + "/4n", this.pitch + this.octave.toString()];
    }
}

class MugicPlayer {
    private static instance: MugicPlayer;
    synth: any;

    // Singleton
    static getInstance() {
        if (!MugicPlayer.instance) MugicPlayer.instance = new MugicPlayer();
        return MugicPlayer.instance;
    }

    constructor() {
        this.synth = new Tone.Synth().toMaster();
        Tone.Transport.bpm.value = 100;
    }

    // Example: Canon of Casuality
    // 2Eb 2F 2D   2G 2Bb 1A   3D
    //     up down up up  down up
    /**
     * Composes and plays a tune parsed from the Mugic entry
     * @input the string of Mugic notes
     */
    play(input: string) {
        let tune: Note[] = [];
        input.split(" ").forEach((note) => {
            // db notation uses duration (quarter notes) and pitch
            let d = note.match(/(?:[1-8]{1})/)[0];
            let n = note.split(/(?:[1-8]{1})/)[1];
            tune.push(new Note(parseInt(d), parseNote(n, tune)));
        });

        let output = tune.map((note) => {return note.pair});

        console.log(output);
        
        // new Tone.Part(
        //     (time: any, pitch: any) => {
        //         this.synth.triggerAttackRelease(pitch, "4n", time);
        //     }, 
        //     tune.map((note) => {return note.pair})
        // ).start(0);

        // Tone.Transport.start();
    }

}

/**
 * Tries to find the closer note to match of the previous notes octave
 */
/*
    We have an array of previous notes; for the first to cases the octave is middle (4) easy.
    Now for the third and further note, we'll need to look at the previous notes. 
    First check the "closness" to the last note. (if its within 2.5 notes lets say). 
    Go with the appropriate octave (an A above a G4 would be an A5)
    But if its not within that closeness. Look at the trend. 
    Is the last note a step down from the note before? 
    If so consider that to be a higher weight.  If going up, go up, if going down go down with repeated notes
    Example, a note 4 away but on a downward trend would be prioritized over a 3 away in the other direction.
    If there is no change. Pick the octive the previous notes used.
*/
export const parseNote = (note: string, seq: Note[]): {pitch: string, octave: number} => {
    let octave: number = (() => {
        // If its the first two notes
        if (seq.length < 2) return 4;

        const l = seq.length;

        let previous = letter_to_number(seq[l-1].pitch);
        let current = letter_to_number(note);
        let distance = compare(previous, current);

        // If its within two pitches of the previous, use the closest note
        if (distance < 3) {
            if (distance === 0) return seq[l-1].octave;

            if (previous > 5) {
                if (current < 3) {
                    return seq[l-1].octave + 1;
                }
                else {
                    return seq[l-1].octave;
                }
            }
            else if (previous < 3) {
                if (current > 5) {
                    return seq[l-1].octave - 1;
                }
                else {
                    return seq[l-1].octave;
                }
            }
            return seq[l-1].octave;
        }
        
        // If its slightly further away, look at the last two notes for a trend
        let prev2 = letter_to_number(seq[l-2].pitch);
        // Downward trend
        if (prev2 > previous) {
            if (previous < current) {
                return seq[l-1].octave;
            }
            return seq[l-1].octave - 1;
        }
        // upward trend
        else if (prev2 < previous) {
            if (previous < current) {
                return seq[l-1].octave;
            }
            return seq[l-1].octave + 1;
        }
        // same notes
        else {

        }
        
        return 1; // debug shouldn't reach 1
    })();

    return {pitch: note, octave};
}

/**
 * Takes two pitches and returns the distance between them
 */
const compare = (one: number, two: number): number => {
    let res = Math.abs(one - two);
    if (res < 4) {
        return res;
    }
    else if (res > 3.5) {
        return res - 1;
    }
    else if (res > 4.5) {
        return res - 2;
    }
    else if (res > 5.5) {
        return res - 3;
    }
    else if (res > 6.5) {
        return res - 4;
    }
    
    return res;
}

/**
 * Converts a pitch to numerical value for calculations
 */
const letter_to_number = (pitch: string): number => {
    let num: number;
    switch (pitch.charAt(0).toUpperCase()) {
        case "A":
            num = 1;
            break;
        case "B":
            num = 2;
            break;
        case "C":
            num = 3;
            break;
        case "D":
            num = 4;
            break;
        case "E":
            num = 5;
            break;
        case "F":
            num = 6;
            break;
        case "G":
            num = 7;
            break;
        // In the case of incorrect input, coerce note to a C
        default:
            num = 3;
    }
    if (pitch.length > 1) {
        if (pitch.charAt(1).toLowerCase() === "b") num -= .5;
        else if (pitch.charAt(1) === "#") num += .5;
    }
    return num;
}

export default MugicPlayer.getInstance();
