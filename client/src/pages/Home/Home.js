import './Home.css'
import { useTranslation } from "react-i18next";

const Home = () => {
    const { t } = useTranslation();
    return (
        <div className='home_container'>
            <div className='bio_info_container'>
                <h1>{t('home.greetings')}</h1>
                <h2>{t('home.bio')}</h2>
                <button type="button" class="btn btn-outline-success">{t('home.download_cv')}</button>
            </div>
            <div className='knowledge_info_container'>
                <h1>{t('home.knowledge')}</h1>
                <h2>Frontend</h2>
                <h3>HTML, CSS, React, Redux, BootStrap, JavaScript</h3>
                <h2>Backend</h2>
                <h3>JavaScript, NodeJS, ExpressJS, MongoDB, SQL</h3>
                <h2>Another</h2>
                <h3>Git, Docker, Jerkins</h3>
            </div>
        </div>
    );
}

export default Home;