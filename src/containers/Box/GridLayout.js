import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import {ReactElementResize} from 'react-element-resize';
import {Icon} from 'antd';
import {layoutConfig, gutter} from './config.js';
import {generateLayoutfunc, indexOfBoxfunc} from './helperfunc.js';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './box.css';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

@inject('box', 'routing')
@observer
export default class GridLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breakpoint: 'lg',
        };
    }

    componentWillMount() {
        const boxStore = this.props.box;
        this.setState({allBox: boxStore.allBox});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reload) {
            this.setState({allBox: nextProps.allBox});
        }
    }

    onLayoutChange = (layouts) => {
        const boxStore = this.props.box;
        const {allBox} = this.state;
        layouts.forEach(layout => {
            const boxIndex = indexOfBoxfunc(allBox, layout.i);
            if (boxIndex !== -1) {
                const {x, y, h, w, i} = layout;
                allBox[boxIndex].size[this.state.breakpoint] = {x, y, h, w, i};
            }
        });
        this.setState({allBox});
        boxStore.saveBox(allBox);
    }

    breakPointChange = (newBreakpoint) => {
        // this.breakpoint = newBreakpoint;
        this.setState({breakpoint: newBreakpoint});
        // Device type can be accesssed from this.breakpoint variable
    }

    autoHeight = (uid, {height}) => {
        const {allBox, breakpoint} = this.state;
        const self = this;
        if (height === 0) {
            return;
        }
        allBox.map(singleBox => {
            const indexOfBox = indexOfBoxfunc(allBox, uid);
            if (
                allBox[indexOfBox].size[breakpoint].h !==
                Math.ceil(height / layoutConfig.rowHeight)
            ) {
                allBox[indexOfBox].size[breakpoint].h = Math.ceil(
                    height / layoutConfig.rowHeight,
                );
            }
            return null;
        });
        setTimeout(
            () => {
                self.setState({allBox});
            },
            1,
        );
    }

    render() {
        const {allBox} = this.state;
        const boxStore = this.props.box;
        const Layouts = generateLayoutfunc(allBox);
        const renderBox = singleBox => {
            return (
                <div className="isomorphicSingleCardHolder" key={singleBox.i}>
                    <ReactElementResize
                        debounceTimeout={200}
                        onResize={data => {
                            this.autoHeight(singleBox.i, data);
                        }}
                    >
                        {data => (
                            <div
                                className="isomorphicSingleCard"
                                style={{
                                    paddingRight: `${Math.ceil(gutter.gutterWidth)}px`,
                                    paddingBottom: `${Math.ceil(gutter.gutterHeight)}px`,
                                }}
                            >
                                <div className="isoCardBox">
                                    <div className="isoCardBoxHeader">
                                        <h3>{singleBox.title}</h3>

                                        <div className="isoCardControl">
                                            <button
                                                className="isoDeleteBtn"
                                                onClick={() => boxStore.deleteBox(singleBox.i)}
                                            >
                                                <Icon type="delete"/>
                                            </button>
                                            <button className="isoDragBox" type="button">
                                                <Icon type="swap"/>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="isoCardBoxBody">
                                        <p>{singleBox.content}</p>
                                        {singleBox.reactComponent
                                            ? <singleBox.reactComponent />
                                            : null}
                                    </div>
                                </div>
                            </div>
                        )}
                    </ReactElementResize>
                </div>
            );
        };
        const boxSettings = {
            ...layoutConfig,
            layouts: Layouts,
            onDragStop: this.onLayoutChange,
            onResizeStop: this.onLayoutChange,
            onBreakpointChange: this.breakPointChange,
        };
        return (
            <div className="isoCardBoxContentWrapper">
                <ResponsiveReactGridLayout {...boxSettings}>
                    {Layouts.md.map(renderBox)}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}