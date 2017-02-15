import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import Form from './form';
import Header from './header';
import Intro from './intro';
import Albums from './albums';
import TopTracks from './top-tracks';
import WidgetPlayer from './widget-player';
import UpcomingEvents from './upcoming-events';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			artist: '',
			artistID: '',
			artistName: null,
			artistImg: null,
			artistAlbums: [],
			artistTopTracks: [],
			loadTrack: '',
			defaultTrack: null,
			genre: [],
			pageCount: 0,
			perPage: 5,
			offset: 0
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.loadSong = this.loadSong.bind(this);
	}

	loadSong(uri) {
		this.setState({ loadTrack: uri });
	}

	handleSubmit(e) {
		e.preventDefault();
		axios.get(`https://api.spotify.com/v1/search?q=${this.state.artist}&type=artist`).then((data) => {
			this.setState({ artistID: data.data.artists.items[0].id });
			this.setState({ artistName: data.data.artists.items[0].name });
			this.setState({ artistImg: data.data.artists.items[0].images[0].url });
			this.setState({ genre: data.data.artists.items[0].genres });

			return axios.get(`https://api.spotify.com/v1/artists/${this.state.artistID}/albums`,
				{params: {offset: 0}}
			);
		}).then((albums) => {
			console.log(albums.data.items);
			this.setState({ pageCount: albums.data.items.length / this.state.perPage });
			this.setState({ artistAlbums: albums.data.items });

			return axios.get(`https://api.spotify.com/v1/artists/${this.state.artistID}/top-tracks?country=US`);
		}).then((tracks) => {
			this.setState({ artistTopTracks: tracks });
			this.setState({ defaultTrack: tracks.data.tracks[0].uri})
		});

		this.setState({ artist: ''});
	}

	loadCommentsFromServer() {
		axios.get(
			`https://api.spotify.com/v1/artists/${this.state.artistID}/albums`,
			{ params: { offset: this.state.offset}}
		).then((album) => {
			this.setState({artistAlbums: album.data.items})
		})
	}

	handlePageClick(data) {
	    let selected = data.selected;
	    let offset = Math.ceil(selected * this.state.perPage);

	    this.setState({offset: offset}, () => {
	      this.loadCommentsFromServer();
	    });
	}

	handleChange(e) {
		this.setState({ artist: e.target.value });
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-lg-12 form">
						<i className="fa fa-microphone fa-lg form__logo" aria-hidden="true"></i>
						<h1 className="form__title"> Mic'dDB</h1>
						<form action="" className="form__form" onSubmit={this.handleSubmit}>
							<input type="text" className="form__input" value={this.state.artist} onChange={this.handleChange}/>
							<input type="submit" value="search" className="btn btn--search form__button" />
						</form>
					</div>
				</div>	
				<div className="row">
					<div className="main">
						<Header name={this.state.artistName} img={this.state.artistImg} genre={this.state.genre} />
						<div className="main__playlist">
							<TopTracks topTracks={this.state.artistTopTracks} loadSong={this.loadSong} />
						</div>
						<div className="main__playlist-widget">
							<WidgetPlayer loadTrack={this.state.loadTrack} defaultTrack={this.state.defaultTrack}/>
						</div>
						<Albums albums={this.state.artistAlbums} loadSong={this.loadSong}/>
				        <ReactPaginate previousLabel={'previous'}
								nextLabel={'next'}
								breakLabel={<a href=''>...</a>}
								breakClassName={'break-me'}
								pageCount={this.state.pageCount}
								marginPagesDisplayed={2}
								pageRangeDisplayed={5}
								onPageChange={this.handlePageClick.bind(this)}
								containerClassName={'pagination'}
								subContainerClassName={'pages pagination'}
								activeClassName={'active'} />					
						<UpcomingEvents />
					</div>
				</div>
			</div>
		);
	}
}
