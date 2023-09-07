import axios from "axios";

export default class Login {
    static async login(username, password) {
        const response = await axios.post('api/token/', {
        username: username,
        password: password
        })
        return response
    }

}