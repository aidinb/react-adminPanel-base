import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import ReactEcharts from 'echarts-for-react';

@inject('dynamicEchart', 'routing')
@observer
export default class DynamicChartComponent extends Component {
    constructor(props) {
        super(props);
        this.count = 0;
    }

    fetchNewDate = () => {
        const dynamicEchart = this.props.dynamicEchart;
        dynamicEchart.updateOption();
    }

    componentDidMount() {
        if (this.timeTicket) {
            clearInterval(this.timeTicket);
        }
        this.timeTicket = setInterval(this.fetchNewDate, 2500);
    }

    componentWillUnmount() {
        if (this.timeTicket) {
            clearInterval(this.timeTicket);
        }
    }

    render() {
        const dynamicEchart = this.props.dynamicEchart;
        return (
            <div className="examples">
                <ReactEcharts
                    ref="echarts_react"
                    option={dynamicEchart.option}
                    style={{height: 300}}
                />
            </div>
        );
    }
}