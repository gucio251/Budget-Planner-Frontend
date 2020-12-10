import React, {Component} from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'components/UI/RangeDatePicker/RangePicker.css'
import {DateRangePicker} from 'react-dates';
import Responsive from 'react-responsive';

class RangeDatePicker extends Component {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: 'startDate',
    orientation: 'horizontal',
  };

  render() {
    console.log(this.props)
    return (
      <>
        <Mobile>
          <DateRangePicker
            startDate={this.props.startDate}
            startDateId="your_unique_start_date_id"
            endDate={this.props.endDate}
            endDateId="your_unique_end_date_id"
            onDatesChange={({ startDate, endDate }) => {
              this.props.updateRange({ startDate, endDate });
            }}
            focusedInput={this.state.focusedInput}
            onFocusChange={(focusedInput) => {
              if (focusedInput == null) {
                return;
              }
              this.setState({ focusedInput });
            }}
            orientation={this.orientation}
            numberOfMonths={1}
            autoFocus
            isOutsideRange={() => false}
          />
        </Mobile>

        <Default>
          <DateRangePicker
            startDate={this.props.startDate}
            startDateId="your_unique_start_date_id"
            endDate={this.props.endDate}
            endDateId="your_unique_end_date_id"
            onDatesChange={({ startDate, endDate }) => {
              this.props.updateRange({ startDate, endDate });
            }}
            focusedInput={this.state.focusedInput}
            onFocusChange={(focusedInput) => {
              if (focusedInput == null) {
                return;
              }
              this.setState({ focusedInput });
            }}
            numberOfMonths={2}
            orientation={this.orientation}
            autoFocus
            isOutsideRange={() => false}
          />
        </Default>
      </>
    );
  }
}

RangeDatePicker.propTypes = {
    
};

export default RangeDatePicker;

export const Mobile = (props) => <Responsive {...props} maxWidth={767}/>
export const Default = (props) => <Responsive {...props} minWidth={768}/>