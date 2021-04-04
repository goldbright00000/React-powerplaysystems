import React, { Component } from 'react';
import CreatePopUpPortal from '../../utility/CreatePopUpPortal';
import DepositAmountForm from './DepositAmountForm';
import styles from './styles.module.scss';

class DepositAmountPopUp extends Component {
    render() {
        return (
            <CreatePopUpPortal>
                <div className={styles.blur}></div>
                <div className={styles.root}>
                    <section className={styles.contentWrapper}>
                        <header className={styles.header}>
                            <h3 className={styles.mainTitle}>Deposit</h3>
                            <div className={styles.crossicon}><span></span></div>
                        </header>
                        <main className={styles.main}>
                            <DepositAmountForm />
                        </main>
                    </section>
                </div>
            </CreatePopUpPortal>
        )
    }
}

export default DepositAmountPopUp;