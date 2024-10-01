export const baseUrl = 'https://employee-system-nodejs.vercel.app/api';

export const headers = {
    headers: {
        "Authorization" : "Bearer " + localStorage.getItem('token')
    }
}   