import React, {PureComponent} from 'react';
import Calendar from './Calendar';
import EventDetailOverlay from './EventDetailOverlay';
import {filterEventsByDay, getEventFromEvents, getDisplayDate} from '../utils';
import DATA_SET from '../utils/data';
import {MILLISECONDS_DAY} from '../utils/constants';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './Page.css';

const DayNavigator = ({dateDisplay, onPrev, onNext}) => {
    return (
        <nav className="page__nav">
            <button
                className="page__nav-button page__prev-day"
                title="Go to previous day"
                onClick={onPrev}
            />
            <h2 className="page__date">{dateDisplay}</h2>
            <button
                className="page__nav-button page__next-day"
                title="Go to next day"
                onClick={onNext}
            />
        </nav>
    );
};

export default class Page extends PureComponent {
    state = {
        // unfiltered list of events
        events: DATA_SET,

        // The currently selected day represented by numerical timestamp
        day: Date.now(),

        // The currently selected event in the agenda
        // (mainly to trigger event detail overlay)
        selectedEventId: undefined
    }

    _handleSelectEvent(selectedEventId) {
        this.setState({selectedEventId});
        $(document.body).addClass('overlay-open');
    }

    _handleEventDetailOverlayClose() {
        this.setState({selectedEventId: undefined});
        $(document.body).removeClass('overlay-open');
    }

    _handlePrev() {
        this.setState({day: this.state.day - MILLISECONDS_DAY});
    }

    _handleNext() {
        this.setState({day: this.state.day + MILLISECONDS_DAY});
    }

    render() {
        let {events, day, selectedEventId} = this.state;
        let filteredEvents = filterEventsByDay(events, day);
        let selectedEvent = getEventFromEvents(events, selectedEventId);
        let eventDetailOverlay;

        if (selectedEvent) {
            eventDetailOverlay = (
                <EventDetailOverlay
                    event={selectedEvent}
                    onClose={this._handleEventDetailOverlayClose.bind(this)}
                />
            );
        }

        return (
            <div className="page">
                <header className="page__header">
                    <h1 className="page__title">Daily Agenda</h1>
                </header>
                <DayNavigator
                    dateDisplay={getDisplayDate(day)}
                    onPrev={this._handlePrev.bind(this)}
                    onNext={this._handleNext.bind(this)}
                />
                <Calendar
                    events={filteredEvents}
                    onSelectEvent={this._handleSelectEvent.bind(this)}
                />
                <ReactCSSTransitionGroup
                    transitionName="overlay-animation"
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={300}
                >
                    {eventDetailOverlay}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
