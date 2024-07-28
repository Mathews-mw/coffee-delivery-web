import { env } from 'process';
import { failure, HttpResponse, success } from '../http-response';

export interface ICreateUserRequest {
	name: string;
	email: string;
	password: string;
}

export interface IFail {
	message: string;
}

export type Outcome<F, S> = F | S;

type ICreateUserResponse = HttpResponse<
	IHttpFailureResponse,
	{
		user: IUser;
	}
>;

export async function createNewUserService(
	data: ICreateUserRequest
): Promise<ICreateUserResponse> {
	try {
		const response = await fetch(`${env.API_BASE_URL}/api/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: data.name,
				email: data.email,
				password: data.password,
			}),
			cache: 'no-cache',
		});

		if (!response.ok || response.status !== 201) {
			const messageResponse = (await response.json()) as IHttpFailureResponse;

			return failure(messageResponse);
		}

		const user = (await response.json()) as IUser;

		return success({
			user,
		});
	} catch (error) {
		console.log('create new user service error: ', error);
		throw error;
	}
}
