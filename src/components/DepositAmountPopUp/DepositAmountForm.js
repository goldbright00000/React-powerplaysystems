import React, { Component } from 'react';
import ChooseItem from '../../ui/ChooseItem/ChooseItem';
import styles from './styles.module.scss';

const formatePrice = (price, currencyValue) => `$${(price * currencyValue).toFixed(2)}`

class DepositAmountForm extends Component {
    state = {
        BTC: 58680,
        ETH: 2092,
        form: {
            currency: '$USD',
            price: 25,
        }
    }

    onCurrencyChange = e => {
        const { value } = e.target;
        const newForm = { ...this.state.form };
        newForm.currency = value;
        newForm.price = this.prices[value][0].value;
        this.setState({ form: newForm })
    }

    onPriceChange = e => {
        const newForm = { ...this.state.form };
        newForm.price = e.target.value;
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
            { value: .1, title: .1, helperText: formatePrice(.1, this.state.ETH) }
        ]
    }
    render() {
        const { currency, price } = this.state.form;



        return (
            <form className={styles.form}>
                <section className={styles.formSection}>
                    <h6>Select Currency</h6>
                    <div>
                        {Object.keys(this.prices).map((key, index) => <ChooseItem
                            name='currency'
                            title={key.toUpperCase()}
                            value={key}
                            key={index}
                            selectedValue={currency}
                            onChange={this.onCurrencyChange}
                        />)}

                    </div>
                </section>
                <section className={styles.formSection}>
                    <h6>Select Amount ({currency})</h6>
                    <div>
                        {this.prices[currency].map((data, index) => <ChooseItem
                            name='price'
                            key={index}
                            onChange={this.onPriceChange}
                            {...data}
                            selectedValue={price}
                        />)}
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
                </section>
            </form>
        )
    }
}

export default DepositAmountForm;