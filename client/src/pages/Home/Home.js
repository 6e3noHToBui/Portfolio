import './Home.css'
import { useTranslation } from "react-i18next";

const Home = () => {
    const { t } = useTranslation();

    const handleDownloadCV = () => {
        const cvUrl = 'https://elasticbeanstalk-us-east-1-268669009234.s3.amazonaws.com/portfolio/Artur++Moroz+CV.pdf';
        window.open(cvUrl, '_blank');
    };
    
    return (
        <div className='home_container'>
            <div className='bio_info_container'>
                <h1>{t('home.greetings')}</h1>
                <h2>{t('home.bio')}</h2>
                <button type="button" className="btn btn-outline-success" onClick={handleDownloadCV}>
                    {t('home.download_cv')}
                </button>
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