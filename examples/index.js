import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DateInput, { TYPE_DATE, 
					TYPE_TIME, 
					TYPE_DATE_TIME } from '../src/index.js';
import styles from './example.scss';

class SimpleExample extends Component {
	constructor(props){
		super(props);
		this.state = {
			date: undefined,
			datetime: undefined,
			time: undefined
		};

		this._dateChanged = this._dateChanged.bind(this);
		this._datetimeChanged = this._datetimeChanged.bind(this);
		this._timeChanged = this._timeChanged.bind(this);
	}

	_dateChanged(timestamp, event){
		this.setState({
			date: timestamp
		});
	}

	_datetimeChanged(timestamp, event){
		this.setState({
			datetime: timestamp
		});
	}

	_timeChanged(timestamp, event){
		this.setState({
			time: timestamp
		});
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
					<span>Date : </span>
					<DateInput onCommit={ this._dateChanged } type={TYPE_DATE} value={ this.state.date }/>
				</div>
				<div className="date-input-parent">
					<span>Date-Time : </span>
					<DateInput onCommit={ this._datetimeChanged } type={TYPE_DATE_TIME} value={ this.state.datetime }/>
				</div>
				<div className="date-input-parent">
					<span>Time : </span>
					<DateInput onCommit={ this._timeChanged } type={TYPE_TIME} value={ this.state.time }/>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<SimpleExample/>,
	document.getElementById('mainContainer')
);