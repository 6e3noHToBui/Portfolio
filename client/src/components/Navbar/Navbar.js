import { useTranslation } from "react-i18next";
import './Navbar.css'

const Navbar = () => {
    const { t } = useTranslation();
    return (
        <nav className="navbar">
            <div className="animate_logo">
                <div className="logo_text"><span>M</span>yP<span>or</span>tf<span>o</span>l<span>io</span></div>
            </div>
            <div className="navigation">
                <a href="/">{t('nav.home')}</a>
                <a href="/projects">{t('nav.projects')}</a>
                <a href="/contacts">{t('nav.contacts')}</a>
            </div>
        </nav>
    );
}

export default Navbar;