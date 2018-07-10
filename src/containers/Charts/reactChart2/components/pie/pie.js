import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';
import {data} from './pieConfig';

export default class PieChart extends Component {

  render() {
    return (
        <Pie data={data} />
    );
  }
}