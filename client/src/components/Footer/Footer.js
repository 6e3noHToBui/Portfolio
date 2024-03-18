import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import './Footer.css'
import git from '../../icons/git.svg'
import telegram from '../../icons/telegram.svg'
import discord from '../../icons/discord.svg';
import { useLanguage } from '../../hooks/ChangeLanguage'; 

const Footer = () => {
    const { language, changeLanguage } = useLanguage();

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        changeLanguage(newLanguage);
        window.location.reload() 
    }

    return (
        <footer className="footer">
            <div className="change_language_container">
                <select value={language} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="pl">Polish</option>
                    <option value="ru">Russian</option>
                </select>
            </div>
            <div className="socials_container">
                <a href="https://github.com/6e3noHToBui">
                    <img src={git} alt='git_icon' />
                </a>
                <a href="https://t.me/Grechnevui">
                    <img src={telegram} alt='telegram_icon' />
                </a>
                <a href="https://discordapp.com/users/410478161717886987">
                    <img src={discord} alt='discord_icon'/>
                </a>
            </div>
        </footer>
    );
}

export default Footer;
