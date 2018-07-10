import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Hits, Pagination, SortBy, Stats} from 'react-instantsearch/dom';
import Hit from './hit';
import {
    ContentWrapper,
    TopbarWrapper,
    PaginationStyleWrapper,
} from './algoliaComponent.style';

@inject('ecommerce', 'routing')
@observer
export default class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const ecommerce = this.props.ecommerce;

        return (
            <ContentWrapper className="isoAlgoliaContentWrapper">
                <TopbarWrapper className="isoAlgoliaTopBar">
                    <Stats />
                    <SortBy
                        defaultRefinement="default_search"
                        items={[
                            {value: 'default_search', label: 'Default'},
                            {value: 'price_asc', label: 'Lowest Price'},
                            {value: 'price_desc', label: 'Highest Price'},
                        ]}
                    />
                    <div className="isoViewChanger">
                        <button
                            type="button"
                            className={
                                ecommerce.view === 'gridView' ? 'isoGridView active' : 'isoGridView'
                            }
                            onClick={() => ecommerce.changeView('gridView')}
                        >
                            <i className="ion-grid"/>
                        </button>
                        <button
                            type="button"
                            className={
                                ecommerce.view === 'gridView' ? 'isoListView' : 'isoListView active'
                            }
                            onClick={() => ecommerce.changeView('listView')}
                        >
                            <i className="ion-navicon-round"/>
                        </button>
                    </div>
                </TopbarWrapper>
                <Hits hitComponent={Hit}/>

                <PaginationStyleWrapper className="isoAlgoliaPagination">
                    <Pagination showLast/>
                </PaginationStyleWrapper>
            </ContentWrapper>
        );
    }
}