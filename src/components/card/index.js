import React, {Component} from 'react';
import CardReactFormContainer from 'card-react';
import Form from '../uielements/form';
import {Input} from 'antd';
import isoModal from '../feedback/modal';
import './card.css';
import {CardInfoWrapper, InfoFormWrapper} from './cardModal.style';
import {InputWrapper} from '../uielements/styles/input.style';
import Modals from '../../containers/Feedback/Modal/modal.style';
import WithDirection from '../../config/withDirection';

const WDModal = Modals(isoModal);
const Modal = WithDirection(WDModal);

const InputField = InputWrapper(Input);

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const cardStore = this.props.card;

        this.columns = [
            {
                title: 'Number',
                dataIndex: 'number',
                key: 'number',
            },
            {
                title: 'Full Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Expiry',
                dataIndex: 'expiry',
                key: 'expiry',
            },
            {
                title: 'CVC',
                dataIndex: 'cvc',
                key: 'cvc',
            },
        ];

        const saveButton = () => {
            cardStore.submitCard();
        };
        const containerId = 'card-wrapper';
        const cardConfig = {
            container: containerId, // required an object contain the form inputs names. every input must have a unique name prop.
            formInputsNames: {
                number: 'number', // optional — default "number"
                expiry: 'expiry', // optional — default "expiry"
                cvc: 'cvc', // optional — default "cvc"
                name: 'name', // optional - default "name"
            },
            initialValues: cardStore.selectedCard,
            classes: {
                valid: 'valid-input', // optional — default 'jp-card-valid'
                invalid: 'valid-input', // optional — default 'jp-card-invalid'
            },
            formatting: true, // optional - default true
            placeholders: {
                number: '•••• •••• •••• ••••',
                expiry: '••/••',
                cvc: '•••',
                name: 'Full Name',
            },
        };
        return (
            <Modal
                title={cardStore.modalType === 'edit' ? 'Edit Card' : 'Add Card'}
                visible={cardStore.editView}
                onCancel={cardStore.handleCancel}
                cancelText="Cancel"
                onOk={saveButton}
                okText={cardStore.modalType === 'edit' ? 'Edit Card' : 'Add Card'}
            >
                <CardInfoWrapper id={containerId} className="isoCardWrapper"/>

                <CardReactFormContainer {...cardConfig}>
                    <InfoFormWrapper>
                        <Form className="isoCardInfoForm">
                            {this.columns.map((column, index) => {
                                const {key, title} = column;
                                return (
                                    <InputField
                                        placeholder={title}
                                        type="text"
                                        className={`isoCardInput ${key}`}
                                        onChange={event => {
                                            cardStore.selectedCard[key] = event.target.value;
                                            cardStore.updateCard(cardStore.selectedCard);
                                        }}
                                        name={key}
                                        key={index}
                                    />
                                );
                            })}
                        </Form>
                    </InfoFormWrapper>
                </CardReactFormContainer>
            </Modal>
        );
    }
}
