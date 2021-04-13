import React from 'react';
import { Link } from 'react-router-dom';
import styles from './instructions.module.scss';
import ResponsibleGames from './ResponsibleGames';

const ResponsibleGamesInstructionsSection = props => {
    return (
        <section className={styles.root}>
            <h1 className={styles.title}>Responsible Gaming</h1>
            <section>
                <h2>OVERVIEW</h2>
                <p>
                    PowerPlay Systems is innovator in the interactive gaming industry. Our fair and responsible contest options ensure every player can play within their financial means. PowerPlay Systems is committed to integrity, fairness, and reliability. We do everything possible to prevent gaming-related problems. We have developed measures to maintain a responsible, safe, and reliable place for interactive gaming.
                </p>
                <p>PowerPlay Systems offers the options to self-exclude and self limit. If, at any point, you think you're spending too much time or money on our Defy Games site, you have the option of taking a break entirely. Self-limiting allows you to still play, however, within the parameters that you set for yourself.  </p>
                <p>Options to Limit Play: </p>
                <ul>
                    <li>Deposit Limits and Alerts</li>
                    <li>Entry Fee Limits </li>
                    <p>PowerPlay Systems provides options to limit the amount of funds you can deposit into your account by choosing an amount over a daily, weekly and monthly period. You can also set limits for entry fees to enter a contest. </p>
                    <p>To learn more, click <Link to='/help/FAQ'>here</Link></p>
                </ul>
            </section>
            {ResponsibleGames.map(({title, content}, index) => (
                <section key={index} id={title.toLocaleLowerCase().replaceAll(' ', '-')}>
                    <h2>{title}</h2>
                    {content}
                </section>
            ))}
        </section>
    )
}

export default ResponsibleGamesInstructionsSection;