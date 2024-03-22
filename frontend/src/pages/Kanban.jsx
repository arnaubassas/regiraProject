import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Contexte from "../components/Contexte";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Box from '../components/kanba/Box';
import Item from '../components/kanba/Item';


const CAIXES = [
    { state: 'backlog', titol: 'Backlog' },
    { state: 'in progress', titol: 'In progress' },
    { state: 'review', titol: 'Review' },
    { state: 'testing', titol: 'Testing' },
    { state: 'done', titol: 'Done' },
    { state: 'wont to do', titol: 'Won\'t do' }
];


const Kanban = () => {

    const [projecte, setProjecte] = useState(null);
    const [error, setError] = useState('');
    const redirect = useNavigate();
    const [actualitza, setActualitza] = useState(0)

    const { id } = useParams()

    const { logout, API_URL } = useContext(Contexte)

    const mouItem = (item, state) => {
        const opcions = {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ state })
        }
        fetch(API_URL + '/issue/' + item.id, opcions)
            .then(r => r.json())
            .then(data => {
                console.log(data.error)
                if (data.error == 'Unauthorized') logout();
                else setActualitza(actualitza + 1);
            })
            .catch(err => console.log(err))
    }

    const eliminaItem = (item) => {
        const opcions = {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(API_URL + '/issue/' + item.id, opcions)
            .then(r => r.json())
            .then(data => {
                if (data.error == 'Unauthorized') logout();
                else setActualitza(actualitza + 1);
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        const opcions = {
            credentials: 'include',
        }
        fetch(API_URL + '/project/' + id + '/issues', opcions)
            .then(resp => resp.json())
            .then(data => {
                if (data.error == 'Unauthorized') logout();

                if (data.error) {
                    setError(error)
                } else {
                    setProjecte(data)
                }
            })
            .catch(err => {
                console.log(err);
                setError(err)
            })
    }, [actualitza, error, API_URL, id, logout])

    if (error) {
        return <h1 className='text-red-500'>{error}</h1>
    }

    if (!projecte) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <div className="flex flex-col justify-between items-baseline gap-y-4 px-16">
                <div className="self-center text-3xl"><span className="font-semibold underline">Projecte:</span> {projecte?.name}</div>
                <button className="border py-2 px-4 rounded-full bg-blue-400 hover:bg-blue-500" onClick={() => redirect(`/issue/new/${id}`)}>New Issue</button>
            </div>
            <hr />
            <br />
            <br />

            <DndProvider backend={HTML5Backend}>
                <div className="grid grid-cols-3 gap-3 px-16 pb-8">
                    {
                        CAIXES.map(caixa => (
                            <Box key={caixa.state} caixa={caixa} mouItem={mouItem}  >
                                {
                                    projecte.issues?.filter(e => e.state == caixa.state).map(e => <Item key={e.id} eliminaItem={eliminaItem} data={e} />)
                                }
                            </Box>
                        ))
                    }
                </div>
            </DndProvider>
        </>
    )
}

export default Kanban