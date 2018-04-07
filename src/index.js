import React, {Component} from 'react';
// TODO
// Pass minimum values from props(hour, min, day, month etc..)

// key codes
const ENTER_KEY_CODE = 13;
const TAB_KEY_CODE = 9;
const UP_ARRROW_KEY_CODE = 38;
const DOWN_ARROW_KEY_CODE = 40;
const BACKSPACE_KEY_CODE = 8;

//---Constants-----//
const TYPE_TIME = "time";
const TYPE_DATE = "date";
const TYPE_DATE_TIME = "datetime";
const NEXT_CHAR = '/';

const MAX = {
	dd: 31,
	mm: 12,
	yyyy: 275759,
	hour: 23,
	min: 59
}

const MIN = {
	dd: 1,
	mm: 1,
	yyyy: 1,
	hour: 0,
	min: 0
}
//--------------//

class DateInput extends Component{
	constructor(props){
		super(props);
		this.dayInput = undefined;
		this.monthInput = undefined;
		this.yearInput = undefined;
		this.hourInput = undefined;
		this.minInput = undefined;

		let dateState,
			timeState;
		let type = this.props.type ? this.props.type.toLowerCase() : TYPE_DATE;

		if(type === TYPE_TIME){
			if(this.props.value && !isNaN(this.props.value)){
				timeState = this._processTimeValue(this.props.value);
			}

			this.state = {
				hour: timeState ? timeState.hour : '',
				min: timeState ? timeState.min : ''
			};
		}else{
			if(this.props.value && !isNaN(this.props.value)){
				dateState = this._processDateTimeValue(this.props.value);
			}

			this.state = {
				dd: dateState ? dateState.dd : '',
				mm: dateState ? dateState.mm : '',
				yyyy: dateState ? dateState.yyyy : '',
				hour: dateState ? dateState.hour : '',
				min: dateState ? dateState.min : ''
			};
		}
	}

	componentWillReceiveProps(nextProps){
		let dateState,
			timeState;

		if(this.props.value != nextProps.value && typeof nextProps.value != "undefined"){
			if(nextProps.type.toLowerCase() === TYPE_TIME){
				timeState = this._processTimeValue(nextProps.value);
				this.setSate({
					hour: timeState ? timeState.hour : '',
					min: timeState ? timeState.min : ''
				});
			}else{
				dateState = this._processDateTimeValue(nextProps.value);
				this.setState({
					dd: dateState ? dateState.dd : '',
					mm: dateState ? dateState.mm : '',
					yyyy: dateState ? dateState.yyyy : '',
					hour: dateState ? dateState.hour : '',
					min: dateState ? dateState.min : ''
				});
			}
		}
	}

	_processDateTimeValue(timestamp){
		if(typeof timestamp != "undefined"){
			try{
				const dateObj = new Date(timestamp);
				return {
					dd: dateObj.getDate(),
					mm: dateObj.getMonth() + 1,
					yyyy: dateObj.getFullYear(),
					hour: dateObj.getHours(),
					min: dateObj.getMinutes()
				}
			}catch(error){
				return;
			}
		}
	}

	_processTimeValue(timestamp){
		if(typeof timestamp != "undefined"){
			const dateObj = new Date(timestamp);
			return {
				hour: dateObj.getHours(),
				min: dateObj.getMinutes()
			}
		}
		return;
	}

	componentDidMount(){
		if(this.props.type === TYPE_TIME){
			this.hourInput && this.hourInput.focus();
		}else{
			this.dayInput && this.dayInput.focus();
		}
	}

	// If '/' is entered next input should be focused
	_checkNextChar(newValue, type){
		const lastChar = newValue[newValue.length - 1];
		if(lastChar === NEXT_CHAR){
			newValue = newValue.slice(0, newValue.length - 1);
			this._focusNext(type);
		}
	}

