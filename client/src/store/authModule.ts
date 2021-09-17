import { Module } from 'vuex';
import { IUser, ILogin, IAuthResponse } from '@/models';
import { AuthService, UserService } from '../services';
import axios from 'axios';
import { API_URL } from '@/http';

interface IRegistration {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

// eslint-disable-next-line
const authModule: Module<any, any> = {
    state: {
        user: {} as IUser,
        isAuth: false,
        isLoading: false,
        users: [] as IUser[],
        errors: [],
    },
    mutations: {
        SET_AUTH(state, payload: boolean) {
            state.isAuth = payload;
        },
        SET_USER(state, payload: IUser) {
            state.user = payload;
        },
        SET_LOADING(state, payload: boolean) {
            state.isLoading = payload;
        },
        SET_USERS(state, payload: IUser[]) {
            state.users = payload;
        },
        SET_ERRORS(state, payload: []) {
            state.errors.push(payload);
        },
    },
    actions: {
        async LOGIN({ commit }, { email, password }: ILogin) {
            try {
                const response = await AuthService.login(email, password);

                localStorage.setItem('accessToken', response.data.accessToken);
                commit('SET_AUTH', true);
                commit('SET_USER', response.data.user);
            } catch (e) {
                commit('SET_ERRORS', { LOGIN: e.response?.data?.message });
            }
        },
        async REGISTRATION(
            { commit },
            { name, email, password, passwordConfirmation }: IRegistration
        ) {
            try {
                const response = await AuthService.registration(
                    name,
                    email,
                    password,
                    passwordConfirmation
                );

                localStorage.setItem('accessToken', response.data.accessToken);
                commit('SET_AUTH', true);
                commit('SET_USER', response.data.user);
            } catch (e) {
                commit('SET_ERRORS', {
                    REGISTRATION: e.response?.data?.message,
                });
            }
        },
        async LOGOUT({ commit }) {
            try {
                await AuthService.logout();
                localStorage.removeItem('accessToken');
                commit('SET_AUTH', false);
                commit('SET_USER', {} as IUser);
            } catch (e) {
                commit('SET_ERRORS', { LOGOUT: e.response?.data?.message });
            }
        },
        async CHECK_AUTH({ commit }) {
            commit('SET_LOADING', true);

            try {
                const response = await axios.get<IAuthResponse>(
                    `${API_URL}/refresh`,
                    {
                        withCredentials: true,
                    }
                );

                localStorage.setItem('accessToken', response.data.accessToken);
                commit('SET_AUTH', true);
                commit('SET_USER', response.data.user);
            } catch (e) {
                commit('SET_ERRORS', { CHECK_AUTH: e.response?.data?.message });
            } finally {
                commit('SET_LOADING', false);
            }
        },
        async GET_USERS({ commit }) {
            try {
                const response = await UserService.fetchUsers();
                commit('SET_USERS', response.data);
            } catch (e) {
                commit('SET_ERRORS', { GET_USERS: e.response?.data?.message });
            }
        },
    },
    getters: {
        user(store) {
            return store.user;
        },
        isAuth(store) {
            return store.isAuth;
        },
        isLoading(store) {
            return store.isLoading;
        },
        users(store) {
            return store.users;
        },
        get_errors(store) {
            return store.errors;
        },
    },
};

export default authModule;
