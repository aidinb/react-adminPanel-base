import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import notification from '../../components/notification';
import ModalEvents from './modalEvents';
import {CalendarStyleWrapper} from './calendar.style';
import DnDCalendar from './DnDCalendar';

const getIndex = (events, selectedEvent) =>
    events.findIndex(event => event.id === selectedEvent.id);

@inject('calendar', 'routing')
@observer
export default class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: this.props.calendar.view,
            modalVisible: false,
            selectedData: undefined
        };
    }


    onSelectEvent = selectedData => {
        this.setState({modalVisible: 'update', selectedData});
    };
    onSelectSlot = selectedData => {
        this.setState({modalVisible: 'new', selectedData});
    };
    onView = view => {
        const calendarStore = this.props.calendar;

        calendarStore.changeView(view);
    };
    onEventDrop = newOption => {
        const {event, start, end} = newOption;
        const calendarStore = this.props.calendar;
        const allDay = new Date(end).getTime() !== new Date(start).getTime();
        const updatedEvent = {...event, start, end, allDay};
        const index = getIndex(calendarStore.events, updatedEvent);
        calendarStore.events[index] = updatedEvent;
        calendarStore.changeEvents(calendarStore.events);
        notification(
            'success',
            'Move event successfully',
            `${event.title} was dropped onto ${event.start}`
        );
    };
    setModalData = (type, selectedData) => {
        const calendarStore = this.props.calendar;
        const {modalVisible} = this.state;
        if (type === 'cancel') {
            this.setState({
                modalVisible: false,
                selectedData: undefined
            });
        } else if (type === 'delete') {
            const index = getIndex(calendarStore.events, selectedData);
            if (index > -1) {
                calendarStore.events.splice(index, 1);
            }
            calendarStore.changeEvents(calendarStore.events);
            this.setState({
                modalVisible: false,
                selectedData: undefined
            });
        } else if (type === 'updateValue') {
            this.setState({selectedData});
        } else {
            if (modalVisible === 'new') {
                calendarStore.events.push(selectedData);
            } else {
                const index = getIndex(calendarStore.events, selectedData);
                if (index > -1) {
                    calendarStore.events[index] = selectedData;
                }
            }
            calendarStore.changeEvents(calendarStore.events);
            this.setState({
                modalVisible: false,
                selectedData: undefined
            });
        }
    };

    render() {
        const calendarStore = this.props.calendar;
        const {modalVisible, selectedData} = this.state;
        const calendarOptions = {
            events:calendarStore.events,
            view:calendarStore.view,
            selectedData,
            onSelectEvent: this.onSelectEvent,
            onSelectSlot: this.onSelectSlot,
            onView: this.onView,
            onEventDrop: this.onEventDrop
        };
        return (
            <CalendarStyleWrapper className="isomorphicCalendarWrapper">
                <ModalEvents
                    modalVisible={modalVisible}
                    selectedData={selectedData}
                    setModalData={this.setModalData}
                />
                <DnDCalendar {...calendarOptions} />
            </CalendarStyleWrapper>
        );
    }
}