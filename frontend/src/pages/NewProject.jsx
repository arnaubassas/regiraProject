import { useState, useContext } from "react"
import Contexte from "../components/Contexte";
import { useNavigate } from "react-router-dom";


import { createProject } from '../general'

const NewProject = () => {
    const { logout } = useContext(Contexte)
    const [newProject, setNewProject] = useState({ name: "", desc: "", active: true })
    const redirect = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewProject({
            ...newProject,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        createProject(newProject)
            .then(data => {
                (data.error == 'Unauthorized') ? logout() : redirect('/projects');
            })
    }

    return (
        <>
            <div className="flex p-8 justify-center">
                <div className="flex justify-center w-2/5 bg-white shadow-md rounded-xl px-8 py-8 mb-4 min-w-96">
                    <form onSubmit={handleSubmit} action="submit" className="min-w-96 px-8 pt-6 pb-8 mb-4">
                        <h1 className="text-center text-3xl font-semibold pb-8">New Project</h1>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                Name of the Project
                            </label>
                            <input
                                onChange={handleChange}
                                name="name"
                                value={newProject.name}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Project name" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Descripction
                            </label>
                            <textarea
                                onChange={handleChange}
                                name="desc"
                                value={newProject.desc}
                                className="shadow appearance-none border rounded w-full py-2 px-3 h-48 resize-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="desc" type="text" placeholder="Description" />
                        </div>
                        <div className="text-center">
                            <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Create
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default NewProject