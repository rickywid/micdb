import React from 'react';
import moment from 'moment';

export default class UpComingEvents extends React.Component {

	renderEvents(event) {
		return (
			<li className="upcoming-events__item">
				<div className="upcoming-events__item-cal">{moment(event.datetime_local).format('MMM D')}</div>
				<div className="upcoming-events__detail">
					<p className="upcoming-events__item-name">{event.venue.name}</p>
					<a href={event.url} className="upcoming-events__item-purchase btn">Tickets</a>
					<p className="upcoming-events__item-address">{event.venue.extended_address}</p>
				</div>
			</li>
		);
	}

	render() {
		const { events } = this.props;

		if (!events.length) return null;

		return (
			<div className="upcoming-events">
				<div className="upcoming-events__inner">
					<h2 className="upcoming-events__header">Upcoming Events</h2>
					<ul className="upcoming-events__list">
						{events.map(this.renderEvents)}																				
					</ul>
				</div>
			</div>
		);
	}
};
