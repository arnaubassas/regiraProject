const API_URL = 'http://localhost:3000/api';

const postApi = async (credentials, link) => {
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }

    try {
        const response = await fetch(API_URL + link, options)
        const data = await response.json()
        return data

    } catch (e) {
        return e;
    }
}

const getApi = async (link) => {
    const options = {
        credentials: 'include',
    }

    try {
        const response = await fetch(API_URL + link, options)
        const data = await response.json()
        return data;
    } catch (e) {
        return e;
    }
}

const deleteApi = async (link) => {
    const options = {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const response = await fetch(API_URL + link, options)
        const data = await response.json()
        return data

    } catch (e) {
        return e;
    }
}

const patchApi = async (link, state) => {
    const options = {
        credentials: 'include',
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ state })
    }
    try {
        const response = await fetch(API_URL + link, options)
        const data = await response.json()
        return data

    } catch (e) {
        return e;
    }
}


const createUser = async (credentials) => {
    const registerLink = '/register'

    const data = await postApi(credentials, registerLink)
    if (!data.error) return true
    return false;
}

const createProject = async (information) => {
    const projectLink = '/project'

    return (postApi(information, projectLink));
}

const createIssue = async (information, projectid) => {
    const issueLink = '/issue/project/' + projectid

    return (postApi(information, issueLink));
}

const login = async (credentials) => {
    const loginLink = '/login'

    return (postApi(credentials, loginLink));
}



const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
};
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};


export { validateEmail, validatePassword, createUser, createProject, login, createIssue, getApi, deleteApi, patchApi }