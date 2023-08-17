import axious from 'axios';

const BASEURL = 'https://book-e-sell-node-api.vercel.app/api/user';
const Bookurl = "https://book-e-sell-node-api.vercel.app/api/book/search";

class AuthService {
    Register = async (payload) => {
        return axious.post(`${BASEURL}`, payload);
    };
    Login = async (payload) => {
        return axious.post(`${BASEURL}/login`, payload);
    };
    Search = async (payload) => {
        const url = `${Bookurl}?keyword=${payload.keyword}`;
        return axious.get(url);
    };
}

export default new AuthService();