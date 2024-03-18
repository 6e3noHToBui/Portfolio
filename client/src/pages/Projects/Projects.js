import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import './Projects.css'

const Projects = () => {
    const { projects, getProjects } = useGlobalContext();

    useEffect(() => {
        getProjects();
    }, []);

    return (  
        <div className="projects_container">
            {projects.projects && projects.projects.map(project => (
                <div key={project.name} className="project_card">
                    <h2>{project.name}</h2>
                    <h3>{project.description}</h3>
                    <img src={project.images[0]} alt={project.name} />
                    <a href={project.git_link}>GitHub</a>
                </div>
            ))}
        </div>
    );
}
 
export default Projects;
