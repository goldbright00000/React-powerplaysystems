import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./index.css";
class ResponsibleGaming extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      content: "",
    };
  }

  render() {
    return (
      <div>
        <Header />

        <div className="container-fluid _rg_wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1>ResponsibleGaming</h1>
              </div>
              <div className="col-md-12">
                {" "}
                <div className="_rg_cont">
                  <p>
                    <span data-contrast="none">RESPONSIBLE GAMING</span>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">OVERVIEW</span>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">&nbsp;</span>
                    <span data-contrast="none">is&nbsp;</span>
                    <span data-contrast="none">innovator in the&nbsp;</span>
                    <span data-contrast="none">interactive</span>
                    <span data-contrast="none">&nbsp;gaming</span>
                    <span data-contrast="none">
                      &nbsp;industry. Our fair and responsible contest&nbsp;
                    </span>
                    <span data-contrast="none">options</span>
                    <span data-contrast="none">&nbsp;</span>
                    <span data-contrast="none">ensure</span>
                    <span data-contrast="none">&nbsp;every&nbsp;</span>
                    <span data-contrast="none">player</span>
                    <span data-contrast="none">
                      &nbsp;can play within their financial means.&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems&nbsp;</span>
                    <span data-contrast="none">
                      is committed to integrity,&nbsp;
                    </span>
                    <span data-contrast="none">fairness,</span>
                    <span data-contrast="none">
                      &nbsp;and reliability. We do everything possible to
                      prevent gaming-related problems.&nbsp;
                    </span>
                    <span data-contrast="none">We have</span>
                    <span data-contrast="none">
                      &nbsp;developed measures to maintain a responsible,&nbsp;
                    </span>
                    <span data-contrast="none">safe,</span>
                    <span data-contrast="none">
                      &nbsp;and reliable place for&nbsp;
                    </span>
                    <span data-contrast="none">interactive</span>
                    <span data-contrast="none">&nbsp;gaming.</span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">PowerPlay Systems&nbsp;</span>
                    <span data-contrast="none">
                      offers the options to self-exclude and self limit. If, at
                      any point, you think&nbsp;
                    </span>
                    <span data-contrast="none">you're</span>
                    <span data-contrast="none">
                      &nbsp;spending too much time or money on&nbsp;
                    </span>
                    <span data-contrast="none">our Defy Games site</span>
                    <span data-contrast="none">
                      , you have the option of taking a break entirely.&nbsp;
                    </span>
                    <span data-contrast="none">Self-limiting</span>
                    <span data-contrast="none">
                      &nbsp;allows you to still play, however, within the
                      parameters that you set for yourself.&nbsp;
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">Options to Limit Play:</span>
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
                      <a href="https://www.draftkings.com/account/SelfExclusion">
                        <span data-contrast="none">Deposit</span>
                      </a>
                      <span data-contrast="none">&nbsp;Limits and Alerts</span>
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
                      <a href="https://www.draftkings.com/account/Limits">
                        <span data-contrast="none">Entry</span>
                      </a>
                      <span data-contrast="none">&nbsp;Fee Limits</span>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                  </ul>
                  <p>
                    <span data-contrast="none">PowerPlay Systems&nbsp;</span>
                    <span data-contrast="none">
                      provides options to limit the amount of funds you can
                      deposit into your account by choosing an amount over a
                      daily,&nbsp;
                    </span>
                    <span data-contrast="none">weekly</span>
                    <span data-contrast="none">
                      &nbsp;and monthly period.&nbsp;
                    </span>
                    <span data-contrast="none">
                      You can also set limits for entry fees to enter a contest.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">To learn more,&nbsp;</span>
                    <span data-contrast="none">click</span>
                    <span data-contrast="none"> </span>
                    <a href="https://www.draftkings.com/help/FAQ">
                      <span data-contrast="none">here</span>
                    </a>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">NEED HELP?</span>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      If you have questions or concerns about your own gaming
                      behavior or about that of a friend or family member,&nbsp;
                    </span>
                    <span data-contrast="none">please contact</span>
                    <span data-contrast="none"> </span>
                    <a href="http://www.ncrg.org/">
                      <span data-contrast="none">NCRG</span>
                    </a>
                    <span data-contrast="none">&nbsp;or RGC (</span>
                    <span data-contrast="none">
                      http://www.responsiblegambling.org
                    </span>
                    <span data-contrast="none">)</span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">You can also contact&nbsp;</span>
                    <span data-contrast="none">NCPG</span>
                    <span data-contrast="none">
                      &nbsp;24 Hour Confidential National Helpline Number
                    </span>
                    <span data-contrast="none">&nbsp;in the United States</span>
                    <span data-contrast="none">: 1-800-522-4700&nbsp;</span>
                    <span data-contrast="none">or 1-</span>
                    <span data-contrast="none">
                      888-230-3505 to contact RGC in Canada
                    </span>
                    <span data-contrast="none">&nbsp;</span>
                    <span data-contrast="none">for additional assistance</span>
                    <span data-contrast="none">.</span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">NCRG</span>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      Founded in 1996 as a charitable organization, the National
                      Center for Responsible Gaming is exclusively devoted to
                      funding research for gaming-related issues and effective
                      methods of treatment. The research is scientific,
                      peer-reviewed, and focused on prevention,
                      diagnostic,&nbsp;
                    </span>
                    <span data-contrast="none">intervention</span>
                    <span data-contrast="none">
                      &nbsp;and treatment strategies, and advancing public
                      education about responsible gaming.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      The NCRG website provides a variety of support and
                      referral sources for help with counseling and crisis
                      support for any affected by a gaming-related issue.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">RGC</span>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      The Responsible Gambling Council (RGC) is an independent
                      non-profit organization dedicated to problem gambling
                      prevention.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      RGC works to reduce gambling risks by creating and
                      delivering innovative awareness and information programs.
                      It also promotes the adoption of improved play safeguards
                      through best practices research, standards&nbsp;
                    </span>
                    <span data-contrast="none">development</span>
                    <span data-contrast="none">
                      &nbsp;and the RG Check accreditation program.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      RGC is committed to bringing together all perspectives in
                      the reduction of gambling problems including those of
                      people with firsthand experience with gambling problems,
                      gaming providers, regulators, policy makers and treatment
                      professionals.  
                    </span>
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
                    <span data-contrast="none">
                      CONCERNED ABOUT A FAMILY MEMBER?
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      If you believe that a member of your family is a problem
                      gamer or is&nbsp;
                    </span>
                    <span data-contrast="none">overspending,</span>
                    <span data-contrast="none">&nbsp;please contact </span>
                    <a href="mailto:support@powerplaysystems.com">
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Hyperlink">
                          support@powerplaysystems.com
                        </span>
                      </span>
                    </a>
                    <span data-contrast="none"> for assistance.</span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      You may be able to exclude&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">&nbsp;</span>
                    <span data-contrast="none">
                      consumer(s) from participating in contests&nbsp;
                    </span>
                    <span data-contrast="none">
                      on the Defy Games site&nbsp;
                    </span>
                    <span data-contrast="none">
                      or to set deposit or loss limits. In order to process such
                      requests,&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems&nbsp;</span>
                    <span data-contrast="none">
                      will require the following proof: (1) that the requestor
                      is jointly obligated on the credit or debit card
                      associated with the&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;Consumer&rsquo;s account; (2) proof of legal
                      dependency of the&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;Consumer; (3) the existence of a court order
                      requiring the&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">
                      &nbsp;consumer to pay unmet child support obligations; and
                      (4) any additional identifiable verification documentation
                      validating the relationship between the requestor
                      and&nbsp;
                    </span>
                    <span data-contrast="none">PowerPlay Systems</span>
                    <span data-contrast="none">&nbsp;Consumer.</span>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">PARENTAL CONTROLS</span>
                    <span data-ccp-props='{"201341983":0,"335559738":375,"335559739":75,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="none">
                      If there are children under 18 who have access to your
                      computer, you may want to consider installing parental
                      control software to prevent access to online gaming site
                      and other material, such as:
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
                      <a href="http://www.netnanny.com/">
                        <span data-contrast="none">NetNanny</span>
                      </a>
                      <span data-contrast="none">
                         - US Toll Free at 1-800-485-4008
                      </span>
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
                      <a href="http://www.cybersitter.com/">
                        <span data-contrast="none">CyberSitter</span>
                      </a>
                      <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":0,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                  </ul>
                  <p>
                    <span data-contrast="none">
                      If you believe that a minor is improperly using&nbsp;
                    </span>
                    <span data-contrast="none">the Defy Games site,</span>
                    <span data-contrast="none">&nbsp;please</span>
                    <span data-contrast="none">&nbsp;c</span>
                    <span data-contrast="none">ontact </span>
                    <a href="mailto:support@powerplaysystems.com">
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Hyperlink">
                          support@powerplaysystems.com
                        </span>
                      </span>
                    </a>
                    <span data-ccp-props='{"201341983":0,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
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

export default withRouter(ResponsibleGaming);
