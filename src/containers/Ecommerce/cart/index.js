import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import CartTable from './cart-table';

export default class CartPage extends Component {
  render() {
    return (
      <LayoutWrapper>
        <CartTable className="bordered" />
      </LayoutWrapper>
    );
  }
}