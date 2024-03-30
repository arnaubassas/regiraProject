import { useState, useEffect } from "react";


import { validateEmail, validatePassword, createUser } from '../general'
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [validation, setValidation] = useState(false);
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    const redirect = useNavigate();


    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    }

    useEffect(() => {
        if (validateEmail(credentials.email)) {
            if (validatePassword(credentials.password)) {
                setValidation(true)
            } else {
                setValidation(false)
            }
        } else {
            setValidation(false)
        }
    }, [credentials])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await createUser(credentials);

        if (success) redirect('/login')
    }


    return (
        <>
            <div className="flex p-8 justify-center">
                <div className="flex justify-center w-1/3 bg-white shadow-md rounded-xl px-4 py-8 mb-4 min-w-96">
                    <form onSubmit={handleSubmit} className="bg-white px-8 pt-6 pb-8 mb-4 min-w-96">
                        <h1 className="text-center text-3xl font-semibold pb-8">Sign Up</h1>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                name
                            </label>
                            <input
                                onChange={handleChange}
                                name="name"
                                value={credentials.name}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="user" type="text" placeholder="Username" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                onChange={handleChange}
                                name="email"
                                value={credentials.email}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                onChange={handleChange}
                                name="password"
                                value={credentials.password} className="shadow appearance-none border
                    rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                        </div>
                        <div className="text-center">
                            {validation ?
                                <button className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Sign up
                                </button>
                                : <button disabled={true} className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Sign up
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default Register