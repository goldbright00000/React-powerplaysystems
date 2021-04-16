import { Link } from "react-router-dom";

const contents = [
    {
        title: 'ACCOUNT MANAGEMENT',
        content: (
            <>
                <h3>WHAT SHOULD I DO IF MY ACCOUNT HAS BEEN MISALLOCATED, COMPROMISED OR OTHERWISE MISHANDLED?</h3>
                <p>If you believe your account has been misallocated, compromised or mishandled please contact <a href='mailto:support@powerplaysystems.com' target='_blank'>support@powerplaysystems.com</a> for assistance. Please provide all pertinent information related to your claim and a dedicated member of our Customer Service team will address your support ticket within 24 hours.</p>
                <h3>HOW ARE PRIZE CLAIMS HANDLED FOR CLOSED ACCOUNTS?</h3>
                <p>If any consumer chooses to close his or her PowerPlay Systems account, we will distribute all prizes in the account before the close of business on the next full business day. If an account is closed prior to the conclusion of a customer’s live contest(s) any and all prizes from the contest will be distributed to the player within five business days after the contest ends.</p>
                <h3>HOW IS MY INFORMATION PROTECTED?</h3>
                <p>All of PowerPlay Systems confidential information is safeguarded by SSL (Secure Socket Layer), as represented by the padlock visible on your browser’s address tab. This ensures the security of any and all private information provided by the website. We encrypt all our private customer information, available to our staff only when pertinent.</p>
                <h3>CAN I REGISTER MORE THAN ONE ACCOUNT?</h3>
                <p>PowerPlay Systems prohibits users from opening up more than one account, in order to ensure fair play and uphold the integrity of our contests. If for some reason you forget your e-mail address please contact <a href='mailto:support@powerplaysystems.com' target='_blank'>support@powerplaysystems</a>.com and an agent will be happy to assist you with retrieving that information.</p>
                <p>Please note: if the same individual sets up multiple accounts, PowerPlay Systems will deactivate all accounts except one, and any potential prizes may not be honored from all accounts. Any accounts that are set up illegitimately will be deactivated and prizes will not be honored.</p>
                <h3>CAN I PERMANENTLY CLOSE MY ACCOUNT AT ANY TIME FOR ANY REASON?</h3>
                <p>Yes, should you decide to close your account at any time for any reason, please contact support support@powerplaysystems.com. We’ll be able to assist you in closing your account.</p>
                <h3>CAN I CHANGE MY DISPLAY NAME?</h3>
                <p>No, You cannot change your display name, so make sure you choose one you will be happy with.</p>
                <h3>WHAT INFORMATION IS REQUIRED TO OPEN A POWERPLAY SYSTEMS ACCOUNT?</h3>
                <p>In order to register an Account, you are required to provide your full name, email address, Country and State/Province of residence.</p>
            </>
        )
    },
    {
        title: 'WITHDRAWALS',
        content: (
            <> 
                <h3>HOW DO I SUBMIT A PRIZE WITHDRAWAL REQUEST?</h3>
                <p>If you click <Link to='/my-account'>here</Link> you will be directed to the withdrawal page. Please follow the directions on the page.</p>
                <h3>WHY DO I HAVE TO COMPLETE A W-9 FORM PRIOR TO WITHDRAWING A PRIZE?</h3>
                <p>Our compliance and identity verification requirements require PowerPlay Systems clients to complete a W-9 form prior to withdrawing prizes for US citizens.</p>
                <h3>HOW LONG DO WITHDRAWALS TAKE?</h3>
                <p>Our Accounting Department processes withdrawals Monday - Friday from 9 AM-5 PM. Any withdrawal requests that come in after 5 PM on Friday will be processed in the order that they were received starting the following Monday. Once our Accounting Department processes your withdrawal request (you'll receive a confirmation email), it typically takes anywhere from 2-8 business days for you to receive your prize.</p>
            </>
        )
    },
]

export default contents;