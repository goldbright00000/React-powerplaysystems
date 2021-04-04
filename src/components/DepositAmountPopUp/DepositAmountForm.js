import React, { Component } from 'react';
import ChooseItem from '../../ui/ChooseItem/ChooseItem';
import styles from './styles.module.scss';
import PayPal from '../../assets/paypal.png';
import BitCoin from '../../assets/bitcoin.png';
import Coingate from '../../assets/coingate.png';
import CreditDebitCard from '../../assets/combined-shape.png';
import ECheck from '../../assets/e-check.png';
import Ethereum from '../../assets/ethereum.png';
import CVVImg from '../../assets/cvv.png';
import { Link } from 'react-router-dom';

const formatePrice = (price, currencyValue) => `$${(price * currencyValue).toFixed(2)}`

class DepositAmountForm extends Component {
    state = {
        BTC: 58680,
        ETH: 2092,
        form: {
            currency: '$USD',
            price: 25,
            paymentMetod: 'Credit or Debit Card'
        }
    }

    onCurrencyChange = e => {
        const { value } = e.target;
        const newForm = { ...this.state.form };
        newForm.currency = value;
        newForm.price = this.prices[value][0].value;
        newForm.paymentMetod = this.paymentTypes[value][0].value;
        this.setState({ form: newForm })
    }

    onPriceChange = e => {
        const newForm = { ...this.state.form };
        newForm.price = +e.target.value;
        this.setState({ form: newForm });
    }

    onPaymentMethodChange = e => {
        const newForm = { ...this.state.form };
        newForm.paymentMetod = e.target.value;
        this.setState({ form: newForm });
    }

    prices = {
        $USD: [
            { value: 25, title: '$25' },
            { value: 100, title: '$100' },
            { value: 250, title: '$250' },
            { value: 500, title: '$500' }
        ],
        BTC: [
            { value: .0005, title: .0005, helperText: formatePrice(.0005, this.state.BTC) },
            { value: .001, title: .001, helperText: formatePrice(.001, this.state.BTC) },
            { value: .002, title: .002, helperText: formatePrice(.002, this.state.BTC) },
            { value: .005, title: .005, helperText: formatePrice(.005, this.state.BTC) }
        ],
        ETH: [
            { value: .015, title: .015, helperText: formatePrice(.015, this.state.ETH) },
            { value: .025, title: .025, helperText: formatePrice(.025, this.state.ETH) },
            { value: .05, title: .05, helperText: formatePrice(.05, this.state.ETH) },
            { value: .1, title: .1, helperText: formatePrice(.1, this.state.ETH) },
        ]
    }

    paymentTypes = {
        $USD: [
            { value: 'Credit or Debit Card', title: <img src={CreditDebitCard} alt='' className={styles.creditdebitcardImg} />, helperText: 'CREDIT or DEBIT' },
            { value: 'PayPal', title: <img src={PayPal} alt='' className={styles.PayPal} /> },
            { value: 'E-Check', title: <img src={ECheck} alt='' className={styles.ECheck} /> }
        ],
        BTC: [
            { value: 'BitCoin', title: <img src={BitCoin} alt='' className={styles.BitCoin} /> },
            { value: 'Coingate', title: <img src={Coingate} alt='' className={styles.Coingate} /> },
        ],
        ETH: [
            { value: 'Ethereum', title: <img src={Ethereum} alt='' className={styles.Ethereum} /> },
            { value: 'BitCoin', title: <img src={BitCoin} alt='' className={styles.BitCoin} /> },
        ]
    }
    onSubmit = e => {
        e.preventDefault();
    }

    render() {
        const { currency, price, paymentMetod } = this.state.form;

        return (
            <form className={styles.form} onSubmit={this.onSubmit}>
                <section className={styles.formSection}>
                    <h6>Select Currency</h6>
                    <div>
                        {Object.keys(this.prices).map((key, index) => <ChooseItem
                            name='currency'
                            title={key.toUpperCase()}
                            value={key}
                            key={index}
                            checked={currency === key}
                            onChange={this.onCurrencyChange}
                        />)}

                    </div>
                </section>
                <section className={styles.formSection}>
                    <h6>Select Amount ({currency})</h6>
                    <div>
                        {this.prices[currency].map((data, index) => (
                            <ChooseItem
                                name='price'
                                key={index}
                                onChange={this.onPriceChange}
                                {...data}
                                checked={price === data.value}
                            />
                        ))}
                        <ChooseItem
                            name='price'
                            onChange={this.onPriceChange}
                            selectedValue={price}
                            title="Other"
                            helperText="Your Amount"
                            value='other'
                        />
                    </div>
                </section>
                <section className={styles.formSection}>
                    <h6>Add Payment Details</h6>
                    <div>
                        {this.paymentTypes[currency].map((data, index) => (
                            <ChooseItem
                                {...data}
                                key={index}
                                checked={paymentMetod === data.value}
                                onChange={this.onPaymentMethodChange}
                            />
                        ))}
                    </div>
                </section>
                <section className={styles.cardSectionn}>
                    <div className={styles.cardDetails}>
                        <div>
                            <label>Credit Card Type</label>
                            <Link to='/add-card'>+ Add New Card</Link>
                        </div>
                        <input defaultValue="Ending in 0116  Exp 11/2021" disabled={true} />
                    </div>
                    <div className='__mt-2 __flex __sb'>
                        <div>
                            <p>Fred Smith</p>
                            <p className='__mt-s __mb-s'>123 Main St</p>
                            <p>Toronto, ON. M1N 1N1</p>
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor='CVV'>CVV</label>
                            <div className='__flex'>
                                <input type='text' maxLength={3} minLength={3} className={styles.cvvInput} id='CVV' />
                                <img alt='' src={CVVImg} className={styles.cvvImage} />
                            </div>
                        </div>
                    </div>
                </section>
                <button className={styles.submitbtn}>Deposit  • {currency === '$USD' && '$'}{price} {currency.replace('$', '')}</button>
            </form>
        )
    }
}

export default DepositAmountForm;