	_handleDayChange(newValue){
		let invalid = false;
		const type = 'dd';
		let intValue = parseInt(newValue);
		if(isNaN(intValue)){
			invalid = true;
		}

		if(newValue.length >= 2){
			newValue = newValue.substr(0, 2);
			intValue = parseInt(newValue);
			if(intValue < 1){
				newValue = ["0", MIN[type]].join('');
			}
			this._focusNext(type);
		}else{
			if(intValue > 3){
				this._focusNext(type);
			}
		}
		
		if(intValue > MAX[type]){
			invalid = true;
		}

		return invalid ? (newValue === '' ? '' : this.state.dd) : newValue;
	}

	_handleMonthChange(newValue){
		let invalid = false;
		const type = 'mm';
		let intValue = parseInt(newValue);
		if(isNaN(intValue)){
			invalid = true;
		}

		if(newValue.length >= 2){
			newValue = newValue.substr(0, 2);
			intValue = parseInt(newValue);
			if(intValue < 1){
				newValue = ["0", MIN[type]].join('');
			}
			this._focusNext(type);
		}else{
			if(intValue > 1){
				this._focusNext(type);
			}
		}

		if(intValue > MAX[type]){
			invalid = true;
		}

		return invalid ? (newValue === '' ? '' : this.state.mm) : newValue;
	}

	_handleYearChange(newValue){
		let invalid = false;
		const type = 'yyyy';
		let intValue = parseInt(newValue);
		if(isNaN(intValue)){
			invalid = true;
		}

		if(newValue.length >= 4){
			newValue = newValue.substr(0, 4);
			intValue = parseInt(newValue);
			if(intValue < 1){
				newValue = "0001";
			}
			this._focusNext(type);
		}

		if(typeof this.props.minYear != undefined){
			if(parseInt(newValue) < this.props.minYear){
				invalid = true;
			}
		}

		return invalid ? (newValue === '' ? '' : this.state.yyyy) : newValue;
	}

	_handleHourChange(newValue){
		let invalid = false;
		const type = 'hour';
		let intValue = parseInt(newValue);
		if(isNaN(intValue)){
			invalid = true;
		}

		if(newValue.length >= 2){
			newValue = newValue.substr(0, 2);
			intValue = parseInt(newValue);
			this._focusNext(type);
		}else{
			if(intValue > 2){
				this._focusNext(type);
			}
		}

		if(intValue > MAX[type] || intValue < MIN[type]){
			invalid = true;
		}

		return invalid ? (newValue === '' ? '' : this.state.hour) : newValue;
	}

	_handleMinuteChange(newValue){
		let invalid = false;
		const type = 'minute';
		let intValue = parseInt(newValue);
		if(isNaN(intValue)){
			invalid = true;
		}

		if(newValue.length >= 2){
			newValue = newValue.substr(0, 2);
			intValue = parseInt(newValue);
		}

		if(intValue > MAX[type] || intValue < MIN[type]){
			invalid = true;
		}

		return invalid ? (newValue === '' ? '' : this.state.min) : newValue;
	}

	_inputChanged(type){
		type = type.toLowerCase();
		return (event) => {
			let newValue = event.target.value;
			newValue = newValue.trim();
			let newState = {};

			if(newValue.length > 0){
				this._checkNextChar(newValue);
			}

			switch (type){
				case 'dd': {
					newState = Object.assign({}, newState, {
						dd: this._handleDayChange(newValue)
					});
					break;
				}
				case 'mm': {
					newState = Object.assign({}, newState, {
						mm: this._handleMonthChange(newValue)
					});
					break;
				}
				case 'yyyy': {
					newState = Object.assign({}, newState, {
						yyyy: this._handleYearChange(newValue)
					});
					break;
				}
				case 'hour': {
					newState = Object.assign({}, newState, {
						hour: this._handleHourChange(newValue)
					});
					break;
				}
				case 'min': {
					newState = Object.assign({}, newState, {
						min: this._handleMinuteChange(newValue)
					});
					break;
				}
				default:{
					break;
				}
			}

			this.setState(newState);
		}
	}

