import React, {PureComponent, PropTypes} from 'react';
import {EVENT_PROP_TYPE} from './constants';
import {getDisplayDate, getDisplayHour} from '../utils';

import './EventDetailOverlay.css';

export default class EventDetailOverlay extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onClose: PropTypes.func.isRequired
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        document.addEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeydown.bind(this));
        document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleKeydown(event) {
        if (event.keyCode === 27) {
            this.props.onClose();
        }
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.onClose();
        }
    }

    render() {
        let {event, onClose} = this.props;
        let {title, description, start, color, hours} = event;
        let displayDate = getDisplayDate(start);
        let startHour = (new Date(start)).getHours();

        // TODO: Fix. If hours was other than 1 the UI would break
        let endHour = startHour + hours;

        let startHourDisplay = getDisplayHour(startHour);
        let endHourDisplay = getDisplayHour(endHour);

        let displayDateTime = `${displayDate} ${startHourDisplay} - ${endHourDisplay}`;

        // TODO: Add appropriate ARIA tags to overlay/dialog

        return (
            <section className="event-detail-overlay" ref={this.setWrapperRef.bind(this)}>
                <div className="event-detail-overlay__container">
                    <button
                        className="event-detail-overlay__close"
                        title="Close detail view"
                        onClick={onClose}
                    />
                    <div>
                        {displayDateTime}
                        <span
                            className={`event-detail-overlay__color event-detail-overlay--${color}`}
                        />
                    </div>
                    <h1 className="event-detail-overlay__title">
                        {title}
                    </h1>
                    <p>{description}</p>
                </div>
            </section>
        );
    }
}
