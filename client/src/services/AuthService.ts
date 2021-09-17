import $api from '../http';
import { AxiosResponse } from 'axios';
import { IAuthResponse } from '@/models';

export class AuthService {
    static async login(
        email: string,
        password: string
    ): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/login', { email, password });
    }

    static async registration(
        name: string,
        email: string,
        password: string,
        passwordConfirmation: string
    ): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/registration', {
            name,
            email,
            password,
            passwordConfirmation,
        });
    }

    static async logout(): Promise<void> {
        return $api.post('/logout');
    }
}
