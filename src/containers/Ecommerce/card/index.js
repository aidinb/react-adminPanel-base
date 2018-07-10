import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Col} from 'antd';
import Button from '../../../components/uielements/button';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import Card from '../../../components/card';
import basicStyle from '../../../config/basicStyle';
import {createColumns} from './config';
import {ButtonWrapper} from '../../../components/card/cardModal.style';
import SimpleTable from '../../Tables/antTables/tableViews/simpleView';

@inject('card', 'routing')
@observer
export default class Cards extends Component {
    constructor(props) {
        super(props);
        this.columns = createColumns(this.editColumn, this.props.card.deleteCard);
        this.state = {
            editView: false,
            selectedCard: null,
            modalType: '',
        };
    }

    editColumn = (card) => {
        this.setState({
            editView: true,
            selectedCard: card,
            modalType: 'edit',
        });
    }

    addColumn = () => {
        this.setState({
            editView: true,
            selectedCard: {
                id: new Date().getTime(),
                key: new Date().getTime(),
                number: '',
                name: '',
                expiry: '',
                cvc: '',
            },
            modalType: 'add',
        });
    }

    handleCancel = () => {
        this.setState({
            editView: false,
            selectedCard: null,
        });
    }

    submitCard = (card) => {
        const cardStore = this.props.card;
        if (this.state.modalType === 'edit') {
            cardStore.editCard(this.state.selectedCard);
        } else {
            cardStore.addCard(this.state.selectedCard);
        }
        this.setState({
            editView: false,
            selectedCard: null,
        });
    }

    updateCard = (selectedCard) => {
        this.setState({selectedCard});
    }

    render() {
        const {rowStyle, colStyle, gutter} = basicStyle;
        const cardStore = this.props.card;
        const {editView, selectedCard, modalType} = this.state;

        const createNumber = number => {
            const length = number.length;
            let newNumber = '';
            for (let i = 0; i < length - 4; i++) {
                newNumber = `*${newNumber}`;
            }
            for (let i = length - 4; i < length; i++) {
                newNumber = `${newNumber}${number.charAt(i)}`;
            }
            return newNumber;
        };
        cardStore.cards.forEach((card, index) => {
            cardStore.cards[index].number = createNumber(card.number);
        });
        return (
            <LayoutWrapper>
                <PageHeader>Cards</PageHeader>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={24} sm={24} xs={24} style={colStyle}>
                        <Box>
                            <ButtonWrapper className="isoButtonWrapper">
                                <Button type="primary" className="" onClick={this.addColumn}>
                                    Add New Card
                                </Button>
                            </ButtonWrapper>

                            {/* <div className="isoSimpleTable"> */}
                            <SimpleTable columns={this.columns} dataSource={cardStore.cards}/>
                            {/* </div> */}
                            {selectedCard ? (
                                <Card
                                    editView={editView}
                                    modalType={modalType}
                                    selectedCard={selectedCard}
                                    handleCancel={this.handleCancel}
                                    submitCard={this.submitCard}
                                    updateCard={this.updateCard}
                                />
                            ) : (
                                ''
                            )}
                        </Box>
                    </Col>
                </Row>
            </LayoutWrapper>
        );
    }
}