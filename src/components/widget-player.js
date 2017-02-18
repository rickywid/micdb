import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';

export default class WidgetPlayer extends React.Component {
	render() {
		if (!this.props.defaultTrack) return null;

		return (
			<Sticky style={{paddingTop: '20px'}}>
				<iframe src={`https://embed.spotify.com/?uri=${this.props.loadTrack ? this.props.loadTrack : this.props.defaultTrack}`} width="300" height="380" frameBorder="0" allowTransparency="true" />
			</Sticky>
		);
	}
}
