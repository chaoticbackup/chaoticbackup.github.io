import {Time, Transport, Synth, Part, PolySynth, EnvelopeCurve} from 'tone';

import { Note, parseTune } from './mugicparser';

type BasicEnvelopeCurve = "linear" | "exponential";

// https://github.com/Tonejs/Tone.js/wiki/Time
// https://github.com/Tonejs/Tone.js/wiki/Events
interface note_value {
    time: number
    pitch: string,
    duration: number,
    velocity?: number
}

class Note_Value extends Note {
    constructor(note: Note) {
        const { duration, time, pitch, octave, velocity } = note;
        super(duration, time, { pitch, octave }, velocity);
    }

    get value(): note_value {
        return {
            time: Time(this.time).quantize("4n") / 4,
            pitch: this.pitch + this.octave.toString(),
            duration: Time(this.duration).quantize("4n") / 4,
            velocity: this.velocity,
        }
    }
}

export class MugicPlayer {
    private static instance: MugicPlayer;
    private synth: Synth;
    private part: Part;

    // Singleton
    static getInstance() {
        if (!MugicPlayer.instance) MugicPlayer.instance = new MugicPlayer();
        return MugicPlayer.instance;
    }

    constructor() {
        const options = {
            frequency: 440,
            oscillator: {
                type: "sine" as any
            },
            envelope: {
                attack: 0.40,
                decay: 0.10,
                release: 0.5,
                sustain: 1,
                attackCurve: "cosine" as EnvelopeCurve,
                releaseCurve: "exponential" as EnvelopeCurve,
                decayCurve: "exponential" as BasicEnvelopeCurve
            },
            pitchDecay: 0.05
        };
        this.synth = new Synth(options).toDestination();
        Transport.bpm.value = 140;
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
        if (this.part) this.part.dispose();

        try {
            const tune = parseTune(input).map(note => new Note_Value(note));
            this.part = new Part(
                (time, val) => {
                    this.synth.triggerAttackRelease(val.pitch, val.duration, time, val.velocity);
                },
                tune.map((n) => n.value)
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
