import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer/Footer";
import "./index.css";
import * as Constants from "../../global/constants.js";
class TermsOfUse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      content: "",
    };
  }
  componentDidMount() {
    fetch("https://" + Constants.URL + "/api/website_footer/getone.php?id=1")
      .then((res) => res.json())
      .then(
        (result) => {
          result = result.records;
          this.setState({
            content: result[0].content,
          });
        },
        (error) => {
          this.setState({
            hasError: true,
            error: error,
          });
        }
      );
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid _faq_wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1>Terms Of Use</h1>
              </div>
              <div className="col-md-12">
                {/* <div
                  className="_faq_cont"
                  dangerouslySetInnerHTML={{ __html: this.state.content }}
                /> */}
                <div className="_faq_cont">
                  <p>
                    <strong>
                      <span data-contrast="none">
                        IMPORTANT LEGAL NOTICE REGARDING TERMS OF USE OF&nbsp;
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">DEFY&nbsp;</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">GAMES</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">.</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      IMPORTANT! PLEASE CAREFULLY READ THESE TERMS OF USE BEFORE
                      USING&nbsp;
                    </span>
                    <span data-contrast="none">DEFY GAMES</span>
                    <span data-contrast="none">
                      , AS THEY AFFECT YOUR LEGAL RIGHTS AND OBLIGATIONS.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">IMPORTANT NOTICE:</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">&nbsp;</span>
                    </strong>
                    <span data-contrast="none">
                      THIS AGREEMENT IS SUBJECT TO BINDING ARBITRATION AND A
                      WAIVER OF CLASS ACTION RIGHTS AS DETAILED BELOW.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">DEFINITIONS</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">&ldquo;</span>
                    <strong>
                      <span data-contrast="none">Service(s)</span>
                    </strong>
                    <span data-contrast="none">
                      &rdquo; refers to products, games,&nbsp;
                    </span>
                    <span data-contrast="none">contests,&nbsp;</span>
                    <span data-contrast="none">
                      services, content, Defygames.io and/or other domains
                      provided by PowerPlay Systems Inc.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">&ldquo;</span>
                    <strong>
                      <span data-contrast="none">Account</span>
                    </strong>
                    <span data-contrast="none">
                      &rdquo; means an Account you create when you access the
                      Services.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">&ldquo;</span>
                    <strong>
                      <span data-contrast="none">Offers</span>
                    </strong>
                    <span data-contrast="none">
                      &rdquo; means special programs, including offers,
                      excursions, and special gifts, both digital and tactile,
                      that&nbsp;
                    </span>
                    <span data-contrast="none">players may earn</span>
                    <span data-contrast="none">
                      &nbsp;from time to time&nbsp;
                    </span>
                    <span data-contrast="none">while using the Service.</span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">&ldquo;</span>
                    <strong>
                      <span data-contrast="none">Terms of Service</span>
                    </strong>
                    <span data-contrast="none">
                      &rdquo; or &ldquo;Terms&rdquo; means these terms of
                      service.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">&ldquo;</span>
                    <strong>
                      <span data-contrast="none">Power Tokens</span>
                    </strong>
                    <span data-contrast="none">&rdquo; </span>
                    <span data-contrast="none">
                      refers to the Defy Games utility token (PWRS).
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">&nbsp;&ldquo;</span>
                    <strong>
                      <span data-contrast="none">PowerPlay Systems</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">&nbsp;Affiliates</span>
                    </strong>
                    <span data-contrast="none">
                      &rdquo; refers to the&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;plus third-party content providers,
                      distributors,&nbsp;
                    </span>
                    <span data-contrast="none">licensees,</span>
                    <span data-contrast="none">&nbsp;or licensors.</span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">&ldquo;Website&rdquo;</span>
                    </strong>
                    <span data-contrast="none">
                      &nbsp;refers to the Defy Games website.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">&ldquo;Powers&rdquo;</span>
                    </strong>
                    <span data-contrast="none">
                      &nbsp;refers to live game capabilities&nbsp;
                    </span>
                    <span data-contrast="none">
                      that allow participants&nbsp;
                    </span>
                    <span data-contrast="none">to make changes</span>
                    <span data-contrast="none">
                      &nbsp;to their fantasy team
                    </span>
                    <span data-contrast="none">
                      . They include, but are not limited to
                    </span>
                    <span data-contrast="none">,</span>
                    <span data-contrast="none">
                      &nbsp;player swaps, point boosters, video review
                    </span>
                    <span data-contrast="none">s</span>
                    <span data-contrast="none">, and d-wall</span>
                    <span data-contrast="none">s</span>
                    <span data-contrast="none">.</span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">USER AGREEMENT</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">PowerPlay Systems Inc.</span>
                    <span data-contrast="none">
                      &nbsp;(hereafter referred to as &lsquo;
                    </span>
                    <span data-contrast="none">PowerPlay Systems&rsquo;</span>
                    <span data-contrast="none">
                      , &ldquo;the Company&rdquo;
                    </span>
                    <span data-contrast="none">)&nbsp;</span>
                    <span data-contrast="none">
                      owns and operates the&nbsp;
                    </span>
                    <span data-contrast="none">Defy Games&nbsp;</span>
                    <span data-contrast="none">Website&nbsp;</span>
                    <span data-contrast="none">(defygames.io)&nbsp;</span>
                    <span data-contrast="none">
                      that links to these Terms of Use. We are pleased to offer
                      you access to our Website and the ability to participate
                      in our&nbsp;
                    </span>
                    <span data-contrast="none">contests</span>
                    <span data-contrast="none">
                      &nbsp;of skill, other content, products,&nbsp;
                    </span>
                    <span data-contrast="none">Services</span>
                    <span data-contrast="none">
                      , and promotions (collectively the "Services") that we may
                      provide from our Website, subject to these Terms of Use
                      (the "Terms of Use", or &ldquo;Terms&rdquo;), our privacy
                      policy (the "Privacy Policy") and the Official Rules and
                      Regulations for the applicable&nbsp;
                    </span>
                    <span data-contrast="none">game</span>
                    <span data-contrast="none">
                      s and promotions (the "Rules" or "Rules and Scoring," and
                      together with the Terms of Use and the Privacy Policy, the
                      "Agreements").
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">CONSIDERATION</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      You agree to these Terms of Use by accessing or using the
                      Website, registering for Services offered on&nbsp;
                    </span>
                    <span data-contrast="none">the Website</span>
                    <span data-contrast="none">
                      , or by accepting, uploading,&nbsp;
                    </span>
                    <span data-contrast="none">submitting,</span>
                    <span data-contrast="none">
                      &nbsp;or downloading any information or content from or to
                      the Website. IF YOU DO NOT AGREE TO BE BOUND BY ALL OF
                      THESE&nbsp;
                    </span>
                    <span data-contrast="none">
                      TERMS OF USE, DO NOT USE THE WEBSITE. These Terms of Use
                      constitute a legal agreement between you and&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems and</span>
                    <span data-contrast="none">
                      &nbsp;shall apply to your use of&nbsp;
                    </span>
                    <span data-contrast="none">the Website</span>
                    <span data-contrast="none">
                      &nbsp;and the Services even after termination.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">ELIGIBILITY</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      You hereby represent and warrant that you are fully able
                      and competent to enter into the terms, conditions,
                      obligations, affirmations, representations and warranties
                      set forth in these terms and to abide by and comply with
                      these terms.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">By entering a&nbsp;</span>
                    <span data-contrast="none">Defy</span>
                    <span data-contrast="none">&nbsp;</span>
                    <span data-contrast="none">Games contest</span>
                    <span data-contrast="none">
                      , you are representing and warranting that:
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <ul>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="4"
                      data-aria-posinset="1"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        you are of 18 years of age or older (
                      </span>
                      <span data-contrast="none">
                        19 or older in Alabama or Nebraska,&nbsp;
                      </span>
                      <span data-contrast="none">
                        21 years of age or older in Massachusetts)
                      </span>
                      <span data-ccp-props='{"201341983":0,"335559685":245,"335559739":45,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="4"
                      data-aria-posinset="2"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        you are of legal age in the jurisdiction in which you
                        are using the Services;&nbsp;
                      </span>
                      <span data-contrast="none">PowerPlay Systems</span>
                      <span data-contrast="none">
                        &nbsp;reserves the right, in its sole discretion,&nbsp;
                      </span>
                      <span data-contrast="none">
                        to terminate your Account, withhold or revoke the
                        awarding of any prizes associated with your Account or
                        limit your ability to withdraw if it determines that you
                        are not of legal age in the applicable&nbsp;
                      </span>
                      <span data-contrast="none">jurisdiction;</span>
                      <span data-ccp-props='{"201341983":0,"335559685":245,"335559739":45,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="4"
                      data-aria-posinset="3"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        you are not listed on any U.S. Government list of
                        prohibited or restricted parties;
                      </span>
                      <span data-ccp-props='{"201341983":0,"335559685":245,"335559739":45,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                  </ul>
                  <ul>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="4"
                      data-aria-posinset="1"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        you will abide at all times by these Terms of Use and
                        any other agreements between you and&nbsp;
                      </span>
                      <span data-contrast="none">PowerPlay Systems</span>
                      <span data-contrast="none">&nbsp;</span>
                      <span data-contrast="none">
                        regarding your use of the Service or participation
                        in&nbsp;
                      </span>
                      <span data-contrast="none">contest</span>
                      <span data-contrast="none">s;</span>
                      <span data-ccp-props='{"201341983":0,"335559685":245,"335559739":45,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="4"
                      data-aria-posinset="2"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        you are not subject to backup withholding tax because:
                        (a) you are exempt from backup withholding, or (b) you
                        have not been notified by the Internal Revenue Service
                        (IRS) that you are subject to backup withholding as a
                        result of a failure to report all interest or dividends,
                        or (c) the IRS has notified you that you are no longer
                        subject to backup withholding.
                      </span>
                      <span data-ccp-props='{"201341983":0,"335559685":245,"335559739":45,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                  </ul>
                  <p>
                    <span data-ccp-props='{"201341983":0,"335559685":245,"335559739":45,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">If&nbsp;</span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;determines that you do not meet the eligibility
                      requirements of this section, then you are not authorized
                      to use the Service.&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;may require you to provide proof that you are
                      eligible to participate according to this section prior to
                      receiving a prize. This includes by requesting that you
                      fill out an affidavit of eligibility or other verification
                      information. If&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;otherwise determines that you do not meet the
                      eligibility requirements of this section, in addition to
                      any rights that&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;may have in law or equity,&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;reserves the right to terminate your&nbsp;
                    </span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      , withhold or revoke the awarding of any prizes associated
                      with your&nbsp;
                    </span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      &nbsp;or limit your ability to withdraw. In such a
                      situation,&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;may pay out any withheld or revoked prizes to the
                      other entrants in the relevant&nbsp;
                    </span>
                    <span data-contrast="none">game</span>
                    <span data-contrast="none">
                      &nbsp;in a manner consistent with the prize structure of
                      the&nbsp;
                    </span>
                    <span data-contrast="none">game</span>
                    <span data-contrast="none">
                      , to be precisely determined by&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;in its sole discretion.&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;also reserves the right to withhold revoked prizes
                      to use in furtherance of its fraud prevention or
                      anti-money laundering efforts.&nbsp;
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      You must be at least eighteen (18) years of age to open
                      an&nbsp;
                    </span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">, participate in&nbsp;</span>
                    <span data-contrast="none">game</span>
                    <span data-contrast="none">
                      s, or win prizes offered by the Website. In
                      jurisdictions,&nbsp;
                    </span>
                    <span data-contrast="none">provinces,&nbsp;</span>
                    <span data-contrast="none">
                      territories, and locations where the minimum age for
                      permissible use of the Website is greater than eighteen
                      (18) years old, you must meet the age requirement in your
                      local jurisdiction or territory. You must be at least
                      nineteen (19) years of age at time of&nbsp;
                    </span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      &nbsp;creation if you are a legal resident of Alabama or
                      Nebraska or twenty-one (21) years of age if you are a
                      legal resident of Massachusetts.&nbsp;
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      You may establish only one&nbsp;
                    </span>
                    <span data-contrast="none">Defy Games&nbsp;</span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      &nbsp;per person to participate in the Services offered
                      on&nbsp;
                    </span>
                    <span data-contrast="none">the Website</span>
                    <span data-contrast="none">. In the event&nbsp;</span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;discovers that you have opened more than one&nbsp;
                    </span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      &nbsp;per person, in addition to any other rights
                      that&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">&nbsp;may have,&nbsp;</span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;reserves the right to&nbsp;
                    </span>
                    <span data-contrast="none">suspend or terminate</span>
                    <span data-contrast="none">
                      &nbsp;any or all of your&nbsp;
                    </span>
                    <span data-contrast="none">Defy Games&nbsp;</span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      s and terminate, withhold or revoke the awarding of any
                      prizes. You are responsible for maintaining the
                      confidentiality of your login&nbsp;
                    </span>
                    <span data-contrast="none">credentials, display name,</span>
                    <span data-contrast="none">
                      &nbsp;and password and you accept responsibility for all
                      activities, charges, and damages that occur under
                      your&nbsp;
                    </span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      . It shall be a violation of these Terms of Use to allow
                      any other person to use your&nbsp;
                    </span>
                    <span data-contrast="none">Defy Games&nbsp;</span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      &nbsp;to participate in any&nbsp;
                    </span>
                    <span data-contrast="none">game</span>
                    <span data-contrast="none">
                      . If you have reason to believe that someone is using
                      your&nbsp;
                    </span>
                    <span data-contrast="none">Defy Games&nbsp;</span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      &nbsp;without your permission, you should contact us
                      immediately. We will not be responsible for any loss or
                      damage resulting from your failure to notify us of
                      unauthorized use. If we request registration information
                      from you, you must provide us with accurate and complete
                      information and must update the information when it
                      changes.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">"Authorized&nbsp;</span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      &nbsp;Holder" is defined as the natural person&nbsp;
                    </span>
                    <span data-contrast="none">
                      meeting our age eligibility requirements
                    </span>
                    <span data-contrast="none">
                      &nbsp;who is assigned to an e-mail address by an Internet
                      access provider, on-line service provider, or other
                      organization (e.g., business, education institution, etc.)
                      that is responsible for assigning e-mail addresses for the
                      domain associated with the submitted e-mail address for
                      registration on the Website. By inputting a payment method
                      to participate in real money&nbsp;
                    </span>
                    <span data-contrast="none">game</span>
                    <span data-contrast="none">s, the Authorized&nbsp;</span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      &nbsp;Holder hereby affirms that the Authorized&nbsp;
                    </span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      &nbsp;Holder is the lawful owner of the payment
                      method&nbsp;
                    </span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      &nbsp;used to make any deposit(s) on&nbsp;
                    </span>
                    <span data-contrast="none">the Website</span>
                    <span data-contrast="none">
                      . It shall be a violation of these Terms of Use for any
                      Authorized&nbsp;
                    </span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      &nbsp;Holder to submit payment using any payment method
                      that is not owned by the Authorized&nbsp;
                    </span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">&nbsp;Holder.</span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">If any deposit is&nbsp;</span>
                    <span data-contrast="none">reversed,</span>
                    <span data-contrast="none">
                      &nbsp;any winnings generated from&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">&nbsp;</span>
                    <span data-contrast="none">game</span>
                    <span data-contrast="none">
                      s shall be invalidated,&nbsp;
                    </span>
                    <span data-contrast="none">forfeited,</span>
                    <span data-contrast="none">
                      &nbsp;and deducted from your&nbsp;
                    </span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      &nbsp;balance. In addition, the amount of the initial
                      deposit will be invalidated, forfeited and deducted from
                      the&nbsp;
                    </span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">&nbsp;balance.&nbsp;</span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;reserves the right to close your&nbsp;
                    </span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      &nbsp;&ndash; without notice &ndash; shall a deposit be
                      charged back.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;employees (&ldquo;Employees&rdquo;) and Immediate
                      Family Members (an &ldquo;Immediate Family Member&rdquo;
                      means any domestic partner and relative of the employee
                      who resident at an employee&rsquo;s residence, including
                      but not limited to parents, grandparents, in-laws,
                      children, siblings, and spouses) are not permitted to play
                      in any public&nbsp;
                    </span>
                    <span data-contrast="none">game</span>
                    <span data-contrast="none">s hosted on the Website</span>
                    <span data-contrast="none">.</span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      Athletes, coaches and other team management, team support
                      personnel (e.g. without limitation, team physicians) and
                      team owners may not participate in any&nbsp;
                    </span>
                    <span data-contrast="none">Defy&nbsp;</span>
                    <span data-contrast="none">Games</span>
                    <span data-contrast="none">&nbsp;</span>
                    <span data-contrast="none">contests</span>
                    <span data-contrast="none">
                      &nbsp;in the sport or sports with which they&rsquo;re
                      associated. Team owners, referees, league employees,
                      sports commissioners and other individuals who through an
                      ownership interest or game-related employment can
                      influence the gameplay are likewise ineligible.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">GAME</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">&nbsp;ENTRY</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      Users will be able to visit the Website and view the&nbsp;
                    </span>
                    <span data-contrast="none">contests</span>
                    <span data-contrast="none">
                      &nbsp;available for entry (the "
                    </span>
                    <span data-contrast="none">Contests</span>
                    <span data-contrast="none">").&nbsp;</span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">POWERPLAY TOKENS (PWRS)</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      Powerplay tokens are a reward mechanism used on the
                      Website. Participants may earn or win PowerPlay tokens by
                      participating in Contests on the Website
                    </span>
                    <span data-contrast="none">
                      &nbsp;or via other means as the sole discretion of
                      PowerPlay Systems.
                    </span>
                    <span data-contrast="none">
                      &nbsp;While PWRS are a registered ERC20 token on the
                      Ethereum Network, they do not&nbsp;
                    </span>
                    <span data-contrast="none">currently&nbsp;</span>
                    <span data-contrast="none">
                      have any re-sale value and are used purely as a
                    </span>
                    <span data-contrast="none">
                      &nbsp;utility token for Defy Game participation purposes.
                      As they are registered tokens, participants are free to
                      transfer any accumulated tokens to their personal ERC20
                      wallet.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">REFUND POLICY</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">Purchases</span>
                    <span data-contrast="none">
                      &nbsp;made on our site will appear on your statement
                      as&nbsp;
                    </span>
                    <span data-contrast="none">POWERPLAY SYSTEMS</span>
                    <span data-contrast="none">&nbsp;INC</span>
                    <span data-contrast="none">
                      . All payments are final. No refunds will be issued. In
                      the event of a dispute regarding the identity of the
                      person submitting an entry, the entry will be deemed
                      submitted by the person in whose name the&nbsp;
                    </span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">&nbsp;was registered.</span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        CONDITIONS OF PARTICIPATION
                      </span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">By entering a&nbsp;</span>
                    <span data-contrast="none">Defy Games Contest</span>
                    <span data-contrast="none">
                      , entrants agree to be bound by these Rules and the
                      decisions of&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      , which shall be final and bind
                    </span>
                    <span data-contrast="none">ing in all respects.&nbsp;</span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      , at its sole discretion, may disqualify any entrant from
                      a&nbsp;
                    </span>
                    <span data-contrast="none">Contest</span>
                    <span data-contrast="none">
                      , refuse to award benefits or prizes and require the
                      return of any prizes, if the entrant engages in conduct or
                      otherwise util
                    </span>
                    <span data-contrast="none">izes any information&nbsp;</span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;deems to be improper,&nbsp;
                    </span>
                    <span data-contrast="none">unfair,</span>
                    <span data-contrast="none">
                      &nbsp;or otherwise adverse to the operation of the&nbsp;
                    </span>
                    <span data-contrast="none">Contest</span>
                    <span data-contrast="none">
                      &nbsp;or is in any way detrimental to other entrants.
                      These Terms prohibit entering a&nbsp;
                    </span>
                    <span data-contrast="none">Contest</span>
                    <span data-contrast="none">&nbsp;if the entrant is:</span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <ul>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="1"
                      data-aria-posinset="1"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        Except as otherwise stated in the Eligibility section a
                      </span>
                      <span data-contrast="none">
                        bove, an Employee of&nbsp;
                      </span>
                      <span data-contrast="none">PowerPlay Systems</span>
                      <span data-contrast="none">
                        &nbsp;or an immediate family member of such employee;
                      </span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                  </ul>
                  <ul>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="1"
                      data-aria-posinset="1"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        Accessing or has had access to any pre-release,
                        confidential information or other information that is
                        not available to all other entrants of a&nbsp;
                      </span>
                      <span data-contrast="none">Game</span>
                      <span data-contrast="none">
                        &nbsp;and that provides the entrant an advantage in such
                        a&nbsp;
                      </span>
                      <span data-contrast="none">Contest</span>
                      <span data-contrast="none">
                        , including any information from any daily fantasy sport
                        site or information from a sports governing body (e.g.,
                        pre-release injury information) (&ldquo;Pre-Release
                        Data&rdquo;);
                      </span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="1"
                      data-aria-posinset="2"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        An employee of a sponsor, consul
                      </span>
                      <span data-contrast="none">
                        tant, or supplier of&nbsp;
                      </span>
                      <span data-contrast="none">PowerPlay Systems</span>
                      <span data-contrast="none">
                        &nbsp;or any other daily fantasy sports&nbsp;
                      </span>
                      <span data-contrast="none">game</span>
                      <span data-contrast="none">
                        &nbsp;provider that has access to Pre-Release Data or
                        otherwise receives an advantage in the entrant&rsquo;s
                        participation in a&nbsp;
                      </span>
                      <span data-contrast="none">Contest</span>
                      <span data-contrast="none">;</span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="1"
                      data-aria-posinset="3"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        An employee, operator or consultant to a sports
                        governing body where such employee, operator or
                        consultant is prohibited from participating in
                        applicable&nbsp;
                      </span>
                      <span data-contrast="none">Contests</span>
                      <span data-contrast="none">
                        &nbsp;by such governing body;
                      </span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="1"
                      data-aria-posinset="4"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">PowerPlay Systems</span>
                      <span data-contrast="none">
                        &nbsp;employees may use the Service for the purpose of
                        testing the user&nbsp;
                      </span>
                      <span data-contrast="none">experience but</span>
                      <span data-contrast="none">
                        &nbsp;may not withdraw money or prizes
                      </span>
                      <span data-contrast="none">.</span>
                      <span data-contrast="none">&nbsp;</span>
                      <span data-ccp-props='{"134233279":true,"201341983":0,"335559739":225,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="1"
                      data-aria-posinset="5"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">Relatives of&nbsp;</span>
                      <span data-contrast="none">PowerPlay Systems</span>
                      <span data-contrast="none">
                        &nbsp;employees with whom they share a household are not
                        eligible to participate in
                      </span>
                      <span data-contrast="none">&nbsp;</span>
                      <span data-contrast="none">Contests</span>
                      <span data-contrast="none">.&nbsp;</span>
                      <span data-ccp-props='{"134233279":true,"201341983":0,"335559739":225,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                  </ul>
                  <ul>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="1"
                      data-aria-posinset="1"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">PowerPlay Systems</span>
                      <span data-contrast="none">
                        &nbsp;consultants or promoters of the Service may play
                        in&nbsp;
                      </span>
                      <span data-contrast="none">Contests</span>
                      <span data-contrast="none">
                        &nbsp;without such limitation, but only if (
                      </span>
                      <span data-contrast="none">i</span>
                      <span data-contrast="none">
                        ) their arrangement with&nbsp;
                      </span>
                      <span data-contrast="none">PowerPlay Systems</span>
                      <span data-contrast="none">
                        &nbsp;does not permit them to have any access to
                        non-public Service data or any other data not made
                        available to all players on the Service and (ii) they do
                        not receive any other advantages in their play on the
                        Service.
                      </span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"134233279":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="1"
                      data-aria-posinset="2"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        Breaches any rules or policies of the entrant&rsquo;s
                        employer, of any sports governing body, or any other
                        professional body of which the entrant is a member,
                        including any rule or policy regarding participation
                        in&nbsp;
                      </span>
                      <span data-contrast="none">Contests</span>
                      <span data-contrast="none">
                        &nbsp;or accepting prize money;
                      </span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"134233279":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="1"
                      data-aria-posinset="3"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        Any person prohibited from participating pursuant to
                        court order;
                      </span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="1"
                      data-aria-posinset="4"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        Any entrant who has knowingly received Pre-Release Data
                        or any other non-public information that provides an
                        advantage in a&nbsp;
                      </span>
                      <span data-contrast="none">Contest</span>
                      <span data-contrast="none">
                        &nbsp;from any person who is prohibited from entering
                        a&nbsp;
                      </span>
                      <span data-contrast="none">Contest</span>
                      <span data-contrast="none">
                        &nbsp;as provided in these Terms.
                      </span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                  </ul>
                  <p>
                    <span data-contrast="none">
                      In addition, conduct that would be deemed improper also
                      includes, but is not limited to:
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <ul>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="2"
                      data-aria-posinset="1"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        Falsifying personal information required to enter
                        a&nbsp;
                      </span>
                      <span data-contrast="none">Contest</span>
                      <span data-contrast="none">&nbsp;or claim a prize;</span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="2"
                      data-aria-posinset="2"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        Engaging in any type of financial fraud including
                        unauthorized use of credit instruments to enter a&nbsp;
                      </span>
                      <span data-contrast="none">Contest</span>
                      <span data-contrast="none">&nbsp;or claim a prize;</span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="2"
                      data-aria-posinset="3"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        Colluding with any other individual(s) or engaging in
                        any type of syndicate play;
                      </span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="2"
                      data-aria-posinset="4"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">Any violation of&nbsp;</span>
                      <span data-contrast="none">Contest</span>
                      <span data-contrast="none">
                        &nbsp;rules or the Terms of Use;
                      </span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="2"
                      data-aria-posinset="5"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">Using a single&nbsp;</span>
                      <span data-contrast="none">Account</span>
                      <span data-contrast="none">
                        &nbsp;to participate in a&nbsp;
                      </span>
                      <span data-contrast="none">Contest</span>
                      <span data-contrast="none">
                        &nbsp;on behalf of multiple entrants or otherwise
                        collaborating with others to participate in any&nbsp;
                      </span>
                      <span data-contrast="none">Contest</span>
                      <span data-contrast="none">;</span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                  </ul>
                  <ul>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="2"
                      data-aria-posinset="1"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        Using automated means (including but not limited to
                        scripts and third-party tools) to interact with the
                        Website in any way (this includes, but is not limited
                        to: creating a&nbsp;
                      </span>
                      <span data-contrast="none">Contest</span>
                      <span data-contrast="none">, entering a&nbsp;</span>
                      <span data-contrast="none">Contest</span>
                      <span data-contrast="none">
                        , withdrawing from a&nbsp;
                      </span>
                      <span data-contrast="none">Contest</span>
                      <span data-contrast="none">,&nbsp;</span>
                      <span data-contrast="none">selecting teams</span>
                      <span data-contrast="none">, and editing a&nbsp;</span>
                      <span data-contrast="none">teams</span>
                      <span data-contrast="none">);</span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="2"
                      data-aria-posinset="2"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        Using automated means (including but not limited to
                        harvesting bots, robots, parser, spiders or screen
                        scrapers) to obtain, collect or access any information
                        on the Website or of any User for any purpose.
                      </span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="2"
                      data-aria-posinset="3"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        Any type of bonus abuse, abuse of the refer-a-friend
                        program, or abuse of any other&nbsp;
                      </span>
                      <span data-contrast="none">Offers</span>
                      <span data-contrast="none">&nbsp;or promotions;</span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="2"
                      data-aria-posinset="4"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        Tampering with the administration of a&nbsp;
                      </span>
                      <span data-contrast="none">Contest</span>
                      <span data-contrast="none">
                        &nbsp;or trying to in any way tamper with the computer
                        programs or any security measure associated with a&nbsp;
                      </span>
                      <span data-contrast="none">Contest</span>
                      <span data-contrast="none">;</span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="2"
                      data-aria-posinset="5"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        Obtaining other entrants information and spamming other
                        entrants; or
                      </span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                  </ul>
                  <ul>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="2"
                      data-aria-posinset="1"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        Abusing the Website in any way.
                      </span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                  </ul>
                  <p>
                    <span data-contrast="none">
                      Users further acknowledge that the forfeiture and/or
                      return of any prize shall in no way prevent&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;from pursuing criminal or civil proceedings in
                      connection with such conduct.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">By entering into a&nbsp;</span>
                    <span data-contrast="none">Contest</span>
                    <span data-contrast="none">
                      &nbsp;or accepting any prize, entrants, including but not
                      limited to the winner(s), agree to indemnify, release and
                      to hold harmless&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      , its parents, subsidiaries, affiliates and agents, as
                      well as the officers, directors, employees, shareholders
                      and representatives of any of the foregoing entities
                      (collectively, the "Released Parties"), from any and all
                      liability, claims or actions of any kind whatsoever,
                      including but not limited to injuries, damages, or losses
                      to persons and property which may be sustained in
                      connection with participation in the&nbsp;
                    </span>
                    <span data-contrast="none">Contest</span>
                    <span data-contrast="none">
                      , the receipt, ownership, use or misuse of any prize or
                      while preparing for, participating in and/or travelling to
                      or from any prize related activity, as well as any claims
                      based on publicity rights, defamation, or invasion of
                      privacy.&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;may, in its sole and absolute discretion, require an
                      Authorized&nbsp;
                    </span>
                    <span data-contrast="none">Account</span>
                    <span data-contrast="none">
                      &nbsp;Holder to execute a separate release of claims
                      similar to the one listed above in this Paragraph as a
                      condition of being awarded any prize or receiving any
                      payout.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;is not responsible for: any incorrect, invalid or
                      inaccurate entry information; human errors; postal
                      delays/postage due mail; technical malfunctions; failures,
                      including public utility or telephone outages; omissions,
                      interruptions, deletions or defects of any telephone
                      system or network, computer online systems, data, computer
                      equipment, servers, providers, or software (including, but
                      not limited to software and operating systems that do not
                      permit an entrant to participate in a&nbsp;
                    </span>
                    <span data-contrast="none">Contest</span>
                    <span data-contrast="none">
                      ), including without limitation any injury or damage to
                      any entrant's or any other person's computer or video
                      equipment relating to or resulting from participation in
                      a&nbsp;
                    </span>
                    <span data-contrast="none">Contest</span>
                    <span data-contrast="none">
                      ; inability to access the Website, or any web pages that
                      are part of or related to the Website; theft, tampering,
                      destruction, or unauthorized access to, or alteration of,
                      entries and/or images of any kind; data that is processed
                      late or incorrectly or is incomplete or lost due to
                      telephone, postal issues, computer or electronic
                      malfunction or traffic congestion on telephone lines or
                      transmission systems, or the Internet, or any service
                      provider's facilities, or any phone site or website or for
                      any other reason whatsoever; typographical, printing or
                      other errors, or any combination thereof.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;is not responsible for incomplete, illegible,
                      misdirected or stolen entries. If for any reason a&nbsp;
                    </span>
                    <span data-contrast="none">Contest</span>
                    <span data-contrast="none">
                      &nbsp;is not capable of running as originally planned, or
                      if a&nbsp;
                    </span>
                    <span data-contrast="none">Contest</span>
                    <span data-contrast="none">,&nbsp;</span>
                    <span data-contrast="none">
                      computer application, or website associated therewith (or
                      any portion thereof) becomes corrupted or does not allow
                      the proper entry to a&nbsp;
                    </span>
                    <span data-contrast="none">Contest</span>
                    <span data-contrast="none">
                      &nbsp;in accordance with the Terms of Use or
                      applicable&nbsp;
                    </span>
                    <span data-contrast="none">Contest</span>
                    <span data-contrast="none">
                      &nbsp;rules, or if infection by a computer (or similar)
                      virus, bug, tampering, unauthorized intervention, actions
                      by entrants, fraud, technical failures, or any other
                      causes of any kind, in the sole opinion of&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;corrupts or affects the administration, security,
                      fairness, integrity, or proper conduct of a&nbsp;
                    </span>
                    <span data-contrast="none">Contest</span>
                    <span data-contrast="none">,&nbsp;</span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">&nbsp;</span>
                    <span data-contrast="none">
                      reserves the right, at its sole discretion, to disqualify
                      any individual implicated in such action and/or to cancel,
                      terminate, extend, modify or suspend the&nbsp;
                    </span>
                    <span data-contrast="none">Contest</span>
                    <span data-contrast="none">
                      , and select the winner(s) from all eligible entries
                      received. If such cancellation, termination, modification
                      or suspension occurs, notification will be posted on the
                      Website.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      ANY ATTEMPT BY AN ENTRANT OR ANY OTHER INDIVIDUAL TO
                      DELIBERATELY DAMAGE THE WEBSITE OR UNDERMINE THE
                      LEGITIMATE OPERATION OF ANY&nbsp;
                    </span>
                    <span data-contrast="none">CONTEST</span>
                    <span data-contrast="none">
                      &nbsp;IS A VIOLATION OF CRIMINAL AND/OR CIVIL LAWS AND
                      SHOULD SUCH AN ATTEMPT BE&nbsp;
                    </span>
                    <span data-contrast="none">MADE</span>
                    <span data-contrast="none">&nbsp;</span>
                    <span data-contrast="none">POWERPLAY SYSTEMS</span>
                    <span data-contrast="none">
                      &nbsp;RESERVES THE RIGHT TO SEEK DAMAGES AND OTHER
                      REMEDIES FROM ANY SUCH PERSON TO THE FULLEST EXTENT
                      PERMITTED BY LAW.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      All entries become the property of&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;and will not be acknowledged or returned.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        To be eligible to enter any&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;or receive any prize, the Authorized&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;Holder may be required to provide&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;with additional documentation and/or information
                        to verify the identity of the Authorized&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;Holder, and to provide proof that all
                        eligibility&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        requirements are met. In the event of a dispute as to
                        the identity or eligibility of an Authorized&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;Holder,&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;will, in its sole and absolute discretion, utilize
                        certain information collected by&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;to assist in verifying the identity and/or
                        eligibility of such Authorized&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;Holder.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Participation in each&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;must be made only as specified in the Terms of
                        Use. Failure to comply with these Terms of Use will
                        result in disqualification and, if applicable, prize
                        forfeiture.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Where legal, both entrants and&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        winners&rsquo;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;consent to the use of their name, voice, and
                        likeness/photograph in and in connection with the
                        development, production, distribution and/or
                        exploitation of any&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;or the Website. Winners agree that from the date
                        of notification by&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;of their status as a potential winner and
                        continuing until such time when&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;informs them that they no longer need to do so
                        that they will make themselves available to&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;for publicity, advertising, and promotion
                        activities.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;reserves the right to move entrants from the&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contests</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;they have entered to substantially similar&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contests</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;in certain situations determined by&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;in its sole discretion.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">Using the&nbsp;</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">Defy Games</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">&nbsp;</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">Website</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Strong">
                          Service Changes and Limitations:
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        The Service is evolving and&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">w</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        e may require that you accept updates to the Service as
                        well as to the Terms, 
                      </span>
                    </span>
                    <a href="http://company.zynga.com/legal/community-rules">
                      <span data-contrast="none">
                        <span data-ccp-parastyle="Normal (Web)">
                          Community Rules
                        </span>
                      </span>
                    </a>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , and the&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)"> </span>
                    </span>
                    <a href="http://company.zynga.com/privacy/policy">
                      <span data-contrast="none">
                        <span data-ccp-parastyle="Normal (Web)">
                          Privacy Policy
                        </span>
                      </span>
                    </a>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        . From time to time
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">,</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;we may&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        make you&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        update the&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;or your software to continue to use&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">o</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">ur&nbsp;</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Services</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        . We may perform these updates remotely including
                        to&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        the Defy Games
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;software residing on your computer or mobile
                        device, without notifying you.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;reserves the right to stop offering and/or
                        supporting the Service or a particular&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;or part of the Service at any time either
                        permanently or temporarily, at which point your&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">right</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;to use the Service or any part of it will be
                        automatically terminated or suspended. If that
                        happens,&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;is not required to provide refunds, benefits or
                        other compensation to players in connection with
                        discontinued elements of the Service or for virtual
                        goods previously earned or purchased.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        POWERPLAY SYSTEMS
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;MAY, IN ITS SOLE DISCRETION LIMIT, SUSPEND,
                        TERMINATE, MODIFY, OR DELETE&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">ACCOUNT</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        S OR ACCESS TO THE SERVICE OR ANY PORTION OF IT AND
                        PROHIBIT ACCESS TO OUR&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">CONTESTS</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;AND SITES, AND THEIR CONTENT, SERVICES AND TOOLS,
                        DELAY OR REMOVE HOSTED CONTENT AND&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        POWERPLAY SYSTEMS
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;IS UNDER NO OBLIGATION TO COMPENSATE YOU FOR ANY
                        SUCH LOSSES OR RESULTS.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":270,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Strong">
                          Deleting your&nbsp;
                        </span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Strong">Account</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Strong">:</span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        You may stop using the Service at any time by&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        closing your&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;on the Player Admin page
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">.</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)"> </span>
                    </span>
                    <strong>
                      <em>
                        <span data-contrast="none">
                          <span data-ccp-charstyle="Strong">
                            Unless the local law where you are located requires
                            otherwise,
                          </span>
                        </span>
                      </em>
                    </strong>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)"> </span>
                    </span>
                    <strong>
                      <em>
                        <span data-contrast="none">
                          <span data-ccp-charstyle="Strong">we</span>
                        </span>
                      </em>
                    </strong>
                    <strong>
                      <em>
                        <span data-contrast="none">
                          <span data-ccp-charstyle="Strong">
                            &nbsp;are not required to provide refunds,&nbsp;
                          </span>
                        </span>
                      </em>
                    </strong>
                    <strong>
                      <em>
                        <span data-contrast="none">
                          <span data-ccp-charstyle="Strong">benefits,</span>
                        </span>
                      </em>
                    </strong>
                    <strong>
                      <em>
                        <span data-contrast="none">
                          <span data-ccp-charstyle="Strong">
                            &nbsp;or other compensation if you request deletion
                            of your&nbsp;
                          </span>
                        </span>
                      </em>
                    </strong>
                    <strong>
                      <em>
                        <span data-contrast="none">
                          <span data-ccp-charstyle="Strong">Account</span>
                        </span>
                      </em>
                    </strong>
                    <strong>
                      <em>
                        <span data-contrast="none">
                          <span data-ccp-charstyle="Strong">.</span>
                        </span>
                      </em>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        WE MAY DELETE OR TERMINATE ACCOUNTS THAT ARE INACTIVE (
                      </span>
                    </span>
                    <em>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="Normal (Web)">I.E.</span>
                      </span>
                    </em>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , NOT LOGGED INTO) FOR 180 DAYS.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        IF YOU WANT US TO DELETE YOUR ACCOUNT, YOU CAN GO 
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">HERE</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                         AND CLICK DELETE ACCOUNT.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Strong">Your&nbsp;</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Strong">Account</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Strong">&nbsp;and&nbsp;</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Strong">Powers</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Strong">:</span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Regardless of what anything else says in these&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Terms or</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;any other&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Terms</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;that apply to features you may choose to&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">use;</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;you do not own the&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;that you create on&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">o</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">ur&nbsp;</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">s</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">ervice</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">&nbsp;</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        and your&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;is not your property. This also applies to
                        other&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        services or items
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , like&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Powers</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , regardless of whether you &ldquo;earned&rdquo;&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Powers</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;in a&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;or &ldquo;purchased&rdquo; them. Your&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;and any&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Powers</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;are owned by&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">.&nbsp;</span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        You are not allowed to transfer&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Powers</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;outside of the Service (i.e., in the &ldquo;real
                        world&rdquo;), for example by selling, gifting, or
                        trading them. We won&rsquo;t recognize those transfers
                        as legitimate. You are not allowed to sublicense, trade,
                        sell or attempt to sell&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Powers</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;for "real" money, or exchange&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Powers</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;for value of any kind outside of a&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        . Any such transfer or attempted transf
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        er is prohibited and void, and w
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        e may terminate your&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;because of it.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Strong">
                          ALL SALES ARE FINAL:
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        YOU ACKNOWLEDGE THAT&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        POWERPLAY SYSTEMS
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;IS NOT REQUIRED TO PROVIDE A REFUND FOR ANY
                        REASON, AND THAT YOU WILL NOT RECEIVE MONEY OR OTHER
                        COMPENSATION FOR UNUSED&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">POWERS</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;WHEN AN&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">ACCOUNT</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;IS CLOSED, WHETHER SUCH CLOSURE WAS VOLUNTARY OR
                        INVOLUNTARY, OR WHETHER YOU MADE A PAYMENT THROUGH&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        DEFYGAMES.IO
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;OR ANOTHER PLATFORM SUCH AS APPLE,&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        GOOGLE, FACEBOOK, OR ANY OTHER SITES OR PLATFORMS WHERE
                        WE OFFER OUR SERVICES.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Strong">
                          PURCHASES OR REDEMPTIONS OF THIRD PARTY VIRTUAL
                          CURRENCY TO ACQUIRE A LICENSE TO USE VIRTUAL ITEMS ARE
                          NON-REFUNDABLE TO THE FULLEST EXTENT ALLOWED BY LAW.
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        If you purchase third party currency or choose to make a
                        payment in our Services through a third party (like
                        Facebook, Apple, or Google), you are agreeing to the
                        third party&rsquo;s payment terms, and&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;is not a party to the transaction.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Strong">
                          Additional Payment Terms:
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        You agree to pay all fees and applicable taxes incurred
                        by you or anyone using an&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;registered to you.&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;may revise the pricing for the goods and&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Services</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;it licenses to you through the Service at any
                        time.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Strong">
                          Billing Support:
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">Email: Support@</span>
                    <span data-contrast="none">powerplaysystems</span>
                    <span data-contrast="none">.com</span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 2">
                          CONTEST PRIZES AND PROMOTIONS
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Prizes will only be awarded if a Contest is&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">run</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        . We reserve the right to cancel Contests at any time.
                        In the event of a cancellation, all entry fees will be
                        refunded to the customer except as specifically provided
                        in these Terms of Use.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Guaranteed prizes are offered in connection with some of
                        the Contests offered by the Website. Each Contest or
                        promotion is governed by its own set of official rules.
                        We encourage you to read such Contest and promotions
                        Rules before participating.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">OTHER LEGAL RESTRICTIONS</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">CONTEST</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">&nbsp;OF SKILL</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">Contests</span>
                    <span data-contrast="none">
                      &nbsp;offered on the Website are&nbsp;
                    </span>
                    <span data-contrast="none">Contests</span>
                    <span data-contrast="none">
                      &nbsp;of skill. Winners are determined by the objective
                      criteria described in the&nbsp;
                    </span>
                    <span data-contrast="none">Contest</span>
                    <span data-contrast="none">
                      &nbsp;deadline, Rules, scoring, and any other applicable
                      documentation associated with the&nbsp;
                    </span>
                    <span data-contrast="none">Contest</span>
                    <span data-contrast="none">
                      . From all entries received for each&nbsp;
                    </span>
                    <span data-contrast="none">Contest</span>
                    <span data-contrast="none">
                      , winners are determined by the individuals who use their
                      skill and knowledge of relevant sports information and
                      fantasy sports rules to accumulate the most points
                      according to the corresponding scoring rules. The Website
                      and&nbsp;
                    </span>
                    <span data-contrast="none">Contests</span>
                    <span data-contrast="none">
                      &nbsp;may not be used for any form of illicit gambling.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 2">
                          CONTEST STATISTICS AND LIVE SCORING
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Our games are based on
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;'live' statistics during gameplay
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">.&nbsp;</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">While&nbsp;</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;and the third parties used to provide the D
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">efy Games</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;Services use reasonable efforts to include
                        accurate and up-to-date information, neither&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;nor its&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">third-party</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;providers warrant or make any representations of
                        any kind with respect to the information provided
                        through the
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;Defy Games
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;Website and related information sources.&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;and its&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">third-party</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;providers shall not be responsible or liable for
                        the accuracy, usefulness, or availability of any
                        information transmitted or made available via the D
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">efy Games</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;Website and related information sources, and shall
                        not be responsible or liable for any error or omissions
                        in that information.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">IDENTITY DISPUTES</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        In the event of a dispute regarding the identity of the
                        person submitting an entry, the entry will be deemed
                        submitted by the person in whose Username the entry was
                        submitted, or if possession of the Username itself
                        is&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">game</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        d and in&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">&rsquo;</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;opinion sufficiently uncertain, the name in which
                        the email address on file was registered with the email
                        service provider.&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;reserves the right not to award a prize to an
                        individual it believes in its sole discretion did not
                        submit the winning entry.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">CONTEST</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">&nbsp;RESULTS</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;results and prize calculations are based on the
                        final&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        points accumulated by each participant&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        at the completion of the last professional sports&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">c</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">ontest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;of each individual&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        . Once&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;results are reviewed and graded, prizes are
                        awarded. The scoring results of a&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;will not be changed regardless of any official
                        statistics or scoring adjustments made by the leagues at
                        later times or dates, except in&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        ' sole discretion.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">PRIZES</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        At the conclusion of each&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , prizes will be awarded by&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">5</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">:00&nbsp;</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">PM&nbsp;</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        EST on the following day except in circumstances where
                        technical failure, inability of&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        to verify your compliance with these Terms, or other
                        reasons prevent such timely payout.&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;prizes are listed in our prize table list. Prizes
                        won are added to the winning participants&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;balance. In the event of a tie, prizes are divided
                        evenly amongst the participants that have tied.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">PRIZE TABLES</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;prize payouts will be published with the creation
                        of each new&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">.&nbsp;</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;reserves the right, in its sole discretion, to
                        cancel or suspend the&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contests</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;(or any portion thereof) should virus, bugs,
                        unauthorized human intervention, or other causes corrupt
                        administration, security, fairness, integrity or proper
                        operation of the&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;(or any portion thereof) warrant doing so.
                        Notification of such changes may be provided by&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;to its customers but will not be required.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        PAYMENT AND WITHDRAWAL OF PRIZES
                      </span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Winners are posted on the Website.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Before making any payment,&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;may require that an entrant complete and execute
                        an affidavit of eligibility in which, among other
                        things, the entrant is required to represent and warrant
                        that the entrant is eligible to participate in a&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , is otherwise in compliance with this Agreement and,
                        potentially, is required to provide documentation or
                        proof of eligibility and compliance. If&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;requests that an entrant completes and executes
                        such an affidavit and the entrant fails to do so within
                        seven (7) days, or&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;otherwise determines that the entrant does not
                        meet the eligibility requirements or is not in
                        compliance with these Terms,&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;reserves the right to terminate the
                        entrant&rsquo;s&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;and withhold or revoke the awarding of any prizes
                        associated with such&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        . In such a situation,&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;may pay out any withheld or revoked prizes to the
                        other entrants in the relevant&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;in a manner consistent with the Rules of the&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">.</span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Entrants may withdraw their cash prize awards as well as
                        cash deposits by using the "Withdrawal" option on
                        the&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        My Account pages of the&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Website. Entrants may be requested to complete an
                        affidavit of eligibility and a liability/publicity
                        release (unless prohibited by law)&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        and/or appropriate tax forms and forms of identification
                        including but not limited to a Driver's License, Proof
                        of Residence, and/or any information relating to
                        payment/deposit&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        s as reasonably requested by&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;in order to complete the withdrawal of prizes.
                        Failure to comply with this requirement may result in
                        disqualification and forfeiture of any prizes.
                        Disqualification or forfeiture of any prizes may also
                        occur if it is determined any such entrant did not
                        comply with these Terms of Use in any manner.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        If you are an entrant residing in Missouri, you can
                        withdraw the funds maintained in your individual&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , whether such&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;is open or closed, within five (5) business days
                        of the request being made, unless&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;believes in good faith that the you engaged in
                        either fraudulent conduct or other conduct that would
                        put&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;in violation of sections 313.900 to
                        313.1020,&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">RSMo</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , in which case&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;may decline to honor the request for withdrawal
                        for a reasonable investigatory period until its
                        investigation is resolved if it provides notice of the
                        nature of the investigation to you. For the purposes of
                        this provision, a request for withdrawal will be
                        considered honored if it is processed by&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;but delayed by a payment processor, credit card
                        issuer, or by the custodian of a financial&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">.</span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Che</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">ques</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;for withdrawal requests are processed within 14
                        business days, and are sent&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">via Canada</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">&nbsp;Post</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">.&nbsp;</span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        All taxes associated with the receipt of any prize are
                        the sole responsibility of the winner. In the event that
                        the awarding of any prizes to winners of&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contests</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;is challenged by any legal authority,&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;reserves the right in its sole discretion to
                        determine whether or not to award such prizes.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        No substitution or transfer of prize is permitted,
                        except that&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;reserves the right to substitute a prize of equal
                        value or greater if the advertised prize is unavailable.
                        All prizes are awarded "as is" and without warranty of
                        any kind, express or implied (including, without
                        limitation, any implied warranty of merchantability for
                        a particular purpose).
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Any withdrawal requests, after approved by&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , will be&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        issued via e-transfer, wire, PayPal, or cheque
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">.&nbsp;</span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Each year all winners who have won $600 or more over the
                        previous year must provide updated address and social
                        security details to&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        . These details will be used to allow&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;to comply with tax regulations and may be shared
                        with appropriate tax authorities. You, not&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , are responsible for filing and paying applicable&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">S</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">tate</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;or Province
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;and federal taxes on any winnings.&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;does not provide tax advice, nor should any
                        statements in this agreement or on the Service be
                        construed as tax advice.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        TERMINATION AND EFFECT OF TERMINATION
                      </span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        In addition to any other legal or equitable
                        remedy,&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;may, without prior notice, immediately revoke any
                        or all of your rights granted hereunder. In such event,
                        you will immediately cease all access to and use
                        of&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">the Website</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">.&nbsp;</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;may revoke any password(s) and/or&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;identification issued to you and deny you access
                        to and use of the Website. Any such action shall not
                        affect any rights and obligations arising prior thereto.
                        All provisions of the Terms of Use which by their nature
                        should survive termination shall survive termination,
                        including, without limitation, ownership provisions,
                        warranty disclaimers, indemnity and limitations of
                        liability.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">DISCLAIMER OF WARRANTIES</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      THE WEBSITE, INCLUDING, WITHOUT LIMITATION, ALL CONTENT,
                      SOFTWARE, AND FUNCTIONS MADE AVAILABLE ON OR ACCESSED
                      THROUGH OR SENT FROM THE WEBSITE, ARE PROVIDED "AS IS,"
                      "AS AVAILABLE," AND "WITH ALL FAULTS." TO THE FULLEST
                      EXTENT PERMISSIBLE BY LAW, THE COMPANY AND ITS PARENTS,
                      SUBSIDIARIES AND AFFILIATES MAKE NO REPRESENTATION OR
                      WARRANTIES OR ENDORSEMENTS OF ANY KIND WHATSOEVER (EXPRESS
                      OR IMPLIED) ABOUT: (A) THE WEBSITE; (B) THE CONTENT AND
                      SOFTWARE ON AND PROVIDED THROUGH THE WEBSITE; (C) THE
                      FUNCTIONS MADE ACCESSIBLE ON OR ACCESSED THROUGH THE
                      WEBSITE; (D) THE MESSAGES AND INFORMATION SENT FROM THE
                      WEBSITE BY USERS; (E) ANY PRODUCTS OR SERVICES OFFERED VIA
                      THE WEBSITE OR HYPERTEXT LINKS TO THIRD PARTIES; AND/OR
                      (F) SECURITY ASSOCIATED WITH THE TRANSMISSION OF SENSITIVE
                      INFORMATION THROUGH THE WEBSITE OR ANY LINKED SITE. THE
                      COMPANY DOES NOT WARRANT THAT THE WEBSITE, ANY OF THE
                      WEBSITES' FUNCTIONS OR ANY CONTENT CONTAINED THEREIN WILL
                      BE UNINTERRUPTED OR ERROR-FREE; THAT DEFECTS WILL BE
                      CORRECTED; OR THAT THE WEBSITES OR THE SERVERS THAT MAKES
                      THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL
                      COMPONENTS.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      THE COMPANY DOES NOT WARRANT THAT YOUR ACTIVITIES OR USE
                      OF THE WEBSITE IS LAWFUL IN ANY PARTICULAR JURISDICTION
                      AND, IN ANY EVENT, THE COMPANY SPECIFICALLY DISCLAIMS SUCH
                      WARRANTIES. YOU UNDERSTAND THAT BY USING ANY OF THE
                      FEATURES OF THE WEBSITE, YOU ACT AT YOUR OWN RISK, AND YOU
                      REPRESENT AND WARRANT THAT YOUR ACTIVITIES ARE LAWFUL IN
                      EVERY JURISDICTION WHERE YOU ACCESS OR USE THE WEBSITE OR
                      THE CONTENT. FURTHER, THE COMPANY AND ITS PARENTS,
                      SUBSIDIARIES AND AFFILIATES DISCLAIM ANY EXPRESS OR
                      IMPLIED WARRANTIES INCLUDING, WITHOUT LIMITATION,
                      NONINFRINGEMENT, MERCHANTABILITY, FITNESS FOR A PARTICULAR
                      PURPOSE, AND TITLE.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      THE COMPANY, ITS PARENTS, SUBSIDIARIES AND AFFILIATES, AND
                      THE DIRECTORS, OFFICERS, EMPLOYEES, AND OTHER
                      REPRESENTATIVES OF EACH OF THEM, SHALL NOT BE LIABLE FOR
                      THE USE OF THE WEBSITE INCLUDING, WITHOUT LIMITATION, THE
                      CONTENT AND ANY ERRORS CONTAINED THEREIN. SOME
                      JURISDICTIONS LIMIT OR DO NOT ALLOW THE DISCLAIMER OF
                      IMPLIED OR OTHER WARRANTIES SO THE ABOVE DISCLAIMER MAY
                      NOT APPLY TO THE EXTENT SUCH JURISDICTION'S LAW IS
                      APPLICABLE TO THIS AGREEMENT.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">LIMITATION OF LIABILITY</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      YOU UNDERSTAND AND AGREE THAT THE COMPANY LIMITS ITS
                      LIABILITY IN CONNECTION WITH YOUR USE OF THE WEBSITE AS
                      SET FORTH BELOW: UNDER NO
                    </span>
                    <span data-contrast="none">
                      &nbsp;CIRCUMSTANCES SHALL&nbsp;
                    </span>
                    <span data-contrast="none">POWERPLAY SYSTEMS</span>
                    <span data-contrast="none">
                      , ITS PARENTS, SUBSIDIARIES, OR AFFILIATES, OR THE
                      DIRECTORS, OFFICERS, EMPLOYEES, OR OTHER REPRESENTATIVES
                      OF EACH OF THEM (COLLECTIVELY, THE "COMPANY ENTITIES AND
                      INDIVIDUALS"), BE LIABLE TO YOU FOR ANY LOSS OR DAMAGES OF
                      ANY KIND (INCLUDING, WITHOUT LIMITATION, FOR ANY SPECIAL,
                      DIRECT, INDIRECT, INCIDENTAL, EXEMPLARY, ECONOMIC,
                      PUNITIVE, OR CONSEQUENTIAL DAMAGES) THAT ARE DIRECTLY OR
                      INDIRECTLY RELATED TO (1) THE WEBSITE, THE CONTENT, OR
                      YOUR UPLOAD INFORMATION; (2) THE USE OF, INABILITY TO USE,
                      OR PERFORMANCE OF THE WEBSITE; (3) ANY ACTION TAKEN IN
                      CONNECTION WITH AN INVESTIGATION BY THE COMPANY OR LAW
                      ENFORCEMENT AUTHORITIES REGARDING YOUR USE OF THE WEBSITE
                      OR CONTENT;(4) ANY ACTION TAKEN IN&nbsp;
                    </span>
                    <span data-contrast="none">
                      CONNECTION WITH COPYRIGHT OWNERS; OR (5) ANY ERRORS OR
                      OMISSIONS IN THE WEBSITE'S TECHNICAL OPERATION, EVEN IF
                      FORESEEABLE OR EVEN IF THE COMPANY ENTITIES AND
                      INDIVIDUALS HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
                      DAMAGES WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE,
                      STRICT LIABILITY TORT (INCLUDING, WITHOUT LIMITATION,
                      WHETHER CAUSED IN WHOLE OR IN PART BY NEGLIGENCE, ACTS OF
                      GOD, TELECOMMUNICATIONS FAILURE, OR THEFT OR DESTRUCTION
                      OF THE WEBSITE). IN NO EVENT WILL THE COMPANY ENTITIES AND
                      INDIVIDUALS BE LIABLE TO YOU OR ANYONE ELSE FOR LOSS OR
                      INJURY, INCLUDING, WITHOUT LIMITATION, DEATH OR PERSONAL
                      INJURY. SOME STATES DO NOT ALLOW THE EXCLUSION OR
                      LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE
                      ABOVE LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU. IN NO
                      EVENT SHALL THE COMPANY ENTITIES AND INDIVIDUALS TOTAL
                      LIABILITY TO YOU FOR ALL DAMAGES, LOSSES, OR CAUSES OF
                      ACTION EXCEED ONE HUNDRED DOLLARS ($100). THE COMPANY
                      ENTITIES AND INDIVIDUALS ARE NOT RESPONSIBLE FOR ANY
                      DAMAGE TO ANY USER'S COMPUTER, HARDWARE, COMPUTER
                      SOFTWARE, OR OTHER EQUIPMENT OR TECHNOLOGY INCLUDING,
                      WITHOUT LIMITATION, DAMAGE FROM ANY SECURITY BREACH OR
                      FROM ANY VIRUS, BUGS, TAMPERING, FRAUD, ERROR, OMISSION,
                      INTERRUPTION, DEFECT, DELAY IN OPERATION OR TRANSMISSION,
                      COMPUTER LINE OR NETWORK FAILURE OR ANY OTHER TECHNICAL OR
                      OTHER MALFUNCTION. YOUR ACCESS TO AND USE OF THIS WEBSITE
                      IS AT YOUR RISK. IF YOU ARE DISSATISFIED WITH THE WEBSITE
                      OR ANY OF THE CONTENT, YOUR SOLE AND EXCLUSIVE REMEDY IS
                      TO DISCONTINUE ACCESSING AND USING THE WEBSITE OR THE
                      CONTENT. YOU RECOGNIZE AND CONFIRM THAT IN THE EVENT YOU
                      INCUR ANY DAMAGES, LOSSES OR INJURIES THAT ARISE OUT OF
                      THE COMPANY'S ACTS OR OMISSIONS, THE DAMAGES, IF ANY,
                      CAUSED TO YOU ARE NOT IRREPARABLE OR SUFFICIENT TO ENTITLE
                      YOU TO AN INJUNCTION PREVENTING ANY EXPLOITATION OF ANY
                      WEBSITE OR OTHER PROPERTY OWNED OR CONTROLLED BY THE
                      COMPANY AND/OR ITS PARENTS, SUBSIDIARIES, AND/OR
                      AFFILIATES OR YOUR UPLOAD INFORMATION, AND YOU WILL HAVE
                      NO RIGHTS TO ENJOIN OR RESTRAIN THE DEVELOPMENT,
                      PRODUCTION, DISTRIBUTION, ADVERTISING, EXHIBITION OR
                      EXPLOITATION OF ANY COMPANY WEBSITE OR OTHER PROPERTY OR
                      YOUR UPLOAD INFORMATION OR ANY AND ALL ACTIVITIES OR
                      ACTIONS RELATED THERETO. BY ACCESSING THE WEBSITE, YOU
                      UNDERSTAND THAT YOU MAY BE WAIVING RIGHTS WITH RESPECT TO
                      CLAIMS THAT ARE AT THIS TIME UNKNOWN OR UNSUSPECTED.
                      ACCORDINGLY, YOU AGREE TO WAIVE THE BENEFIT OF ANY LAW,
                      INCLUDING, TO THE EXTENT APPLICABLE, CALIFORNIA CIVIL CODE
                      SECTION 1542, THAT OTHERWISE MIGHT LIMIT YOUR WAIVER OF
                      SUCH CLAIMS.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        INTELLECTUAL PROPERTY RIGHTS
                      </span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        The content on the Website, including without
                        limitation, the text, software, scripts, graphics,
                        photos, sounds, music, videos, interactive features and
                        the like and the trademarks, service marks and logos
                        contained therein (the "Intellectual Property"), are
                        owned&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">by,</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;or licensed to&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , subject to copyright and other intellectual property
                        rights under&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Canadian</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;and foreign laws and international conventions.
                        Content on the Website is provided to you AS IS for your
                        information and personal use only and may not be used,
                        copied, reproduced, distributed, transmitted, broadcast,
                        displayed, sold, licensed, or otherwise exploited for
                        any other purposes whatsoever without the prior written
                        consent of the respective owners.&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;reserves all rights not expressly granted in and
                        to the Website and the Intellectual Property. You agree
                        to not engage in the use, copying, or distribution of
                        any of the Intellectual Property other than expressly
                        permitted herein. If you download or print a copy of the
                        Intellectual Property for personal use, you must retain
                        all copyright and other proprietary&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        notices contained therein. You agree not to circumvent,
                        disable or otherwise interfere with security related
                        features of the Website or features that prevent or
                        restrict use or copying of any Intellectual Property or
                        enforce limitations on use of the Website or the
                        Intellectual Property therein.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Some of the Services may allow you to submit or transmit
                        audio, video, text, or other materials (collectively,
                        "User Submissions") to or through the Services. When you
                        provide User Submissions, you grant to&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , its parents, subsidiaries, affiliates, and partners a
                        non-exclusive, worldwide, royalty-free, fully&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        sublicensable
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;license to use, distribute, edit, display,
                        archive, publish, sublicense, perform, reproduce, make
                        available, transmit, broadcast, sell, translate, and
                        create derivative works of those User Submissions, and
                        your name, voice, likeness and other identifying
                        information where part of a User Submission, in any
                        form, media, software, or technology of any kind now
                        known or developed in the future, including, without
                        limitation, for developing, manufacturing, and marketing
                        products. You hereby waive any moral rights you may have
                        in your User Submissions.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        In addition, you agree that any User Submissions you
                        submit shall not contain any material that is, in the
                        sole and absolute discretion of&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , inappropriate, obscene, vulgar, unlawful, or otherwise
                        objectionable (hereinafter, "Prohibited Content").
                        Posting of any Prohibited Content, in addition to any
                        and all other rights and remedies available to&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , may result in&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;suspension or termination.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        We respect your ownership of User Submissions. If you
                        owned a User Submission before providing it to us, you
                        will continue owning it after providing it to us,
                        subject to any rights granted in the Terms of Use and
                        any access granted to others. If you delete a User
                        Submission from the Services, our general license to
                        that User Submission will end after a reasonable period
                        of time required for the deletion to take full effect.
                        However, the User Submission may still exist in our
                        backup copies, which are not publicly available. If your
                        User Submission is shared with third parties, those
                        third parties may have retained copies of your User
                        Submissions. In addition, if we made use of your User
                        Submission before you deleted it, we will continue to
                        have the right to make, duplicate, redistribute, and
                        sublicense those pre-existing uses, even after you
                        delete the User Submission. Terminating your&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;on a Service will not automatically delete your
                        User Submissions.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        We may refuse or remove a User Submission without notice
                        to you. However, we have no obligation to monitor User
                        Submissions, and you agree that neither we nor our
                        parents, subsidiaries, affiliates, employees, or agents
                        will be liable for User Submissions or any loss or
                        damage resulting from User Submissions.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Except as provided in the Privacy Policy, we do not
                        guarantee that User Submissions will be private, even if
                        the User Submission is in a password-protected area.
                        Accordingly, you should not provide User Submissions
                        that you want protected from others.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        You represent and warrant that you have all rights
                        necessary to grant to&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;the license above and that none of your User
                        Submissions are defamatory, violate any rights of third
                        parties (including intellectual property rights or
                        rights of publicity or privacy), or violate applicable
                        law.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">N</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">O</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">&nbsp;</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">THIRD</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">&nbsp;</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">PARTY</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">&nbsp;</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">BENEFICIARIES</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      You agree that, except as otherwise expressly provided in
                      these Terms, there shall be no third party beneficiaries
                      to the Terms.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        BINDING ARBITARTION AND CLASS ACTION WAIVER
                      </span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      PLEASE READ THIS SECTION CAREFULLY &ndash; IT MAY
                      SIGNIFICANTLY AFFECT YOUR LEGAL RIGHTS, INCLUDING YOUR
                      RIGHT TO FILE A LAWSUIT IN COURT
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":390,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">Initial Dispute Resolution</span>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Our Customer Support Department is available&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">via email (</span>
                    </span>
                    <a href="mailto:support@powerplaysystems.com">
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Hyperlink">
                          support@powerplaysystems.com
                        </span>
                      </span>
                    </a>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">)&nbsp;</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        to address any concerns you may have regarding the
                        Service. Our Customer Service Department is able to
                        resolve most concerns quickly to our players&rsquo;
                        satisfaction. The parties shall use their best efforts
                        through this Customer Service process to settle any
                        dispute, claim, question, or disagreement and engage in
                        good faith negotiations which shall be a condition to
                        either party initiating a lawsuit or arbitration.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">Binding Arbitration</span>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        If the parties do not reach an agreed upon solution
                        within a period of 30 days from the time informal
                        dispute resolution under the Initial Dispute Resolution
                        provision, then either party may initiate binding
                        arbitration as the sole means to resolve claims, subject
                        to the terms set forth below. Specifically, all claims
                        arising out of or relating to these Terms (including
                        their formation, performance and breach), the
                        parties&rsquo; relationship with each other and/or your
                        use of the Service shall be finally settled by binding
                        arbitration administered by the American Arbitration
                        Association in accordance with the provisions of its
                        Commercial Arbitration Rules and the supplementary
                        procedures for consumer related disputes of the American
                        Arbitration Association (the &ldquo;AAA&rdquo;),
                        excluding any rules or procedures governing or
                        permitting class actions.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        The arbitrator, and not any federal, state
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , provincial,
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;or local court or agency, shall have exclusive
                        authority to resolve all disputes arising out of or
                        relating to the interpretation, applicability,
                        enforceability or formation of these Terms, including,
                        but not limited to any claim that all or any part of
                        these Terms are void or voidable, or whether a claim is
                        subject to arbitration. The arbitrator shall be
                        empowered to grant whatever relief would be available in
                        a court under law or in equity. The arbitrator&rsquo;s
                        award shall be written, and binding on the parties and
                        may be entered as a judgment in any court of competent
                        jurisdiction.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        The Commercial Arbitration Rules governing the
                        arbitration may be accessed at www.adr.org or by calling
                        the AAA at +1.800.778.7879.&nbsp;
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">Location</span>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        If you are a resident of the United States, arbitration
                        will take place at any reasonable location within the
                        United States convenient for you. For residents in
                        Canada, arbitration shall be initiated in the&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Province of Ontario
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">,&nbsp;</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Canada</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , and you and&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;agree to submit to the personal jurisdiction of
                        any federal or&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">provincial</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;court in&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Toronto, Ontario
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">,&nbsp;</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Canada</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , in order to compel arbitration, to stay proceedings
                        pending arbitration, or to confirm, modify, vacate or
                        enter judgment on the award entered by the arbitrator.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">Class Action Waiver</span>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        The parties further agree that any arbitration shall be
                        conducted in their individual capacities only and not as
                        a class action or other representative action, and the
                        parties expressly waive their right to file a class
                        action or seek relief on a class basis. YOU AND&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        POWERPLAY SYSTEMS
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER
                        ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A
                        PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR
                        REPRESENTATIVE PROCEEDING. If any court or arbitrator
                        determines that the class action waiver set forth in
                        this paragraph is void or unenforceable for any reason
                        or that an arbitration can proceed on a class basis,
                        then the arbitration provision set forth above shall be
                        deemed null and void in its entirety and the parties
                        shall be deemed to have not agreed to arbitrate
                        disputes.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      Exception - Litigation of Intellectual Property and Small
                      Claims Court Claims
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Notwithstanding the parties' decision to resolve all
                        disputes through arbitration, either party may bring an
                        action in&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        provincial,&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">state</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">,</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;or federal court to protect its intellectual
                        property rights (&ldquo;intellectual property
                        rights&rdquo; means patents, copyrights, moral rights,
                        trademarks, and trade secrets, but not privacy or
                        publicity rights). Either party may also seek relief in
                        a small claims court for disputes or claims within the
                        scope of that court&rsquo;s jurisdiction.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">Changes to this Section</span>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;will provide 60-days&rsquo; notice of any changes
                        to this section. Changes will become effective on the
                        60th day, and will apply prospectively only to any
                        claims arising after the 60th day.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        For any dispute not subject to arbitration you and&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;agree to submit to the personal and exclusive
                        jurisdiction of and venue in the&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">provincial</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;courts located in&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Toronto, ON</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        . You further agree to accept service of process by
                        mail, and hereby waive any and all jurisdictional and
                        venue defenses otherwise available.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        The Terms and the relationship between you and&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;shall be governed by the laws of the&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Province of Ontario
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;without regard to conflict of law provisions.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">MISCELLANEOUS</span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        These Terms of Use shall be governed by the internal
                        substantive laws of the&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Province of Ontario
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , without respect to its conflict of laws principles.
                        Any claim or dispute between you and&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;that arises in whole or in part from the Terms of
                        Use, the Website or any&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;shall be decided exclusively by a court of
                        competent jurisdiction located in&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Ontario, Canada.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Nothing in the Terms of Use shall create or confer any
                        rights or other benefits in favor of any third parties
                        except as specifically provided herein. By participating
                        in any&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;on the Website, you agree to indemnify, protect,
                        defend and hold harmless&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , its parents, subsidiaries, affiliates and divisions,
                        and their respective directors, officers, employees,
                        agents and representatives (the "
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">&nbsp;</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;Entities"), from and against any and all third
                        party claims, liabilities, losses, damages, injuries,
                        demands, actions, causes of action, suits, proceedings,
                        judgments and expenses, including reasonable
                        attorneys&rsquo; fees, court costs and other legal
                        expenses including, without limitation, those costs
                        incurred at the trial and appellate levels and in any
                        bankruptcy, reorganization, insolvency or other similar
                        proceedings, and any other legal expenses (collectively,
                        "Claims") arising from or connected with your use of the
                        Website, any payment methods used, any&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        purchases made in
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;your&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Account</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        , and/or your&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        participation in any&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contest</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        . The Website may contain links to third party websites
                        that are not owned or controlled by&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">.&nbsp;</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;has no control over, and assumes no responsibility
                        for, the content, privacy policies, or practices of
                        any&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">third-party</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;websites. In addition,&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;will not and cannot censor or edit the content of
                        any third-party site. By using the Website, you
                        expressly relieve&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;from any and all liability arising from your use
                        of any third-party website. Accordingly, we encourage
                        you to be aware when you leave the Website and to read
                        the terms and conditions and privacy policy of each
                        other website that you visit.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Nothing in the Terms of Use shall create or be deemed to
                        create a partnership, agency, trust arrangement,
                        fiduciary relationship or joint venture between you
                        and&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">.</span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        No professional or amateur sports league or any team
                        associated with any professional or amateur sports
                        league is associated with&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;or in any way affiliated or associated with
                        the&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">Contests</span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">.</span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        Third-party online publishers that refer users to
                        the&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;website shall not be responsible or liable for
                        the&nbsp; website or any of the content, software, or
                        functions made available on, or accessed through, or
                        sent from, the&nbsp; website.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        If any provision of these Terms of Use is deemed invalid
                        by a court of competent jurisdiction, the invalidity of
                        such provision shall not affect the validity of the
                        remaining provisions of these Terms of Use, which shall
                        remain in full force and effect.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        No waiver of any term of these Terms of Use shall be
                        deemed a further or continuing waiver of such term or
                        any other term, and&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        ' failure to assert any right or provision under these
                        Terms of Use shall not constitute a waiver of such right
                        or provision.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;reserves the right to amend these Terms of Use at
                        any time and without notice, and it is your
                        responsibility to review these Terms of Use for any
                        changes. If you continue to use the Services after we
                        change the Terms of Use, you accept all changes. The
                        failure of&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        PowerPlay Systems
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;to comply with any provision of these Terms of Use
                        due to an act of God, hurricane, war, fire, riot,
                        earthquake, terrorism, act of public enemies, actions of
                        governmental authorities outside of the control of the
                        Company (excepting compliance with applicable codes and
                        regulations) or other force majeure event will not be
                        considered a breach of these Terms of Use.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        POWERPLAY SYSTEMS
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;AND OTHER TRADEMARKS CONTAINED ON THE WEBSITE ARE
                        TRADEMARKS OR REGISTERED TRADEMARKS OF&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        POWERPLAY SYSTEMS
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        &nbsp;IN&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        CANADA.&nbsp;
                      </span>
                    </span>
                    <span data-contrast="none">
                      <span data-ccp-parastyle="Normal (Web)">
                        THE UNITED STATES AND/OR OTHER COUNTRIES. THIRD PARTY
                        TRADEMARKS, TRADE NAMES, PRODUCT NAMES AND LOGOS MAY BE
                        THE TRADEMARKS OR REGISTERED TRADEMARKS OF THEIR
                        RESPECTIVE OWNERS. YOU MAY NOT REMOVE OR ALTER ANY
                        TRADEMARK, TRADE NAMES, PRODUCT NAMES, LOGO, COPYRIGHT
                        OR OTHER PROPRIETARY NOTICES, LEGENDS, SYMBOLS OR LABELS
                        ON THE WEBSITE.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(TermsOfUse);
