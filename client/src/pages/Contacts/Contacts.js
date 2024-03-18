import {useTranslation} from 'react-i18next'
import './Contacts.css'

const Contacts = () => {
    const {t} = useTranslation()
    return (
        <div className="contacts_container">
            <h1>{t('contacts.contacts')}</h1>
            <h3>{t('contacts.phone')}/Telegram/WhatsApp</h3>
            <h4>+(48) 508-337-701</h4>
            <h3>{t('contacts.location')}</h3>
            <h4>Lublin, Poland</h4>
            <h3>Email</h3>
            <h4>alex.moroz1530@gmail.com</h4>
            <h3>{t()}</h3>
        </div>
    );
}
 
export default Contacts;