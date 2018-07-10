import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import {Link} from 'react-router-dom';
import IntlMessages from '../utility/intlMessages';
import Popover from '../uielements/popover';
import SingleCart from '../cart/singleCartModal';
import TopbarDropdownWrapper from './topbarDropdown.style';

let totalPrice;

@inject('ecommerce','themeSwitcher', 'routing')
@observer
export default class TopbarAddtoCart extends Component {
    constructor(props) {
        super(props);

    }

    hide = () => {
        const ecommerce = this.props.ecommerce;
        ecommerce.changeViewTopbarCart(false);
    };

    handleVisibleChange = () => {
        const ecommerce = this.props.ecommerce;
        ecommerce.changeViewTopbarCart(!ecommerce.viewTopbarCart);
    };

    renderProducts = () => {
        const ecommerce = this.props.ecommerce;
        totalPrice = 0;
        if (!ecommerce.productQuantity || ecommerce.productQuantity.length === 0) {
            return (
                <div className="isoNoItemMsg">
                    <span>No item found</span>
                </div>
            );
        }
        return ecommerce.productQuantity.map(product => {
            totalPrice += product.quantity * ecommerce.products[product.objectID].price;
            return (
                <SingleCart
                    key={product.objectID}
                    quantity={product.quantity}
                    changeQuantity={this.changeQuantity}
                    cancelQuantity={this.cancelQuantity}
                    {...ecommerce.products[product.objectID]}
                />
            );
        });
    };

    changeQuantity = (objectID, quantity) => {
        const ecommerce = this.props.ecommerce;
        const newProductQuantity = [];
        ecommerce.productQuantity.forEach(product => {
            if (product.objectID !== objectID) {
                newProductQuantity.push(product);
            } else {
                newProductQuantity.push({
                    objectID,
                    quantity
                });
            }
        });
        ecommerce.changeProductQuantity(newProductQuantity);
    };

    cancelQuantity = (objectID) => {
        const ecommerce = this.props.ecommerce;
        const newProductQuantity = [];
        ecommerce.productQuantity.forEach(product => {
            if (product.objectID !== objectID) {
                newProductQuantity.push(product);
            }
        });
        ecommerce.changeProductQuantity(newProductQuantity);
    };

    render() {
        const {url} = this.props;

        const ecommerce = this.props.ecommerce;
        const themeSwitcher = this.props.themeSwitcher;


        const content = (
            <TopbarDropdownWrapper className="topbarAddtoCart">
                <div className="isoDropdownHeader">
                    <h3>
                        <IntlMessages id="sidebar.cart"/>
                    </h3>
                </div>
                <div className="isoDropdownBody isoCartItemsWrapper">
                    {this.renderProducts()}
                </div>
                <div className="isoDropdownFooterLinks">
                    <Link to={`${url}/cart`} onClick={this.hide}>
                        <IntlMessages id="topbar.viewCart"/>
                    </Link>

                    <h3>
                        <IntlMessages id="topbar.totalPrice"/>:{' '}
                        <span>${totalPrice.toFixed(2)}</span>
                    </h3>
                </div>
            </TopbarDropdownWrapper>
        );
        return (
            <Popover
                content={content}
                trigger="click"
                visible={ecommerce.viewTopbarCart}
                onVisibleChange={this.handleVisibleChange}
                placement="bottomLeft"
            >
                <div className="isoIconWrapper">
                    <i
                        className="ion-android-cart"
                        style={{color: themeSwitcher.topbarTheme.textColor}}
                    />
                    {ecommerce.productQuantity.length === 0 ? (
                        ''
                    ) : (
                        <span>{ecommerce.productQuantity.length}</span>
                    )}
                </div>
            </Popover>
        );
    }
}