	_focusNext(type){
		switch (type){
			case 'dd':{
				this.monthInput.focus();
				break;
			}
			case 'mm': {
				this.yearInput.focus();
				break;
			}
			case 'yyyy': {
				this.hourInput && this.hourInput.focus();
				break;
			}
			case 'hour': {
				this.minInput.focus();
				break;
			}
			default:{
				break;
			}
		}
	}

	_focusPrev(type){
		switch (type){
			case 'mm': {
				this.dayInput.focus();
				break;
			}
			case 'yyyy': {
				this.monthInput.focus();
				break;
			}
			case 'hour': {
				this.yearInput && this.yearInput.focus();
				break;
			}
			case 'min': {
				this.hourInput.focus();
				break;
			}
			default:{
				break;
			}
		}
	}

	_handleKeyDown(type){
		type = type.toLowerCase();
		return (event) => {
			switch (event.keyCode){
				case BACKSPACE_KEY_CODE:{
					const newValue = event.target.value.trim();
					if(newValue === ''){
						this._focusPrev(type);
						event.preventDefault();
					}
					break;
				}
				case TAB_KEY_CODE: {
					this._handleTabKey(type, event);
					break;
				}
				case ENTER_KEY_CODE: {
					this._checkCommit(this.state, event);
					break;
				}
				case UP_ARRROW_KEY_CODE: {
					this._handleUpArrowKey(type, event);
					break;
				}
				case DOWN_ARROW_KEY_CODE: {
					this._handleDownArrowKey(type, event);
					break;
				}
				default:{
					break;
				}
			}
		}
	}

	_normalizeValue(value, type){
		const valueLength = value.toString().length;
		let newValue = value;
		let minDigits;
		if(type === 'yyyy'){
			minDigits = 4;
		}else{
			minDigits = 2;
		}
		const digitDiff = minDigits - valueLength;
		if( digitDiff > 0){
			newValue = [Array(digitDiff + 1).join("0"), newValue].join('');
		}

		return newValue;
	}

	_handleUpArrowKey(type){
		let newState = {};
		const currentValue = this.state[type];
		let newValue;

		if( typeof currentValue === "undefined" || currentValue === ''){
			if(type === 'yyyy'){
				newValue = ['', new Date().getFullYear()].join('');
			}else{
				newValue =  MIN[type];
			}
		}else{
			const intValue = parseInt(currentValue);
			if(intValue === MAX[type]){
				newValue = MIN[type];
			}else{
				newValue = intValue + 1;
			}
		}

		newState = Object.assign({}, newState, {
			[type]: this._normalizeValue(newValue, type)
		});

		this.setState(newState);
	}

	_handleDownArrowKey(type){
		let newState = {};
		const currentValue = this.state[type];
		let newValue;

		if( typeof currentValue === "undefined" || currentValue === ''){
			if(type === 'yyyy'){
				newValue = ['', new Date().getFullYear()].join('');
			}else{
				newValue =  MAX[type];
			}
		}else{
			const intValue = parseInt(currentValue);
			if(intValue === MIN[type]){
				newValue = MAX[type];
			}else{
				newValue = intValue - 1;
			}
		}

		newState = Object.assign({}, newState, {
			[type]: this._normalizeValue(newValue, type)
		});

		this.setState(newState);
	}

	_handleTabKey(type, event){
		
		if(event.shiftKey){
			return
		}

		switch (type){
			case 'yyyy': {
				if(this.props.type === TYPE_DATE){
					this._checkCommit(this.state, event, true);	
					event.preventDefault();
					break;
				}
			}
			case 'min': {
				this._checkCommit(this.state, event, true);	
				event.preventDefault();
				break;
			}
			default:{
				break;
			}
		}
	}

