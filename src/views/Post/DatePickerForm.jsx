import React from "react";
import moment from "moment-jalaali";
import DatePicker from "react-datepicker2";

export default class DatePickerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: moment() };
  }
  render() {
    return (
      <DatePicker
        className="form-control"
        isGregorian={false}
        onChange={(value) => this.props.onChange({ value })}
        value={this.state.value}
      />
    );
  }
}
