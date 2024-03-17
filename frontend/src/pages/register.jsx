import { useState, useEffect } from "react";

import { useNavigate } from 'react-router-dom';


const API_URL = 'http://localhost:3000/api';

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

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(password);
    };
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

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

    const registerOn = (e) => {
        e.preventDefault();

        const opcions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }

        fetch(API_URL + '/register', opcions)
            .then(resp => resp.json())
            .then(data => {
                if (!data.error) {
                    redirect('/login')
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <div className="w-full max-w-xs m-auto">
                <form onSubmit={registerOn} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-center">Sign Up</h1>
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
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Sign up
                            </button>
                            : <button disabled={true} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Sign up
                            </button>
                        }
                    </div>
                </form>

            </div>
        </>
    )

}

export default Register