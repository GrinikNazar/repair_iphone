import axios from "axios";

export default class Login {
    static async login(username, password) {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: username,
        password: password
        })
        return response
    }

}