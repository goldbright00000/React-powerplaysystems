import React from 'react';
import styles from './terms.module.scss';

const Terms = () => {
    return (
        <section className={styles.root}>
            <h1 className={styles.title}><span className='__primary-text'>Defy Games</span> Terms of Use</h1>
            <div className={styles.section}>
                <h2>Important Legal Notice Regarding Terms of Use of DEFY GAMES.</h2>
                <p><b><i>IMPORTANT! PLEASE CAREFULLY READ THESE TERMS OF USE BEFORE USING DEFY GAMES, AS THEY AFFECT YOUR LEGAL RIGHTS AND OBLIGATIONS. <br />IMPORTANT NOTICE: THIS AGREEMENT IS SUBJECT TO BINDING ARBITRATION AND A WAIVER OF CLASS ACTION RIGHTS AS DETAILED BELOW.</i></b></p>
            </div>
            <div className={styles.section}>
                <h2>DEFINITIONS</h2>
                <p><b>“Service(s)”</b> refers to products, games, contests, services, content, Defygames.io and/or other domains provided by PowerPlay Systems Inc.</p>
                <p><b>“Account”</b> means an Account you create when you access the Services.</p>
                <p><b>“Offers”</b> means special programs, including offers, excursions, and special gifts, both digital and tactile, that players may earn from time to time while using the Service.</p>
                <p><b>“Terms of Service”</b> or “Terms” means these terms of service.</p>
            </div>
            <div className={styles.section}>
                <h2>USER AGREEMENT</h2>
                <p>PowerPlay Systems Inc. (hereafter referred to as ‘PowerPlay Systems’, “the Company”) owns and operates the Defy Games Website (defygames.io) that links to these Terms of Use.</p>
                <p>We are pleased to offer you access to our Website and the ability to participate in our contests of skill, other content, products, Services, and promotions (collectively the "Services") that we may provide from our Website, subject to these Terms of Use (the "Terms of Use", or “Terms”), our privacy policy (the "Privacy Policy") and the Official Rules and Regulations for the applicable games and promotions (the "Rules" or "Rules and Scoring," and together with the Terms of Use and the Privacy Policy, the "Agreements").</p>
            </div>
            <div className={styles.section}>
                <h2>CONSIDERATION</h2>
                <p>You agree to these Terms of Use by accessing or using the Website, registering for Services offered on the Website, or by accepting, uploading, submitting, or downloading any information or content from or to the Website. <br /> IF YOU DO NOT AGREE TO BE BOUND BY ALL OF THESE TERMS OF USE, DO NOT USE THE WEBSITE. These Terms of Use constitute a legal agreement between you and PowerPlay Systems and shall apply to your use of the Website and the Services even after termination.</p>
            </div>
            <div className={styles.section}>
                <h2>ELIGIBILITY</h2>
                <p>You hereby represent and warrant that you are fully able and competent to enter into the terms, conditions, obligations, affirmations, representations and warranties set forth in these terms and to abide by and comply with these terms.</p>
                <p>By entering a Defy Games contest, you are representing and warranting that:</p>
                <ul>
                    <li>you are of 18 years of age or older (19 or older in Alabama or Nebraska, 21 years of age or older in   Massachusetts)</li>
                    <li>you are of legal age in the jurisdiction in which you are using the Services; PowerPlay Systems reserves the right, in its sole discretion, to terminate your Account, withhold or revoke the awarding of any prizes associated with your Account or limit your ability to withdraw if it determines that you are not of legal age in the applicable jurisdiction;</li>
                    <li>you are not listed on any U.S. Government list of prohibited or restricted parties;</li>
                    <li>you will abide at all times by these Terms of Use and any other agreements between you and PowerPlay Systems regarding your use of the Service or participation in contests;</li>
                </ul>
            </div>
            <div className={styles.section}>
                <h2>Using the Defy Games Website</h2>
                <div>
                    <h3>Service Changes and Limitations:</h3>
                    <p>The Service is evolving and we may require that you accept updates to the Service as well as to the Terms, Community Rules, and the PowerPlay Systems Privacy Policy. From time to time, we may make you update the Contest or your software to continue to use our Services. We may perform these updates remotely including to the Defy Games software residing on your computer or mobile device, without notifying you.</p>
                    <p>PowerPlay Systems reserves the right to stop offering and/or supporting the Service or a particular Contest or part of the Service at any time either permanently or temporarily, at which point your right to use the Service or any part of it will be automatically terminated or suspended. If that happens, PowerPlay Systems is not required to provide refunds, benefits or other compensation to players in connection with discontinued elements of the Service or for virtual goods previously earned or purchased.</p>
                    <p>POWERPLAY SYSTEMS MAY, IN ITS SOLE DISCRETION LIMIT, SUSPEND, TERMINATE, MODIFY, OR DELETE ACCOUNTS OR ACCESS TO THE SERVICE OR ANY PORTION OF IT AND PROHIBIT ACCESS TO OUR CONTESTS AND SITES, AND THEIR CONTENT, SERVICES AND TOOLS, DELAY OR REMOVE HOSTED CONTENT AND POWERPLAY SYSTEMS IS UNDER NO OBLIGATION TO COMPENSATE YOU FOR ANY SUCH LOSSES OR RESULTS.</p>
                </div>
                <br />
                <div>
                    <h3>Deleting your Account:</h3>
                    <p>You may stop using the Service at any time by closing your Account on the Player Admin page. Unless the local law where you are located requires otherwise, we are not required to provide refunds, benefits, or other compensation if you request deletion of your Account.</p>
                    <p className={styles.notice}>
                        <span>WE MAY DELETE OR TERMINATE ACCOUNTS THAT ARE INACTIVE (I.E., NOT LOGGED INTO) FOR 180 DAYS.</span>
                        <span>IF YOU WANT US TO DELETE YOUR ACCOUNT, YOU CAN GO HERE AND CLICK DELETE ACCOUNT</span>
                    </p>
                </div>
                <br />
                <div>
                    <h3>Your Account and Powers:</h3>
                    <p>Regardless of what anything else says in these Terms or any other Terms that apply to features you may choose to use; you do not own the Account that you create on our service and your Account is not your property. This also applies to other services or items, like Powers, regardless of whether you “earned” Powers in a Contest or “purchased” them. Your Account and any Powers are owned by PowerPlay Systems.</p>
                    <p>You are not allowed to transfer Powers outside of the Service (i.e., in the “real world”), for example by selling, gifting, or trading them. We won’t recognize those transfers as legitimate. You are not allowed to sublicense, trade, sell or attempt to sell Powers for "real" money, or exchange Powers for value of any kind outside of a Contest. Any such transfer or attempted transfer is prohibited and void, and we may terminate your Account because of it.</p>
                </div>
            </div>
        </section>
    )
}

export default Terms;