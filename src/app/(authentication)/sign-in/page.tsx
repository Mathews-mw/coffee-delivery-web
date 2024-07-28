'use client';

import { z } from 'zod';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { Loader2 } from 'lucide-react';

const signInForm = z.object({
	email: z.string().email({ message: 'E-mail inválido' }),
	password: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
});

type SignInForm = z.infer<typeof signInForm>;

export default function SignInPage() {
	const searchParams = useSearchParams();

	const {
		handleSubmit,
		register,
		formState: { isSubmitting, errors },
	} = useForm<SignInForm>({
		resolver: zodResolver(signInForm),
		defaultValues: {
			email: searchParams.get('email') ?? '',
		},
	});

	const router = useRouter();
	const { toast } = useToast();

	async function handleSignInForm(data: SignInForm) {
		try {
			const result = await signIn('credentials', {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (result?.ok === false && result.status === 401) {
				return toast({
					title: 'Ops! Credenciais inválidas.',
					description: 'Verifique o e-mail e senha informados',
				});
			}

			router.replace('/');
		} catch (error) {
			console.log('error: ', error);
			return toast({
				title: 'Ops! Credenciais inválidas.',
			});
		}
	}

	return (
		<div className="space-y-1">
			<Card>
				<CardHeader>
					<CardTitle className="text-center">Bem-vindo</CardTitle>
					<CardDescription>
						Faça seu login para ter a melhor experiência dentro da plataforma
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit(handleSignInForm)} className="space-y-4">
						<div>
							<Label>E-mail</Label>
							<Input id="email" {...register('email')} />
						</div>

						<div>
							<Label>Senha</Label>
							<Input id="password" type="password" {...register('password')} />
						</div>

						<div className="flex w-full justify-end">
							<Button
								type="submit"
								disabled={isSubmitting}
								className="flex items-center justify-center gap-1"
							>
								Entrar
								{isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>

			<div className="flex w-full justify-center gap-2">
				<span>Não tem cadastro?</span>
				<Link href="/sign-up" className="underline">
					Crie uma conta
				</Link>
			</div>
		</div>
	);
}
