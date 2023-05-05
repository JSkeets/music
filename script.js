let notes = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
let modes = {
    "Ionian": [2, 2, 1, 2, 2, 2, 1],
    "Dorian": [2, 1, 2, 2, 2, 1, 2],
    "Phrygian": [1, 2, 2, 2, 1, 2, 2],
    "Lydian": [2, 2, 2, 1, 2, 2, 1],
    "Mixolydian": [2, 2, 1, 2, 2, 1, 2],
    "Aeolian": [2, 1, 2, 2, 1, 2, 2],
    "Locrian": [1, 2, 2, 1, 2, 2, 2]
};

let exercises = [];

for(let note of notes) {
    for(let mode in modes) {
        exercises.push({
            "title": `${note} ${mode} mode`,
            "description": `Practice the ${note} ${mode} mode.`,
            "notes": getModeNotes(note, mode)
        });
    }
}

function getModeNotes(rootNote, mode) {
    let noteIndex = notes.indexOf(rootNote);
    let modeIntervals = modes[mode];
    let modeNotes = [rootNote];
    
    for(let interval of modeIntervals) {
        noteIndex = (noteIndex + interval) % notes.length;
        modeNotes.push(notes[noteIndex]);
    }

    return modeNotes;
}

let exerciseIndex = -1;
let startButton = document.getElementById('start-button');

function startExercise() {
    let newIndex = Math.floor(Math.random() * exercises.length);
    while (newIndex === exerciseIndex) {
        newIndex = Math.floor(Math.random() * exercises.length);
    }
    exerciseIndex = newIndex;
    let exercise = exercises[exerciseIndex];
    document.getElementById('exercise').textContent = `${exercise.title}\n\nNotes: ${exercise.notes.join(", ")}`;
}

startButton.addEventListener('click', startExercise);

window.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        startExercise();
    }
});

window.addEventListener('load', startExercise);
