/* eslint-disable @next/next/no-img-element */
'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { axiosApi } from '@/data/axios-api';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ZodErrors } from '@/components/zod-errors';
import { Progress } from '@/components/ui/progress';
import { InputFile } from '@/components/input-file';
import { Textarea } from '@/components/ui/textarea';
import { errorHandler } from '@/utils/error-handler';
import { MultiSelect } from '@/components/multi-select';
import { listingTags } from '@/data/requests/listing-tags';
import { CurrencyInput } from '@/components/currency-input';
import { SubmitFormButton } from '@/components/submit-form-button';
import { revalidateFetchData } from '@/data/revalidate-fetch-data';
import { createProductRequest } from '@/data/requests/create-product';
import { convertImageFileToBase64 } from '@/utils/convert-image-file-to-base64';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Plus } from 'lucide-react';

const createProductFormSchema = z.object({
	name: z.string(),
	price: z.string(),
	description: z.string(),
	tagsId: z.array(z.string()),
});

type CreateProductInputData = z.infer<typeof createProductFormSchema>;

export function CreateProductModal() {
	const {
		control,
		handleSubmit,
		reset,
		register,
		formState: { errors, isSubmitting },
	} = useForm<CreateProductInputData>({
		resolver: zodResolver(createProductFormSchema),
	});

	const [isOpen, setIsOpen] = useState(false);

	const [attachments, setAttachments] = useState<FileList | null>();
	const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [attachmentErrorMessage, setAttachmentErrorMessage] = useState<string | null>(null);

	const queryClient = useQueryClient();

	const { data: tags, isFetching } = useQuery({
		queryKey: ['tags'],
		queryFn: async () => {
			const data = await listingTags();

			return data.map((tag) => {
				return {
					label: tag.tag_name,
					value: tag.id,
				};
			});
		},
		enabled: isOpen,
	});

	const { mutateAsync: createProductRequestFn, isPending } = useMutation({
		mutationFn: createProductRequest,
		async onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['products'] });
			await revalidateFetchData('products');
		},
	});

	async function uploadImageFromBrowser() {
		if (attachments) {
			const base64 = (await convertImageFileToBase64(attachments[0])) as string;
			setImageBase64(base64);
		}
	}

	async function handleCreateProductForm(data: CreateProductInputData) {
		const removeCurrencyFormat = (formattedValue: string): string => {
			return formattedValue.replace(/[^\d,]/g, '').replace(',', '.');
		};

		const convertToFloat = (value: string): number => {
			return parseFloat(removeCurrencyFormat(value));
		};

		try {
			if (!attachments || attachments.length <= 0) {
				setAttachmentErrorMessage(
					'Você precisa incluir uma imagem do produto para cadastrá-lo'
				);
				return;
			}

			const formData = new FormData();

			formData.append('file', attachments[0]);

			const { data: attachmentResponse } = await axiosApi.post<IAttachment>(
				'/attachments/product-image',
				formData,
				{
					headers: { 'content-type': 'multipart/form-data' },
					onUploadProgress(progressEvent) {
						const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
						setUploadProgress(progress);
					},
				}
			);

			await createProductRequestFn({
				name: data.name,
				price: convertToFloat(data.price),
				description: data.description,
				tagsId: data.tagsId,
				attachmentId: attachmentResponse.id,
			});

			toast.success('Produto cadastrado com sucesso');
			setAttachmentErrorMessage(null);
			setImageBase64(undefined);
			setAttachments(null);
			setUploadProgress(0);
			reset();
			setIsOpen(false);
		} catch (error) {
			console.log('erro ao cadastrar produto: ', error);
			errorHandler(error);
		}
	}

	useEffect(() => {
		if (attachments && attachments.length > 0) {
			uploadImageFromBrowser();
		}
	}, [attachments]);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button type="button" size="sm" variant="violet">
					<Plus className="h-4 w-4" />
					Novo produto
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Cadastrar novo produto</DialogTitle>
					<DialogDescription>
						Insira as informações dos campos abaixo para cadastrar um novo produto. É necessário
						incluir uma foto do produto
					</DialogDescription>

					<form
						id="createProductForm"
						onSubmit={handleSubmit(handleCreateProductForm)}
						className="space-y-2.5"
					>
						<div>
							<Label htmlFor="name">Nome do produto</Label>
							<Input id="name" {...register('name')} />
							{errors.name && errors.name.message && (
								<ZodErrors error={[errors.name.message]} />
							)}
						</div>

						<div>
							<Label htmlFor="price">Preço</Label>
							<Controller
								control={control}
								name="price"
								render={({ field }) => {
									return (
										<CurrencyInput
											id="price"
											placeholder="R$ 00,00"
											value={field.value}
											onValueChange={field.onChange}
										/>
									);
								}}
							/>

							{errors.price && errors.price.message && (
								<ZodErrors error={[errors.price.message]} />
							)}
						</div>

						<div>
							<Label htmlFor="description">Descrição</Label>
							<Textarea id="description" cols={4} {...register('description')} />
						</div>

						<div>
							<Label htmlFor="tag">Tag</Label>
							{tags && (
								<Controller
									control={control}
									name="tagsId"
									render={({ field }) => {
										return (
											<MultiSelect
												id="tag"
												options={tags}
												onValueChange={field.onChange}
												defaultValue={field.value}
												value={field.value}
												placeholder="Selecione as tags"
											/>
										);
									}}
								/>
							)}

							{errors.tagsId && errors.tagsId.message && (
								<ZodErrors error={[errors.tagsId.message]} />
							)}
						</div>

						<div className="space-y-2.5">
							<InputFile
								className="hidden"
								accept="image/*"
								type="file"
								onChange={(value) => setAttachments(value.target.files)}
							/>

							{attachments && imageBase64 && (
								<div className="flex items-start justify-between rounded border p-1">
									<div className="flex items-center gap-2">
										<img src={imageBase64} alt="" width={64} height={64} className="rounded" />
										<small className="text-foreground-500">{attachments[0].name}</small>
									</div>
								</div>
							)}
						</div>

						{uploadProgress > 0 && (
							<div>
								<div className="flex w-full justify-between text-sm text-muted-foreground">
									<span>Carregando imagem...</span>
									<span>{uploadProgress}%</span>
								</div>
								<Progress value={uploadProgress} className="h-2" />
							</div>
						)}

						{attachmentErrorMessage && (
							<div>
								<p className="text-center text-rose-400">{attachmentErrorMessage}</p>
							</div>
						)}
					</form>

					<DialogFooter>
						<DialogClose type="button">Cancelar</DialogClose>

						<SubmitFormButton
							form="createProductForm"
							variant="outline"
							text="Salvar"
							loadingText="Salvando..."
							loading={isPending || isSubmitting}
						/>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
