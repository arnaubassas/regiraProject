import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Contexte from "../components/Contexte";


const issue_by_default = { title: "", desc: "", issue_type: "", priority: "", state: "backlog", assigneeId: "" }
const API_URL = 'http://localhost:3000/api';

const NewIssue = () => {

    const [issue, setIssue] = useState(issue_by_default)
    const [assignedList, setAssignedList] = useState([])
    const { logout } = useContext(Contexte)
    const { projectid } = useParams();
    const redirect = useNavigate();

    useEffect(() => {
        fetch(API_URL + '/user')
            .then(resp => resp.json())
            .then(data => {
                setAssignedList(data)
            })
            .catch(err => console.log(err))
    }, [setAssignedList])


    const handleChange = (event) => {
        const { name, value } = event.target;
        setIssue({
            ...issue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const opcions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(issue)
        }

        fetch(API_URL + '/issue/project/' + projectid, opcions)
            .then(resp => resp.json())
            .then(data => {
                (data.error == 'Unauthorized') ? logout() : redirect('/kanban/' + projectid);
                console.log("1", data.error)
            })
    }


    return (
        <>
            <div className="flex p-8 justify-center">
                <div className="flex justify-center w-1/3 bg-white shadow-md rounded-xl px-4 py-8 mb-4 min-w-96">
                    <form onSubmit={handleSubmit} className="bg-white px-8 pt-6 pb-8 mb-4 min-w-96">
                        <h1 className="text-center text-3xl font-semibold pb-8">New Issue</h1>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                Title
                            </label>
                            <input
                                onChange={handleChange}
                                name="title"
                                value={issue.title}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Issue title" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desc">
                                Description
                            </label>
                            <input
                                onChange={handleChange}
                                name="desc"
                                value={issue.desc}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="desc" type="text" placeholder="Description" />
                        </div>
                        <div className=' mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="issue_type">Type: </label>
                            <select className="border rounded" id="issue_type" name="issue_type" value={issue.issue_type} onChange={handleChange}>
                                <option value=""></option>
                                <option value="bug">Bug</option>
                                <option value="story">Story</option>
                                <option value="task">Task</option>
                            </select>
                        </div>
                        <div className=' mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="priority">Priority: </label>
                            <select className="border rounded" id="priority" name="priority" value={issue.priority} onChange={handleChange}>
                                <option value=""></option>
                                <option value="low">Low</option>
                                <option value="mid">Mid</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className=' mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="priority">Assigned to: </label>
                            <select className="border rounded" id="assigneeId" name="assigneeId" value={issue.assigneeId} onChange={handleChange}>
                                <option value=""></option>
                                {assignedList.map((e, index) => <option key={index} value={e.id}>{e.name}</option>)}
                            </select>
                        </div>
                        <div className="text-center">
                            <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                New Issue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default NewIssue