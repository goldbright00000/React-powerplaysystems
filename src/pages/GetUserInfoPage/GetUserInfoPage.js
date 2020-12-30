import React from 'react';
import Input from '../../ui/Input/Input';
import Select from '../../ui/Select/Select';
import './GetUserInfoPage.scss'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import powerplayicon from '../../assets/powerplay-icon.png';
import img1 from '../../assets/group-14.png'
import CheckBox from '../../ui/CheckBox/CheckBox';
import { Link } from 'react-router-dom';

const GetUserInfoPage = props => {
    return (
        <div className='__GetUserInfoPage'>
            <Header isStick={true} />
            <div className='__background-color'>
                <div className='__center __mt-7 __sign-in-container'>
                    <div className='__inline-block'>
                        <div className='__viewport-title __ml-1 __mb-1 __mr-1 __primary __m-a __h3 __bold __p-s __h4-on-small'>Get ready to Power-up!</div>
                        <div className='__viewport-subtitle __h6 __mediam-on-small'>Complete the fields below to create your PowerPlay Account. <br className='__hide-on-small' /> As a bonus you can receive up to 20 <img src={powerplayicon} alt='' align='center' /> Powerplay tokens!</div>
                    </div>
                </div>
            </div>
            <div className='__form-section __mb-5'>
                <div className='__form-wrapper __container-2 __flex __sb __block-on-mediam'>
                    <div className='__center'>
                        <div className='__primary-color __h3 __bolder __mt-4'>10 Powerplay tokens</div>
                        <div className='__h5 __mt-s __mb-4'>will be added to your account!</div>
                        <img alt='' src={img1} className='__block __powerplay-image __hide-on-mediam' />
                    </div>
                    <form className='__sign-in-form'>
                        <div className='__primary-color __center __hide-on-mediam'>
                            <div className='__h4 __bold'>Receive 10 Powerplay tokens</div>
                            <div className='__small __light-bold'>just for signing up!</div>
                        </div>
                        <div className='__flex __flex-end __inputs-wrapper __block-on-small'>
                            <Input type='text' title='First Name' id='firstName' />
                            <Input type='text' title='Last Name' id='firstName' />
                        </div>
                        <div className='__flex __flex-end __inputs-wrapper'>
                            <Input type='text' title='Country' id='country' />
                            <Input type='text' title='State/Province' id='state' />
                        </div>
                        <div className='__flex __flex-end __inputs-wrapper __date-fields-wrapper'>
                            <Select title='Date of birth'>
                                <option>Month</option>
                                <option>Jan</option>
                                <option>Feb</option>
                                <option>Mar</option>
                                <option>Apr</option>
                                <option>May</option>
                                <option>June</option>
                                <option>July</option>
                                <option>Aug</option>
                                <option>Sep</option>
                                <option>Oct</option>
                                <option>Nov</option>
                                <option>Dec</option>
                            </Select>
                            <Input type='number' placeholder='Day' min={1} max={31} />
                            <Input type='number' placeholder='Year' />
                        </div>
                        <label className='__flex __flex-start __checkbox-wrapper __mb-1 __mt-1'>
                            <CheckBox />
                            <span>I am over the age of majority in the state or province where I currently reside.</span>
                        </label>
                        <label className='__flex __flex-start __checkbox-wrapper __mb-1'>
                            <CheckBox />
                            <span>I have read agree to the <Link to='/' className='__light-bold __terms-conditions'>terms and conditions</Link> for using this website.</span>
                        </label>
                        <label className='__flex __flex-start __checkbox-wrapper __mb-1'>
                            <CheckBox />
                            <span>I agree to receive email communications regarding status of games that I enter.</span>
                        </label>
                        <label className='__flex __flex-start __checkbox-wrapper __mb-1'>
                            <CheckBox />
                            <span>I agree to receive marketing email communications from Powerplay Systems and or their partners.</span>
                        </label>
                        <button className='__btn __h4 __submit-btn __uppercase __block __h5-on-small'>Power up!</button>
                    </form>
                </div>
            </div>
            <Footer isBlack={true} />
        </div>
    )
}

export default GetUserInfoPage;