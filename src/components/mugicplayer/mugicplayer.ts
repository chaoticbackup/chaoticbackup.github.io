import {Transport, Synth, Part} from 'tone';

// https://github.com/Tonejs/Tone.js/wiki/Time
// https://github.com/Tonejs/Tone.js/wiki/Events
export class Note {
    pitch: string;
    octave: number;
    duration: number;
    time: number;

    constructor(duration: number, time: number, value: {pitch: string, octave: number}) {
        this.duration = duration;
        this.pitch = value.pitch;
        this.octave = value.octave;
        this.time = time;
    }

    get note() {
        return {
            time: this.time + "/4n",
            pitch: this.pitch + this.octave.toString(),
            duration: this.duration + "/4n"
        }
    }
}

export class MugicPlayer {
    private static instance: MugicPlayer;
    private synth: Synth;
    private part: Part;
    private transport: Transport;

    // Singleton
    static getInstance() {
        if (!MugicPlayer.instance) MugicPlayer.instance = new MugicPlayer();
        return MugicPlayer.instance;
    }

    constructor() {
        this.synth = new Synth().toDestination();
        this.part = new Part();
        Transport.bpm.value = 240;
    }

    /**
     * Composes and plays a tune parsed from the Mugic entry
     * @input the string of Mugic notes
     */
    // Example: Canon of Casuality
    // 2Eb 2F 2D   2G 2Bb 1A   3D
    //     up down up up  down up
    play(input: string) {
        Transport.stop();
        this.part.dispose();

        try {
            const tune = parseTune(input);

            this.part = new Part(
                (time: number, note: any) => {
                    // console.log(time, note);
                    this.synth.triggerAttackRelease(note.pitch, note.duration, time);
                },
                tune.map((n) => n.note)
            ).start();
    
            Transport.start();
        }
        catch (error) {
            console.log(error);
            // TODO show user the error
            return;
        }

    }

}

// db notation uses duration (quarter notes) and pitch
// 2Eb => E flat for 2 quarter notes
const parseTune = (input: string): Note[] => {
    let tune: Note[] = [];
    let time = 0;

    input.split(" ").forEach((note) => {

        let match = note.match(/(?:[1-8]{1})/);
        if (match === null) throw new Error("invalid_input");

        let dur = parseInt(match[0]);
        let pitch = note.split(/(?:[1-8]{1})/)[1];

        tune.push(new Note(dur, time, parseNote(pitch, tune)));

        time += dur;
    });

    return tune;
}

/*
    We have an array of previous notes; for the first to cases the octave is middle (4).
    Now for the third and further note, we'll need to look at the previous notes. 
    First check the "closeness" to the last note (if its within 2.5 notes). 
    Go with the appropriate octave (an A above a G4 would be an A5)
    But if its not within that closeness, look at the trend. 
*/
/**
 * Tries to find the closer note to match of the previous notes octave
 * @note The note's 
 */
const parseNote = (note: string, seq: Note[]): {pitch: string, octave: number} => {
    let octave: number = (() => {
        // If its the first note
        if (seq.length === 0) return 4;

        const l = seq.length;
        const current = letter_to_number(note);
        const previous = letter_to_number(seq[l-1].pitch);
        const distance = compare(previous, current);

        // If its less than 3 pitches of the previous note, use the closest pitch
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
        
        // If its further away, look at the previous notes for a trend
        return trend(current, l, seq);
    })();

    return {pitch: note, octave};
}

/*
 *  Is the last note a step down from the note before? 
 *  If so consider that to be a higher weight.
 *  If the pattern is going up, go up, if going down go down with repeated notes
 *  Example, a note 4 away but on a downward trend would be prioritized over a 3 away in the other direction.
 *  If there is no change. Pick the octive the previous notes used.
*/ 
/**
 * Searches for a trend in previous notes to calculate the current octave to be used
 * For each iteration, the length is reduced so that an older set of notes is compared
 * @param current The note being calculated
 * @param length The length of the array to be compared
 */
const trend = (current: number, l: number, seq: Note[]): number => {
    if (l < 2) return seq[l-1].octave;

    let prev = letter_to_number(seq[l-1].pitch);
    let prev2 = letter_to_number(seq[l-2].pitch);

    // downward trend
    if (prev2 > prev) {
        if (prev < current) {
            return seq[l-1].octave;
        }
        return seq[l-1].octave - 1;
    }
    // upward trend
    else if (prev2 < prev) {
        if (prev < current) {
            return seq[l-1].octave;
        }
        return seq[l-1].octave + 1;
    }
    // same notes
    else {
        return trend(current, l-1, seq);
    }
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
