import { useState, useContext } from "react";

import { useNavigate } from 'react-router-dom';
import Contexte from "../components/Contexte";
import { login } from "../general";


const Login = () => {

    const { setLoguejat } = useContext(Contexte)
    const [credencials, setCredencials] = useState({ email: "", password: "" })
    const redirect = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredencials({
            ...credencials,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await login(credencials);

        if (!data.error) {
            setLoguejat(data)
            redirect('/projects')
        }

    }


    return (
        <>
            <div className="flex p-8 justify-center">
                <div className="flex justify-center w-1/3 bg-white shadow-md rounded-xl px-4 py-8 mb-4 min-w-96 ">
                    <form onSubmit={handleSubmit} className="bg-white px-8 pt-6 pb-8 mb-4 min-w-96">
                        <h1 className="text-center text-3xl font-semibold pb-8">Login</h1>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                onChange={handleChange}
                                name="email"
                                value={credencials.email}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Username" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                onChange={handleChange}
                                name="password"
                                value={credencials.password}
                                className="shadow appearance-none border
                    rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                        </div>
                        <div className="text-center">
                            <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Sign in
                            </button>

                        </div>
                    </form>

                </div>
            </div>
        </>
    )

}

export default Login