	_checkCommit(state, event=undefined, force=false){
		let newValue;

		if(this.props.type === TYPE_TIME){
			if((typeof state.hour != "undefined") && state.hour != '' &&
				(typeof state.min != "undefined") && state.min != ''){
				const newDate = new Date();
				newDate.setHours(parseInt(state.hour));
				newDate.setMinutes(parseInt(state.min));
				newDate.setSeconds(0);
				newDate.setMilliseconds(0);
				newValue = newDate.getTime();
			}
		}else if(this.props.type === TYPE_DATE_TIME){
			if((typeof state.mm != "undefined") && state.mm != '' &&
				(typeof state.dd != "undefined") && state.dd != '' &&
				(typeof state.yyyy != "undefined") && state.yyyy != '' &&
				(typeof state.hour != "undefined") && state.hour != '' &&
				(typeof state.min != "undefined") && state.min != ''){
				const newDate = new Date(state.yyyy, parseInt(state.mm) - 1, parseInt(state.dd), parseInt(state.hour), parseInt(state.min));
				newValue = newDate.getTime();
			}
		}else{
			if((typeof state.mm != "undefined") && state.mm != '' &&
				(typeof state.dd != "undefined") && state.dd != '' &&
				(typeof state.yyyy != "undefined") && state.yyyy != ''){
				const newDate = new Date(state.yyyy, parseInt(state.mm) - 1, parseInt(state.dd));
				newValue = newDate.getTime();
			}
		}
		
		if(typeof newValue != "undefined"){
			if(typeof this.props.maxOffset != "undefined" && newValue > this.props.maxOffset){
				newValue = undefined;
			}

			if(typeof this.props.minOffset != "undefined" && newValue < this.props.minOffset){
				newValue = undefined;
			}

			if(typeof newValue != "undefined" || force){
				this._commitValue(newValue, event);
			}
			
		}else{
			if(force){
				this._commitValue(newValue, event);
			}
		}
	}

	_commitValue(value, event = undefined){
		this.props.onCommit(value, event);
	}

	render(){
		let ddInputClassName = "date-input dd";
		let mmInputClassName = "date-input mm";
		let yyyyInputClassName = "date-input yyyy";
		let hourInputClassName = "date-input hour";
		let minInputClassName = "date-input min";
		let dateHTML,
			timeHTML;

		if(this.props.type === TYPE_DATE || this.props.type === TYPE_DATE_TIME){
			dateHTML = (
				<div className="date-input-box date">
					<input className={ ddInputClassName }
						ref={(node) => {this.dayInput = node}} 
						value={this.state.dd} 
						placeholder="dd"
						onChange={this._inputChanged('dd')}
						onKeyDown={ this._handleKeyDown('dd') }/>
					<span className="stroke">/</span>
					<input className={ mmInputClassName }
						ref={(node) => {this.monthInput = node}}
						value={this.state.mm} 
						placeholder="mm"
						onChange={this._inputChanged('mm')}
						onKeyDown={ this._handleKeyDown('mm') }/>
					<span className="stroke">/</span>
					<input className={ yyyyInputClassName } 
						ref={(node) => {this.yearInput = node}}
						value={this.state.yyyy} 
						placeholder="yyyy"
						onChange={this._inputChanged('yyyy')}
						onKeyDown={ this._handleKeyDown('yyyy') }/>
				</div>
			);
		}

		if(this.props.type === TYPE_DATE_TIME || this.props.type === TYPE_TIME){
			timeHTML = (
				<div className="date-input-box time">
					<input className={ hourInputClassName }
						ref={(node) => {this.hourInput = node}} 
						value={this.state.hour} 
						placeholder="hh"
						onChange={this._inputChanged('hour')}
						onKeyDown={ this._handleKeyDown('hour') }/>
					<span className="stroke">:</span>
					<input className={ minInputClassName }
						ref={(node) => {this.minInput = node}}
						value={this.state.min} 
						placeholder="mm"
						onChange={this._inputChanged('min')}
						onKeyDown={ this._handleKeyDown('min') }/>
				</div>
			);
		}

		return (
			<div className="date-input-editor">
				{ dateHTML }
				{ timeHTML }
			</div>
		);
	}
}
export {
	TYPE_TIME,
	TYPE_DATE,
	TYPE_DATE_TIME,
}
export default DateInput;