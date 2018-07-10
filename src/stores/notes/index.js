import {observable, action} from 'mobx';
import notes from "../../containers/Notes/fakeData";
const colors = ["#7ED321", "#de1b1b", "#511E78", "#ff9009", "#42a5f5"];


class Store  {
    @observable notes;
    @observable colors;
    @observable selectedId;
    @observable selectedColor;


    constructor() {
        this.notes = notes;
        this.colors = colors;
        this.selectedId = notes[0].id;
        this.selectedColor = notes[0].color;
    }

    @action.bound changeNote(id) {
        const selectedColor = this.notes[this.notes.findIndex(note => note.id === id)].color;
        this.selectedId = id;
        this.selectedColor = selectedColor;
    }

    @action.bound addNote() {
        const newNote = {
            id: new Date(),
            note: 'New Note',
            createTime: new Date(),
            color: this.selectedColor,
        };
        this.notes = [newNote, ...this.notes];
        this.selectedId = newNote.id;
    }

    @action.bound editNote(id, newNote) {
        const notes = [];
        this.notes.forEach(note => {
            if (note.id !== id) {
                notes.push(note);
            } else {
                note.note = newNote;
                notes.push(note);
            }
        });
        this.notes = notes;
    }

    @action.bound deleteNote(id) {
        const notes = [];
        this.notes.forEach(note => {
            if (note.id !== id) {
                notes.push(note);
            }
        });
        let selectedId = this.selectedId;
        if (selectedId === id) {
            if (notes.length === 0) {
                selectedId = undefined;
            } else {
                selectedId = notes[0].id;
            }
        }

        this.notes = notes;
        this.selectedId = selectedId;
    }

    @action.bound changeColor(seectedColor) {
        const selectedId = this.selectedId;
        const notes = [];
        this.notes.forEach(note => {
            if (note.id !== selectedId) {
                notes.push(note);
            } else {
                note.color = seectedColor;
                notes.push(note);
            }
        });
        this.notes = notes;
        this.selectedColor = seectedColor;
    }
}
let singleton = new Store();
export default singleton;
