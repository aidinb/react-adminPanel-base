import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Highlight, Snippet} from 'react-instantsearch/dom';
import Rate from '../uielements/rate';
import Button from '../uielements/button.js';
import {GridListViewWrapper} from './algoliaComponent.style';

@inject('ecommerce', 'routing')
@observer
export default class Hit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCartLoading: false,
        };
    }

    render() {
        const {hit} = this.props;
        const ecommerce = this.props.ecommerce;

        const className =
            ecommerce.view === 'gridView'
                ? 'isoAlgoliaGrid GridView'
                : 'isoAlgoliaGrid ListView';
        let addedTocart = false;
        ecommerce.productQuantity.forEach(product => {
            if (product.objectID === hit.objectID) {
                addedTocart = true;
            }
        });
        return (
            <GridListViewWrapper className={className}>
                <div className="isoAlGridImage">
                    <img alt="#" src={hit.image}/>
                    {!addedTocart
                        ? <Button
                            onClick={() => {
                                this.setState({addCartLoading: true});
                                const update = () => {
                                    ecommerce.addToCart(hit);
                                    this.setState({addCartLoading: false});
                                };
                                setTimeout(update, 1500);
                            }}
                            type="primary"
                            className="isoAlAddToCart"
                            loading={this.state.addCartLoading}
                        >
                            <i className="ion-android-cart"/>
                            Add to cart
                        </Button>
                        : <Button
                            onClick={() => ecommerce.changeViewTopbarCart(true)}
                            type="primary"
                            className="isoAlAddToCart"
                        >
                            View Cart
                        </Button>}
                </div>
                <div className="isoAlGridContents">
                    <div className="isoAlGridName">
                        <Highlight attributeName="name" hit={hit}/>
                    </div>

                    <div className="isoAlGridPriceRating">
            <span className="isoAlGridPrice">
              ${hit.price}
            </span>

                        <div className="isoAlGridRating">
                            <Rate disabled count={6} defaultValue={hit.rating}/>
                        </div>
                    </div>

                    <div className="isoAlGridDescription">
                        <Snippet attributeName="description" hit={hit}/>
                    </div>
                </div>
            </GridListViewWrapper>
        );
    }
}
