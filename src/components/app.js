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
import ConcertTracks from './concert-tracks';

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
			artistEvents: [],
			loadTrack: '',
			defaultTrack: '',
			genre: [],
			pageCount: 0,
			perPage: 5,
			offset: 0,
			displayDefaultView: true,
			concertTrack: [],
			noResults: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.loadSong = this.loadSong.bind(this);
		this.updateUpcomingEvents = this.updateUpcomingEvents.bind(this);
	}

	componentDidMount() {
		let concerts = [];
		let artistId = [];
		let id = [];
		let id2 = [];

		// get concert event near user
		axios.get(`https://api.seatgeek.com/2/events?q=concert&client_id=Njg1MjcxMXwxNDg3MTU4MjQ4LjA&geoip=true`).then((data) => {
			data.data.events.map( event => {
				if (event.type === 'concert') {
					event.performers.map((performer) => {
						concerts.push(performer.slug);
					});
				}
			});

			let arr = concerts.join(' ').replace(/-/g, '%20');
			arr = arr.split(' ');

			// get artist id
			arr.map(artist => {
				let x;

				axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`).then((data) => {
					if(data.data.artists.items[0]) {
						x = data.data.artists.items[0].id;
					}

					return axios.get(`https://api.spotify.com/v1/artists/${x}/top-tracks?country=US`);	
				}).then(data => {
					id2.push(data);
					this.setState({ concertTrack: id2 });
				});
			});
		});
	}

	updateUpcomingEvents(artist) {
		console.log('artist');
		// axios.get(`https://api.seatgeek.com/2/events?performers.slug=${artist}&client_id=Njg1MjcxMXwxNDg3MTU4MjQ4LjA`).then(data => {
		// 		console.log(data);
		// 	//this.setState({ artistEvents: data });
		// })
	}

	loadSong(uri) {
		this.setState({ loadTrack: uri });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({ displayDefaultView: false });

		axios.get(`https://api.spotify.com/v1/search?q=${this.state.artist}&type=artist`).then((data) => {
			if (data.data.artists.items.length) {
				this.setState({ artistID: data.data.artists.items[0].id });	
				this.setState({ noResults: false });
			} else {
				this.setState({})
				this.setState({ noResults: true})
			}
			
			this.setState({ artistName: data.data.artists.items[0].name });
			this.setState({ artistImg: data.data.artists.items[0].images[0].url });
			this.setState({ genre: data.data.artists.items[0].genres });

			return axios.get(`https://api.spotify.com/v1/artists/${this.state.artistID}/albums`,
				{ params: { offset: 0 } }
			);
		}).then((albums) => {
			this.setState({ pageCount: albums.data.items.length / this.state.perPage });
			this.setState({ artistAlbums: albums.data.items });

			return axios.get(`https://api.spotify.com/v1/artists/${this.state.artistID}/top-tracks?country=US`);
		}).then((tracks) => {
			this.setState({ artistTopTracks: tracks });
			this.setState({ defaultTrack: tracks.data.tracks[0].uri });

			const str = this.state.artist.replace(/ /g, '-');
		
			return axios.get(`https://api.seatgeek.com/2/events?performers.slug=${str}&client_id=Njg1MjcxMXwxNDg3MTU4MjQ4LjA`);
		})
		.then((performer) => {
			this.setState({ artistEvents: performer.data.events });
			this.setState({ artist: '' });
		});
	}

	loadCommentsFromServer() {
		axios.get(
			`https://api.spotify.com/v1/artists/${this.state.artistID}/albums`,
			{ params: { offset: this.state.offset } }
		).then((album) => {
			this.setState({ artistAlbums: album.data.items });
		});
	}

	handlePageClick(data) {
		const selected = data.selected;
		const offset = Math.ceil(selected * this.state.perPage);

		this.setState({ offset }, () => {
			this.loadCommentsFromServer();
		});
	}

	handleChange(e) {
		this.setState({ artist: e.target.value });
	}

	render() {
		const showConcert = this.state.displayDefaultView ?  						
						<ConcertTracks 
							concertTrack={this.state.concertTrack} 
							loadSong={this.loadSong} 
							loadTrack={this.state.loadTrack} 
							events={this.updateUpcomingEvents}
						/> : null;

		const displayNoResults = this.state.noResults ? <p className="form__no-results">No artist found</p> : '';
		
		return (
			<div>
				<div className="row">
					<div className="col-lg-12 form">
						<a className="logo" href="/">
							<i className="fa fa-microphone fa-lg form__logo" aria-hidden="true"></i>
							<h1 className="form__title"> Mic'dDB</h1>
						</a>
						<form action="" className="form__form" onSubmit={this.handleSubmit}>
							<input type="text" className="form__input" value={this.state.artist} placeholder="search artist..." onChange={this.handleChange}/>
							<input type="submit" value="search" className="btn btn--search form__button" />
							{displayNoResults}
						</form>
					</div>
				</div>	
				<div className="row">
					<div className={`col-lg-10 col-lg-offset-1`}>
						{showConcert}
						
					</div>
				</div>
				<div className="row">
					<Header name={this.state.artistName} img={this.state.artistImg} genre={this.state.genre} />
				</div>
				<div className="row">
					<div className="main">
						<div className="row">
							<div className="main__playlist">
								<TopTracks topTracks={this.state.artistTopTracks} loadSong={this.loadSong} />
							</div>
							<div className="main__playlist-widget">
								<WidgetPlayer loadTrack={this.state.loadTrack} defaultTrack={this.state.defaultTrack} />
							</div>
							<Albums albums={this.state.artistAlbums} loadSong={this.loadSong} />
							<div className="col-lg-8">
						        <ReactPaginate previousLabel={'previous'}
									nextLabel={'next'}
									previousLinkClassName={'pagination__prev'}
									nextLinkClassName={'pagination__next'}
									pageLinkClassName={'pagination__page-link'}
									activeClassName={'pagination__active-page'}
									breakLabel={<a href=''>...</a>}
									breakClassName={'break-me'}
									pageCount={this.state.pageCount}
									marginPagesDisplayed={2}
									pageRangeDisplayed={5}
									onPageChange={this.handlePageClick.bind(this)}
									containerClassName={'pagination'}
									subContainerClassName={'pages pagination'}
								/>
							</div>
							<UpcomingEvents events={this.state.artistEvents} />
						</div>
					</div>
				</div>

			</div>
		);
	}
}
