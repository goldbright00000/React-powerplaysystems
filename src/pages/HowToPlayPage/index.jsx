import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './styles.module.scss';
import img1 from '../../assets/group-3@2x.png';
import img2 from '../../assets/group-3-copy@2x.png';
import img3 from '../../assets/group-3-copy-2@2x.png';
import { Link } from 'react-router-dom';
import StarIcon from '../../icons/Star';
import ForwardIcon from '../../icons/ForwardIcon';
import img4 from '../../assets/group-3-copy-3@2x.png'
import img5 from '../../assets/group-10@2x.png'
import backgroundImage from '../../assets/rectangle@2x.png'
import Animate from '../../ui/Animation/Animate';

const HowToPlayPage = () => {
    return (
        <>
            <Header isStick={true} />
            <div className={styles.root}>
                <div className={styles.backgroundWrapper}>
                    <img alt='' src={backgroundImage} />
                </div>
                <main className='__relative __how-to-play-page'>
                    <h1 className={styles.title}>It's Easy to Play!</h1>
                    <section className={styles.contectSection}>
                        <div><p className={styles.blogSection1}>Go to the <Link to='/'>Power Center</Link> and browse available games, click ‘Enter’.</p></div>
                        <Animate className={styles.animate}><img alt='' src={img1} /></Animate>
                    </section>
                    <section className={styles.contectSection}>
                        <Animate> <img alt='' src={img2} /> </Animate>
                        <div>
                            <p className={styles.blogSection2}>
                                Select your team. You will pick eight (8) players and you can have a maximum of three (3) <span className={styles.starPowerBlog}><StarIcon /> STAR POWER</span> Players. <br /> Click <Link to='/'><ForwardIcon /></Link> for more player stats. When done, click Submit
                            </p>
                        </div>
                    </section>
                    <section className={styles.contectSection}>
                        <div>
                            <p className={styles.blogSection3}>From <Link to='/'>My Game Center</Link> you can see when games are due to start or are in progress. <br /> Click <Link to='/'>Team Manager</Link> to launch the live Team Manager page.</p>
                        </div>
                        <Animate> <img alt='' src={img3} /> </Animate>
                    </section>
                    <section className={styles.contectSection4}>
                        <p> <Link to='/'>Team Manager</Link> page overview – this is where you can see your entire team in one view, see you current standings, and see how many powers you have remaining.</p>
                        <Animate><img alt='' src={img4} /></Animate>
                    </section>
                    <section className={styles.contectSection5}>
                        <Animate><img alt='' src={img5} /></Animate>
                        <p>Individual player card overview – this card shows the current stats related to each individual player on your team.</p>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    )
}

export default HowToPlayPage;