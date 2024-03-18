import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { Carousel, Modal } from 'react-bootstrap';
import './Projects.css';
import noimage from '../../icons/noimage.png'

const Projects = () => {
    const { projects, getProjects } = useGlobalContext();
    const [selectedProject, setSelectedProject] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getProjects();
    }, []);

    const handleImageClick = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="projects_container">
            {projects.map(project => (
                <div key={project.name} className="project_card">
                    <h2>{project.name}</h2>
                    <h4>{project.description[localStorage.getItem('language')]}</h4>
                    <img src={project.images.length > 0 ? project.images[0] : noimage} alt={project.name} onClick={() => handleImageClick(project)} />
                    <a href={project.git_link}>GitHub</a>
                </div>
            ))}

            {selectedProject && (
                <Modal show={showModal} onHide={handleCloseModal} size="lg" dialogClassName="custom-modal">
                    <Modal.Header>
                        <Modal.Title className="text-center">{selectedProject.name}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Carousel>
                            {selectedProject.images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img src={image} alt={`${selectedProject.name} - ${index}`} className="d-block w-100" />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Modal.Body>
                </Modal>

            )}
        </div>

    );
}

export default Projects;
