import React from 'react';

export default class WidgetPlayer extends React.Component {
	render() {
		if (!this.props.defaultTrack) return null;

		return (
			<div>
				<iframe src={`https://embed.spotify.com/?uri=${this.props.loadTrack ? this.props.loadTrack : this.props.defaultTrack}`} width="300" height="380" frameBorder="0" allowTransparency="true" />
			</div>
		);
	}
}
