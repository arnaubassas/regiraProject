import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexte from "../components/Contexte";

const Project = () => {

    const [projects, setProjects] = useState([])
    const [error, setError] = useState('')
    const redirect = useNavigate();

    const { logout, API_URL } = useContext(Contexte)

    useEffect(() => {

        const opcions = {
            credentials: 'include',
        }

        fetch(API_URL + '/project', opcions)
            .then(resp => resp.json())
            .then(data => {
                if (data.error == "Unauthorized") logout();
                if (data.error) {
                    setError(data.error)
                } else {
                    setProjects(data);
                }
            })

    }, [logout, API_URL])

    if (error) {
        return <h1 className='text-red-500'>{error}</h1>
    }

    return (
        <>
            <div className='flex flex-col items-center gap-y-16'>
                <div className='text-4xl font-semibold underline decoration-solid'>Project List</div>
                <div className="flex flex-col">
                    <div className='self-start py-4'><button className="border p-3 bg-blue-400 hover:bg-blue-500 rounded-full" onClick={() => redirect('/project/new')}>New Project</button></div>
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 ">
                            <div className="overflow-hidden border-white border rounded">
                                <table
                                    className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                                    <thead
                                        className="border-b border-neutral-200 font-medium dark:border-white/10">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 border-white border">#</th>
                                            <th scope="col" className="px-6 py-4 border-white border min-w-64 max-w-64">Name</th>
                                            <th scope="col" className="px-6 py-4 border-white border min-w-96 max-w-96">Description</th>
                                            <th scope="col" className="px-6 py-4 border-white border">Kanba</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {projects.map(projecte =>
                                        (<tr key={projecte.id} className="border-b border-neutral-200 dark:border-white/10">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium border-white border ">{projecte.id}</td>
                                            <td className="whitespace-nowrap px-6 py-4 border-white border min-w-64 max-w-64"><div className='overflow-hidden'>{projecte.name}</div></td>
                                            <td className="whitespace-nowrap px-6 py-4 border-white border min-w-96 max-w-96"><div className='overflow-hidden'  >{projecte.desc}</div></td>
                                            <td className="whitespace-nowrap px-6 py-4 border-white border"><button className="border p-2 bg-blue-400 hover:bg-blue-500 rounded" onClick={() => redirect("/kanban/" + projecte.id)} >Kanban</button></td>
                                        </tr>)
                                        )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Project