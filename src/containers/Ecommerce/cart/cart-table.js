import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import Input from '../../../components/uielements/input';
import Button from '../../../components/uielements/button';
import SingleCart from '../../../components/cart/singleCart';
import ProductsTable from './cartTable.style';
import {rtl} from '../../../config/withDirection';

let totalPrice = 0;
@inject('ecommerce', 'routing')
@observer
export default class CartTable extends Component {
    constructor(props) {
        super(props);
    }

    renderItems = () => {
        const ecommerce = this.props.ecommerce;
        totalPrice = 0;
        if (!ecommerce.productQuantity || ecommerce.productQuantity.length === 0) {
            return <tr className="isoNoItemMsg">No item found</tr>;
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
    }

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
    }

    render() {
        const {style} = this.props;
        const classname = style !== null ? style : '';
        return (
            <ProductsTable className={`isoCartTable ${classname}`}>
                <table>
                    <thead>
                    <tr>
                        <th className="isoItemRemove"/>
                        <th className="isoItemImage"/>
                        <th className="isoItemName">Name</th>
                        <th className="isoItemPrice">Price</th>
                        <th className="isoItemQuantity">Quantity</th>
                        <th className="isoItemPriceTotal">Total</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.renderItems()}
                    <tr className="isoTotalBill">
                        <td className="isoItemRemove"/>
                        <td className="isoItemImage"/>
                        <td className="isoItemName"/>
                        <td className="isoItemPrice"/>
                        <td className="isoItemQuantity">Total</td>
                        <td className="isoItemPriceTotal">${totalPrice.toFixed(2)}</td>
                    </tr>
                    </tbody>

                    <tfoot>
                    <tr>
                        <td
                            style={{
                                width: '100%',
                                paddingRight: `${rtl === 'rtl' ? '0' : '25px'}`,
                                paddingLeft: `${rtl === 'rtl' ? '25px' : '0'}`
                            }}
                        >
                            <Input size="large" placeholder="Discount Coupon"/>
                        </td>
                        <td
                            style={{
                                paddingRight: `${rtl === 'rtl' ? '0' : '25px'}`,
                                paddingLeft: `${rtl === 'rtl' ? '25px' : '0'}`
                            }}
                        >
                            <Button>Apply</Button>
                        </td>
                        <td>
                            <Button type="primary">
                                <Link to={'/dashboard/checkout'}>Checkout</Link>
                            </Button>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </ProductsTable>
        );
    }
}
