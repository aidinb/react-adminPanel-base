import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';
import { data } from './doughnutConfig';

export default class DoughnutChart extends Component {
  render() {
    return (
        <Doughnut data={data} />
    );
  }
}