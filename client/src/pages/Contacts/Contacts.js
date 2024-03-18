import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalContext } from '../../context/globalContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contacts.css'
import { Button, Form, Modal } from 'react-bootstrap';

const Contacts = () => {
    const { t } = useTranslation()
    const { sendMessage } = useGlobalContext();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        message: ''
    });

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();
        let formValid = true;
        const newErrors = {};

        if (formData.username.trim().length <= 3) {
            newErrors.username = `${t('contacts.nameerror')}`;
            formValid = false;
        }

        if (!formData.email.includes('@') || !formData.email.includes('.')) {
            newErrors.email = `${t('contacts.emailerror')}`;
            formValid = false;
        }

        if (formData.message.length < 1) {
            newErrors.message = `${t('contacts.messageerror')}`
            formValid = false;
        }
        if (formValid) {
            try {
                sendMessage(formData, onSuccess, onError);
            } catch (error) {
                toast.error(`${error.response.data.error}`);
            }
        } else {
            setErrors(newErrors);
        }
    };

    const onSuccess = (response) => {
        setFormData({
            username: '',
            email: '',
            message: ''
        });
        setErrors({
            username: '',
            email: '',
            message: ''
        });
        setShowModal(false);
        toast.success(response.error);
    };

    const onError = (error) => {
        error.response.data.error.forEach(err => {
            toast.error(err);
        });
    };


    return (
        <>
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
            <div className="send_message">
                <Button variant="primary" size="lg" onClick={handleShowModal}>
                    {t('contacts.writeme')}
                </Button>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>{t('contacts.contactform')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitForm}>
                        <Form.Group controlId="formName">
                            <Form.Label>{t('contacts.name')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder={t('contacts.nameplaceholder')}
                                value={formData.username}
                                maxLength={20}
                                onChange={handleInputChange}
                            />
                            {errors.username && <Form.Text className="text-danger">{errors.username}</Form.Text>}
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>{t('contacts.email')}</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder={t('contacts.emailplaceholder')}
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                        </Form.Group>
                        <Form.Group controlId="formMessage">
                            <Form.Label>{t('contacts.message')} ({formData.message.length}/500)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="message"
                                placeholder={t('contacts.messageplaceholder')}
                                value={formData.message}
                                maxLength={500}
                                onChange={handleInputChange}
                            />
                            {errors.message && <Form.Text className="text-danger">{errors.message}</Form.Text>}
                        </Form.Group>
                        <div className='submit_form'>
                            <Button variant="primary" type="submit">
                                {t('contacts.sendbuttontext')}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </>
    );
}

export default Contacts;
