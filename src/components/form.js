import React from 'react';

const Form = () => {
	return (
		<form action="" onSubmit={this.handleSubmit}>
			<input type="text" className="form__input" value={this.state.artist} onChange={this.handleChange}/>
			<input type="submit" value="search" className="btn btn-success" />
		</form>
	);
};

export default Form;

