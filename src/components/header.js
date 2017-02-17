import React, { PropTypes } from 'react';

class Header extends React.Component {

	render() {
		const { name, img, genre } = this.props;
		const artistImg = img ? <img src={img} height="150" className="header__img" alt="" /> : '';

		return (
			<header className="header">
				<div className="header__inner">
					{ artistImg }
					<h1 className="header__name">{name}</h1>
				</div>
			</header>
		);
	}
}
 
Header.PropTypes = {
	name: PropTypes.string,
	img: PropTypes.string,
	genre: PropTypes.array,
};

export default Header;
