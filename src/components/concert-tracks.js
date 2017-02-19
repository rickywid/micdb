import React from 'react';

export default class ConcertTracks extends React.Component {
	constructor(props) {
		super(props);

		this.state = { expandListOpen: false };

		this.expandList = this.expandList.bind(this);
		this.renderTracks = this.renderTracks.bind(this);
	}

	expandList() {
		this.setState({ expandListOpen: !this.state.expandListOpen });
	}

	renderTracks(track) {
		/*
			Spotify API does not always return the correct list of featured artists
			when making a request for Top Tracks(possible other endpoints as well) for an artist.
		*/

		const artist = track.data.tracks[0].artists[0].name;
		//const open = this.state.expandListOpen ? 'open' : '';

		const x = track.data.tracks.map((artistTrack) => {
			return (
				<li className="concert-track__item-inner">
					<p className="concert-track__track">{artistTrack.name}</p>
					<button className="concert-track__btn btn btn--concert" onClick={this.props.loadSong.bind(this, artistTrack.uri)}>listen</button>
				</li>
			);
		});

		return (
			<ul className="concert-track__list">
				<li className="concert-track__item">
					<p className="concert-track__artist" onClick={this.props.handleClickSubmit.bind(this, artist)}>{track.data.tracks[0].artists[0].name}</p>
					<ul className={`concert-track__list-tracks concert-track__list-tracks--${open}`} >
						{x}
					</ul>
				</li>
			</ul>
		);
	}

	render() {
		const { concertTrack, loadSong, loadTrack, events, location } = this.props;

		if (!concertTrack) return null;

		const userLocation = location ? location.city : '';

		return (
			<div className="concert-track">
				<h1 className="concert-track__header">upcoming concerts around <span className="concert-track__user-location">{userLocation}</span></h1>
				<div className="col-lg-6">
					{concertTrack.map(this.renderTracks)}
				</div>
				<div className="col-lg-6 concert-track__features">
					<div className="concert-track__features-item">
							<h2 className="concert-track__features-header-title"><i className="fa fa-music fa-lg concert-track__features-header-title--browse" aria-hidden="true" />Browse</h2>
							<p className="concert-track__features-header-description">Listen to your favourite song or album</p>
					</div>
					<div className="concert-track__features-item">
							<h2 className="concert-track__features-header-title"><i className="fa fa-search fa-lg concert-track__features-header-title--search" aria-hidden="true" />Search</h2>
							<p className="concert-track__features-header-description">search for your favourite artist</p>
					</div>
					<div className="concert-track__features-item">
							<h2 className="concert-track__features-header-title"><i className="fa fa-calendar fa-lg concert-track__features-header-title--concerts" aria-hidden="true" />Concerts</h2>
							<p className="concert-track__features-header-description">Get upcoming concert date information</p>
					</div>
					<div className="concert-track__features-item">
							<h2 className="concert-track__features-header-title"><i className="fa fa-ticket fa-lg concert-track__features-header-title--tickets" aria-hidden="true" />Tickets</h2>
							<p className="concert-track__features-header-description">Purchase tickets for upcoming events for your favourite artist</p>
					</div>
				</div>
			</div>
		);
	}
}
