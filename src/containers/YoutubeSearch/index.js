import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Col} from 'antd';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import {InputSearch} from '../../components/uielements/input';
import IntlMessages from '../../components/utility/intlMessages';
import notification from '../../components/notification';
import YoutubeResult from '../../components/youtubeSearch/result';
import basicStyle from '../../config/basicStyle';

@inject('youtubeSearch', 'routing')
@observer
export default class YoutubeSearch extends Component {
    constructor(props) {
        super(props);
    }

    onSearch = value => {
        const youtubeSearch = this.props.youtubeSearch;
        if (value && value.length > 0) {
            youtubeSearch.youtubeSearch(value);
        } else {
            notification('error', 'Please type something');
        }
    };

    componentDidMount() {
        const youtubeSearch = this.props.youtubeSearch;
        this.onSearch(youtubeSearch.searchText);
    }

    render() {
        const {rowStyle, colStyle, gutter} = basicStyle;
        const youtubeSearch = this.props.youtubeSearch;

        return (
            <LayoutWrapper>
                <PageHeader>
                    <IntlMessages id="sidebar.youtubeSearch"/>
                </PageHeader>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={24} sm={24} xs={24} style={colStyle}>
                        <Box>
                            <InputSearch
                                placeholder="Search on Youtube"
                                defaultValue={youtubeSearch.searchText}
                                onSearch={this.onSearch}
                            />
                            <YoutubeResult
                                YoutubeSearch={youtubeSearch}
                                onPageChange={youtubeSearch.onPageChange}
                            />
                        </Box>
                    </Col>
                </Row>
            </LayoutWrapper>
        );
    }
}
