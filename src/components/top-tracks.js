import React from 'react';

class TopTracks extends React.Component {
	constructor(props) {
		super(props);

		this.state = { defaultTrack: null };

		this.renderTracks = this.renderTracks.bind(this);
	}

	renderTracks(track, i) {

		console.log(track);
		let arr = [];

		for (let i = 1; i < track.artists.length; i++) {
			arr.push(track.artists[i].name);
		}

		const featArtists = arr.join(', ');

		return (	
            <tr className="top-tracks__tr-tbody">
                <td className="top-tracks__td">{i+1}</td>
                <td className="top-tracks__td">{track.name}</td>
                <td className="top-tracks__td">{track.artists.length > 1 ? featArtists : '' }</td>
                <td className="top-tracks__td"><img src={track.album.images[2].url} alt="album" /></td>
                <td className="top-tracks__td"><button className="btn btn--load-more" onClick={this.props.loadSong.bind(this, track.uri)}>Load Song</button></td>
            </tr>
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
                    <table className="top-tracks__table">
                        <thead>
                            <tr>
                                <td className="top-tracks__td-head">#</td>
                                <td className="top-tracks__td-head">Song</td>
                                <td className="top-tracks__td-head">Featured Artists</td>
                                <td className="top-tracks__td-head">Album</td>
                                <td className="top-tracks__td-head">&nbsp;</td>
                            </tr>
                        </thead>
                        <tbody>
	                      	{topTracks.data.tracks.map(this.renderTracks)}
                        </tbody>
                    </table>
				</div>
			</div>
		);
	}
}

export default TopTracks;