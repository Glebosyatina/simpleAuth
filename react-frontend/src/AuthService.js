import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api";

class AuthService {
    register(user) {
        return axios.post(`${API_BASE_URL}/register`, user);
    }

    login(credentials) {
        return axios.post(`${API_BASE_URL}/login`, credentials);
    }

    saveUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    logout() {
        localStorage.removeItem('user');
    }

    getAuthHeader() {
        const user = this.getUser();
        if (user && user.password) {
            return {
                headers: {
                    Authorization: `Basic ${btoa(`${user.email}:${user.password}`)}`
                }
            };
        }
        return {};
    }

    getTasks() {
        return axios.get(`${API_BASE_URL}/tasks`, this.getAuthHeader());
    }

    createTask(task) {
        return axios.post(`${API_BASE_URL}/tasks`, task, this.getAuthHeader());
    }

    updateTask(id, task) {
        return axios.put(`${API_BASE_URL}/tasks/${id}`, task, this.getAuthHeader());
    }

    deleteTask(id) {
        return axios.delete(`${API_BASE_URL}/tasks/${id}`, this.getAuthHeader());
    }
}

export default new AuthService();