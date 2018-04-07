import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DateInput, { TYPE_DATE } from '../src/index.js';
import styles from './example.scss';

class SimpleExample extends Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	_dateChanged(timestamp, event){
		alert(new Date(timestamp).toString());
	}

	render(){
		return (
			<div>
				<div className="nav-bar">
					<div className="container">
						React Date Inline
					</div>
				</div>
				<div className="date-input-parent">
					<DateInput onCommit={ this._dateChanged } type={TYPE_DATE}/>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<SimpleExample/>,
	document.getElementById('mainContainer')
);