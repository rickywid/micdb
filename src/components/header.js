import React, { PropTypes } from 'react';

class Header extends React.Component {

	render() {
		const { name, img, genre } = this.props;

		return (
			<header className="header">
				<div className="header__inner">
					<img src={img} height="150" className="header__img" alt="" />
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
