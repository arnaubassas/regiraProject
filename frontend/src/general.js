const API_URL = 'http://localhost:3000/api';

const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
};
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const createUser = async (credentials) => {
    const opcions = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }

    try {
        const response = await fetch(API_URL + '/register', opcions)
        const data = await response.json()

        if (!data.error) {
            return true
        }


    } catch (e) {
        console.log(e)
    }

    return false

}

const createProject = async (information) => {


    const opcions = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(information)
    }

    try {
        const response = await fetch(API_URL + '/project', opcions)
        console.log(response)
        const data = await response.json()

        return data

    } catch (e) {
        console.log(e)
        return e;
    }


}


export { validateEmail, validatePassword, createUser, createProject }