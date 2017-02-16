import React from 'react';
import WidgetPlayer from './widget-player';

export default class ConcertTracks extends React.Component {
	constructor(props) {
		super(props);

		this.renderTracks = this.renderTracks.bind(this);
	}

	renderTracks(track) {
		console.log(track);
		// return (
		// 	<li>
		// 		<p>{track.artists[0].name}</p>
		// 		<p>{track.name}</p>
		// 		<button className="btn" onClick={this.props.loadSong.bind(this, track.uri)}>load track</button>
		// 	</li>
		//)
	}

	render() {
		const { concertTracks, loadSong, loadTrack } = this.props;

		if (!concertTracks) return null;

		return (
			<div>
				<ul>
					{concertTracks.map(this.renderTracks)}
				</ul>
				<WidgetPlayer loadTrack={loadTrack} />
			</div>
		)
	}
}