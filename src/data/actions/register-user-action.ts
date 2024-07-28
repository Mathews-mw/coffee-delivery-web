'use server';

import { redirect } from 'next/navigation';
import { typeToFlattenedError, z } from 'zod';

import { createNewUserService } from '../services/create-new-user-service';

const schemaRegister = z.object({
	name: z.string().min(1, { message: 'Por favor, preencher o campo obrigatório.' }),
	email: z.string().email({
		message: 'Por favor, insira um e-mail válido',
	}),
	password: z.string({ required_error: 'Por favor, preencher o campo obrigatório' }).min(6, {
		message: 'A senha deve conter no mínimo 6 caracteres',
	}),
	confirmPassword: z.string({ required_error: 'Por favor, preencher o campo obrigatório.' }),
});

type SchemaRegister = z.infer<typeof schemaRegister>;

export interface RegisterState {
	data: SchemaRegister | null;
	zodErrors?: typeToFlattenedError<SchemaRegister>;
	confirmPasswordError?: string;
	message?: string;
	isError?: boolean;
}

export async function registerUserAction(
	prevState: RegisterState,
	formData: FormData
): Promise<RegisterState> {
	const validatedFields = schemaRegister.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
		confirmPassword: formData.get('confirmPassword'),
	});

	if (!validatedFields.success) {
		return {
			...prevState,
			zodErrors: validatedFields.error.flatten(),
			message: 'Falha ao preencher campos do formulário. Erro ao tentar cadastrar',
			isError: true,
		};
	}

	const isPasswordsMatch =
		validatedFields.data.password === validatedFields.data.confirmPassword;

	if (!isPasswordsMatch) {
		return {
			...prevState,
			confirmPasswordError: 'As senhas precisam ser idênticas',
			message: 'Falha ao preencher campos do formulário. Erro ao tentar cadastrar',
			isError: true,
		};
	}

	const responseData = await createNewUserService({
		name: validatedFields.data.name,
		email: validatedFields.data.email,
		password: validatedFields.data.password,
	});

	if (responseData.isFalse()) {
		return {
			...prevState,
			message: responseData.value.message,
			isError: true,
		};
	}

	if (!responseData) {
		return {
			...prevState,
			message: 'Ops! Algo deu errado. Por favor, tente novamente.',
			isError: true,
		};
	}

	return {
		...prevState,
		isError: false,
		zodErrors: undefined,
		confirmPasswordError: undefined,
		message: '',
	};
}
