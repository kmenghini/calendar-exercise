import React, {PureComponent, PropTypes} from 'react';
import {EVENT_PROP_TYPE} from './constants';

import './TimeSlotEvent.css';

export default class TimeSlotEvent extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onSelect: PropTypes.func.isRequired,
    }

    render() {
        let {
            event: {title, color, start},
            onSelect,
        } = this.props;
       
        let pastEvent = start < Date.now();

        return (
            <button className={`time-slot-event time-slot-event--${color} past-event-${pastEvent}`} onClick={onSelect}>
                {title}
            </button>
        );
    }
}
