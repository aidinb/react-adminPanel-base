import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Layout} from 'antd';
import NoteList from './noteList';
import {ColorChoser} from '../../components/';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import NoteComponentWrapper from './noteComponent.style';

const {Header, Content} = Layout;

@inject('notes', 'routing')
@observer
export default class Notes extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    updateNote = (event) => {
        const notesStore=this.props.notes;
        notesStore.editNote(notesStore.selectedId, event.target.value);
    }

    render() {
        const notesStore=this.props.notes;

        const selectedNote =
            notesStore.selectedId !== undefined
                ? notesStore.notes.filter(note => note.id === notesStore.selectedId)[0]
                : null;
        return (
            <NoteComponentWrapper className="isomorphicNoteComponent">
                <div style={{width: '340px'}} className="isoNoteListSidebar">
                    <NoteList
                        notes={notesStore.notes}
                        selectedId={notesStore.selectedId}
                        changeNote={notesStore.changeNote}
                        deleteNote={notesStore.deleteNote}
                        colors={notesStore.colors}
                    />
                </div>
                <Layout className="isoNotepadWrapper">
                    <Header className="isoHeader">
                        {notesStore.selectedId !== undefined ? (
                            <div className="isoColorChooseWrapper">
                                <ColorChoser
                                    colors={notesStore.colors}
                                    changeColor={notesStore.changeColor}
                                    seectedColor={notesStore.seectedColor}
                                />{' '}
                                <span>
                  <IntlMessages id="notes.ChoseColor"/>
                </span>
                            </div>
                        ) : (
                            ''
                        )}
                        <Button type="primary" className="isoAddNoteBtn" onClick={notesStore.addNote}>
                            <IntlMessages id="notes.addNote"/>
                        </Button>
                    </Header>
                    <Content className="isoNoteEditingArea">
                        {notesStore.selectedId !== undefined ? (
                            <textarea
                                className="isoNoteTextbox"
                                value={selectedNote.note}
                                onChange={this.updateNote}
                                autoFocus
                            />
                        ) : (
                            ''
                        )}
                        {/*{selectedId !== undefined ? <span>{`created at ${selectedNote.createTime}`}</span> : ''}*/}
                    </Content>
                </Layout>
            </NoteComponentWrapper>
        );
    }
}
