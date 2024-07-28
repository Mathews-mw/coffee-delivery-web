import { axiosApi } from '../axios-api';

export interface ICreateUserRequest {
	name: string;
	email: string;
	password: string;
}

export async function createUserRequest(data: ICreateUserRequest) {
	const { data: response } = await axiosApi.post('/users', {
		name: data.name,
		email: data.email,
		password: data.password,
	});

	return response;
}
