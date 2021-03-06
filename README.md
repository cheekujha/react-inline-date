# react-inline-date

> React Date Input Component.

## Demo

[https://cheekujha.github.io/react-inline-date/](https://cheekujha.github.io/react-inline-date/)

## Install
You need to have react and react-dom as dependencies in your project.

1. With [npm](https://npmjs.org/) installed, run

```
$ npm install react-inline-date --save
```

2. At this point you can import react-inline-date in your application as follows:

```js
import DateInput from 'react-inline-date';

```

## Usage

1. Wrap header columns (th / td) with TableFilter as shown below.
```
import React from 'react';
import DateInput,{TYPE_DATE} from 'react-inline-date';

class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: undefined
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(timestamp) {
    this.setState({
      startDate: timestamp
    });
  }

  render() {
    return <DateInput
        type={TYPE_DATE}
        value={this.state.startDate}
        onCommit={this.handleChange}
    />;
  }
}
```
## API

### Properties

#### DateInput

Name | Type | Default | Required | Description 
:--- | :--- | :------ | :------- | :----------
type | String | 'date' | true | Can be one of ['date', 'datetime', 'time']
value | Timestamp | undefined | false | Initial Value
onCommit | function(timestamp, event) | | true | Function called when a date is selected
maxOffset | Timestamp | | false | Date Upper limit
minOffset | Timestamp | | false | Date Lower Limit

## License

MIT

