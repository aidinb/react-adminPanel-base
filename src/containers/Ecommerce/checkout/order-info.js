import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Button from '../../../components/uielements/button';
import SingleOrderInfo from './single-order';
import {OrderTable} from './checkout.style';

let totalPrice;

@inject('ecommerce', 'routing')
@observer
export default class OrderInfo extends Component {
    constructor(props) {
        super(props);
    }

    renderProducts = () => {
        const ecommerce = this.props.ecommerce;
        totalPrice = 0;
        return ecommerce.productQuantity.map(product => {
            totalPrice += product.quantity * ecommerce.products[product.objectID].price;
            return (
                <SingleOrderInfo
                    key={product.objectID}
                    quantity={product.quantity}
                    {...ecommerce.products[product.objectID]}
                />
            );
        });
    };

    render() {
        return (
            <OrderTable className="isoOrderInfo">
                <div className="isoOrderTable">
                    <div className="isoOrderTableHead">
                        <span className="tableHead">Product</span>
                        <span className="tableHead">Total</span>
                    </div>

                    <div className="isoOrderTableBody">
                        {this.renderProducts()}
                    </div>
                    <div className="isoOrderTableFooter">
                        <span>Total</span>
                        <span>
              ${totalPrice.toFixed(2)}
            </span>
                    </div>

                    <Button type="primary" className="isoOrderBtn">
                        Place Order
                    </Button>
                </div>
            </OrderTable>
        );
    }
}