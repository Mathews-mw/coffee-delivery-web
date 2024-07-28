'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ZodErrors } from '@/components/zod-errors';
import { errorHandler } from '@/utils/error-handler';
import { SubmitFormButton } from '@/components/submit-form-button';
import { createUserRequest } from '@/data/requests/create-user-request';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

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

type RegisterForm = z.infer<typeof schemaRegister>;

export default function SignUpPage() {
	const {
		handleSubmit,
		register,
		formState: { isSubmitting, errors },
	} = useForm<RegisterForm>({
		resolver: zodResolver(schemaRegister),
	});

	const [isPasswordMatchErrorMessage, setIsPasswordMatchErrorMessage] = useState<
		string | undefined
	>(undefined);

	const router = useRouter();

	const { mutateAsync: createUserFn, isPending } = useMutation({
		mutationFn: createUserRequest,
	});

	async function handleRegisterForm(data: RegisterForm) {
		if (data.password !== data.confirmPassword) {
			return setIsPasswordMatchErrorMessage('As senhas precisam ser idênticas');
		} else {
			setIsPasswordMatchErrorMessage(undefined);
		}

		try {
			await createUserFn({
				name: data.name,
				email: data.email,
				password: data.password,
			});

			toast.success('Seu cadastro foi realizado com sucesso', {
				action: {
					label: 'Voltar para login',
					onClick: () => router.replace(`/sign-in?email=${data.email}`),
				},
			});
		} catch (error) {
			errorHandler(error);
		}
	}

	return (
		<form onSubmit={handleSubmit(handleRegisterForm)} className="space-y-1">
			<Card>
				<CardHeader>
					<CardTitle className="text-center">Criar conta</CardTitle>
					<CardDescription>
						Faça seu cadastro para fazer suas compras e acompanhar seus pedidos
					</CardDescription>
				</CardHeader>

				<CardContent>
					<div className="space-y-4">
						<div>
							<Label>Nome</Label>
							<Input id="name" {...register('name')} />
							{errors.name?.message && <ZodErrors error={[errors.name?.message]} />}
						</div>

						<div>
							<Label>E-mail</Label>
							<Input id="email" type="email" {...register('email')} />
							{errors.email?.message && <ZodErrors error={[errors.email?.message]} />}
						</div>

						<div>
							<Label>Senha</Label>
							<Input id="password" type="password" {...register('password')} />
							{errors.password?.message && <ZodErrors error={[errors.password?.message]} />}
						</div>

						<div>
							<Label>Confirmar senha</Label>
							<Input id="confirmPassword" type="password" {...register('confirmPassword')} />
							{errors.confirmPassword?.message && (
								<ZodErrors error={[errors.confirmPassword?.message]} />
							)}
							{isPasswordMatchErrorMessage && (
								<ZodErrors error={[isPasswordMatchErrorMessage]} />
							)}
						</div>
					</div>
				</CardContent>

				<CardFooter>
					<div className="flex w-full justify-end">
						<SubmitFormButton
							text="Cadastrar"
							loadingText="Salvando..."
							loading={isPending || isSubmitting}
						/>
					</div>
				</CardFooter>
			</Card>
		</form>
	);
}
