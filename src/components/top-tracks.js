import React from 'react';

class TopTracks extends React.Component {
	constructor(props) {
		super(props);

		this.state = { defaultTrack: null };

		this.renderTracks = this.renderTracks.bind(this);
	}

	renderTracks(track) {
		return (
			<li className="top-tracks__list-item">
				<p className="top-tracks__title">{track.name}</p>
				<button className="btn btn--load-more" onClick={this.props.loadSong.bind(this, track.uri)}>Load Song</button>
			</li>
		);
	}

	render() {
		const { topTracks } = this.props;

		if (!topTracks.hasOwnProperty('data')) return null

		return (
			<div className="top-tracks">
				<div className="top-tracks__inner">
					<h2 className="top-tracks__header">
						Top Tracks
					</h2>
					<ol className="top-tracks__list">
						{topTracks.data.tracks.map(this.renderTracks)}
					</ol>
				</div>
			</div>
		);
	}
}

export default TopTracks;