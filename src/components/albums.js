import React, { PropTypes } from 'react';

class Albums extends React.Component {

	constructor(props) {
		super(props);
	}

	renderAlbums(album) {
		return 	(
			<li className="albums__list">
				<img src={`${album.images[1].url}`} className="albums__img" onClick={this.props.loadSong.bind(this, album.uri)}alt="" />
			</li>
		);
	}

	render() {
		const { albums, loadSong } = this.props;
		let arr = [];

		albums.map((album) => {
			for(var i = 0; i < album.available_markets.length; i++) {
				if(album.available_markets[i] === 'US') {
					arr.push(album);
				}
			}
		});

		if (!albums.length) return null;

		return (
			<div className="albums">
				<div className="albums__inner">
					<h2 className="albums__header">
						Albums
					</h2>
					<ul className="albums__lists">
						{arr.map(this.renderAlbums.bind(this))}
					</ul>
				</div>
			</div>
		);
	}
}

Albums.PropTypes = {
	albums: PropTypes.array.isRequired
};

export default Albums;

