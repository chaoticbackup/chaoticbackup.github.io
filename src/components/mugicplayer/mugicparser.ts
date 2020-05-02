export class Note {
    pitch: string;
    octave: number;
    time: number;
    duration: number;
    velocity: number;

    constructor(duration: number, time: number, value: {pitch: string, octave: number}, velocity?: number) {
        this.duration = duration;
        this.time = time;
        this.pitch = value.pitch;
        this.octave = value.octave;
        if (velocity) this.velocity = velocity;
    }
    
}

export const output = (seq: Note[]) => {
    return seq.map(n => n.duration + n.pitch + n.octave.toString())
}

// db notation uses duration (quarter notes) and pitch
// 2Eb => E flat for 2 quarter notes
export const parseTune = (input: string): Note[] => {
    let seq: Note[] = [];
    let time = 0;
    console.log(input.split(" "));
    input.split(" ").forEach((note) => {
        const splitter = /(?:[1-8]{1})/;

        const match = note.match(splitter);
        if (match === null) throw new Error("invalid_input");

        const dur = parseInt(match[0]);
        const pitch = note.split(splitter)[1];
        
        const full_note = /[1-8]{1}[A-Za-z#]{1,2}([1-8]{1})/;
        if (full_note.test(note)) {
            const sp = note.match(full_note);
            if (sp === null) throw new Error("invalid_input");
            seq.push(new Note(dur, time, { pitch, octave: parseInt(sp[1]) }));
        }
        else {
            seq.push(new Note(dur, time, parseNote(pitch, seq)));
        }

        time += dur;
    });

    // If a note is repeated at the same octave, look at trend of last two notes
    // for (let i = 2; i < seq.length; i++) {
    //     const note = seq[i];
    //     const comp = seq[i-2];
    //     if (note.pitch === comp.pitch && note.octave === comp.octave) {
    //         const pitch = letter_to_number(note.pitch);
    //         seq[i].octave = trend(pitch, i, seq);
    //     }
    // }

    console.log(output(seq));

    return seq;
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
const parseNote = (pitch: string, seq: Note[]): {pitch: string, octave: number} => {
    let octave: number = (() => {
        // If its the first note its "middle octave"
        if (seq.length === 0) return 4;

        const l = seq.length - 1;
        const octave = seq[l].octave;

        const current = pitchValue(pitch, octave);
        const previous = pitchValue(seq[l]);
        const distance = compare(previous, current);

        // If its less than 3 pitches of the previous note, use the closest pitch
        if (distance < 3) {
            if (distance === 0) return octave;

            if (previous > pitchValue(5, octave)) {
                if (current < pitchValue(3, octave)) {
                    return octave + 1;
                }
                else {
                    return octave;
                }
            }
            else if (previous < pitchValue(3, octave)) {
                if (current > pitchValue(5, octave)) {
                    return octave - 1;
                }
                else {
                    return octave;
                }
            }
            return octave;
        } else if (l === 0) {
            if (distance === 3) {
                if (current > previous) {
                    return octave; 
                } 
                else {
                    return octave + 1;
                }
            }
            else if (current > previous) {
                return octave; 
            }
            else if (current < previous) {
                return octave - 1;
            }
        }
        
        // If its further away, look at the previous notes for a trend
        return trend(current, l, seq);
    })();

    if (octave > 5) octave = 5;
    
    return {pitch, octave};
}

/*
 *  Is the last note a step down from the note before? 
 *  If so consider that to be a higher weight.
 *  If the pattern is going up, go up, if going down go down with repeated notes
 *  Example, a note 4 away but on a downward trend would be prioritized over a 3 away in the other direction.
 *  If there is no change. Pick the octave the previous notes used.
*/ 
/**
 * Searches for a trend in previous notes to calculate the current octave to be used
 * For each iteration, the length is reduced so that an older set of notes is compared
 * @param current The note being calculated
 * @param l The index of the array to be compared
 */
const trend = (current: number, l: number, seq: Note[]): number => {
    if (l < 1) return seq[l].octave;

    let prev = pitchValue(seq[l]);
    let prev2 = pitchValue(seq[l-1]);
    console.log(prev2, prev, current);

    // downward trend
    if (prev2 > prev) {
        if (prev < current) {
            return seq[l].octave;
        }
        return seq[l].octave - 1;
    }
    // upward trend
    else if (prev2 < prev) {
        if (prev < current) {
            return seq[l].octave;
        }
        return seq[l].octave + 1;
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

function pitchValue(note: Note): number;
function pitchValue(letter: number, octave: number): number;
function pitchValue(pitch: string, octave: number): number;
function pitchValue(arg1: number | string | Note, arg2?: number): number {
    let pitch: number;
    let octave: number;
    if (arg1 instanceof Note) {
      pitch = letter_to_number(arg1.pitch);
      octave = arg1.octave;  
    } else {
        pitch = (typeof arg1 === 'number') ? arg1 : letter_to_number(arg1);
        octave = arg2 as number;
    }
    return pitch + (octave - 1) * 8;
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
