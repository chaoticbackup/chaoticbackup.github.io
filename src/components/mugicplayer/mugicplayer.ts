import Tone from 'tone';

// https://github.com/Tonejs/Tone.js/wiki/Time
class Note {
    time: number;
    value: {
        pitch: string;
        octave: number;
    }

    constructor(time: number, value: any) {
        this.time = time;
        this.value = value;
    }

    get pair() {
        return [this.time * Tone.time("4"), this.value.pitch + this.value.octave.toString()];
    }

    toNumber (): number {
        return 
    }
}

const letter_to_number = (letter: string): number => {
    switch (letter.charAt(0).toUpperCase()) {
        case "A":
            return 1;
        case "B":
            return 2;
        case "C":
            return 3;
        case "D":
            return 4;
        case "E":
            return 5;
        case "F":
            return 6;
        case "G":
            return 7;
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
        Tone.Transport.bpm.value = 120;
    }


    play(input: string) {
        let pattern: Note[] = [];
        input.split(" ").forEach((digit) => {
            // db notation uses duration (quarter notes) and pitch
            let [d, n] = digit.split(/[1-8]{1}/);
            pattern.push(new Note(parseInt(d), parseNote(n, pattern)));
        });
        
        new Tone.Part(
            (time: any, pitch: any) => {
                this.synth.triggerAttackRelease(pitch, "4n", time);
            }, 
            pattern.map((note) => {return note.pair})
        ).start(0);

        Tone.Transport.start();
    }

}

// Example: Canon of Casuality
// Eb 2F 2D   2G 2Bb 1A   3D
//    up down up up  down up

// If going up, go up, if going down go down with repeated notes
// If the first note and last are the same, they share the same octive
// If there is no trend (same note without previous two)
// Try to find the closer note to match with
const parseNote = (note: string, prev: Note[]): {pitch: string, octave: number} => {
    let octave: number;
    if (prev.length < 2) octave = 4;
    else {
        //TODO
    }

    return {pitch: note, octave};
}



export default MugicPlayer.getInstance();
