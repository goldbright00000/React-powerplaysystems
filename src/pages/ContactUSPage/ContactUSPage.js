import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Select from '../../ui/Select/Select';
import styles from './styles.module.scss';

const ContactUSPage = props => {
    const onSubmit = e => {
        e.preventDefault();
    }
    return (
        <div>
            <Header isStick={true} />
            <main className={styles.root}>
                <form className='__dark-white-color' onSubmit={onSubmit}>
                    <p>For more questions, please see our <Link to='/faqs' className='__bold __primary-color'>FAQ Page.</Link></p>
                    <h3 className={`__title-3 ${styles.title}`}>Contact Us</h3>
                    <div className={styles.formWrapper}>
                        <section>
                            <div className={styles.inputField}>
                                <label htmlFor='topic'>* Please choose a topic:</label>
                                <select id='topic' defaultValue=''>
                                    <option disabled value=''></option>
                                    <option value='Technical Support'>Technical Support</option>
                                    <option value='General Enquiry'>General Enquiry</option>
                                    <option value='Payment Related'>Payment Related</option>
                                </select>
                            </div>
                            <div className={styles.inputField}>
                                <label htmlFor='displayName'>Display name:</label>
                                <input type='text' id='displayName' placeholder='Enter your name' />
                            </div>
                            <div className={styles.inputField}>
                                <label htmlFor='email'>* Email:</label>
                                <input type='email' id='email' placeholder='Enter you email' />
                            </div>
                            <div className={styles.inputField}>
                                <label htmlFor='subject'>* Subject:</label>
                                <input type='subject' id='subject' placeholder='Subject for your message' />
                            </div>
                        </section>
                        <div className={styles.textAreaWrapper}>
                            <div className={`${styles.inputField} `}>
                                <label htmlFor='message'>* Message:</label>
                                <textarea id='message' placeholder='Enter message'></textarea>
                                <span>2000 characters max</span>
                            </div>
                            <button className={styles.btn}>Submit</button>
                        </div>
                        <section className={styles.additionWaysToContactSection}>
                            <div>
                                <h5 className='__title-5 __mt-0 __mb-1'>Additional Ways to Contact Us:</h5>
                                <p className='__mt-1 __mb-1'>
                                    <span>Email: </span>
                                    <a href='mailto:support@powerplaysystems.com' target='__blank'>support@powerplaysystems.com</a>
                                </p>
                                <p>
                                    <span>Address: </span>
                                    <address>140 Yonge St., S.200, Toronto, ON, M5C 1X6</address>
                                </p>
                            </div>
                            <div>
                                <h5 className='__title-5 __mt-4 __mb-1'>Support Hours:</h5>
                                <p className='__mt-1'><span>Monday - Friday:</span>6:00 AM EST - 11:59 PM EST</p>
                                <p className={styles.noteBlogSection}>* Please note that we do not offer Customer Support Services via telephone or in-person on-site visits</p>
                            </div>
                        </section>
                    </div>
                </form>
            </main>
            <Footer isBlack={true} />
        </div>
    )
}


export default ContactUSPage;