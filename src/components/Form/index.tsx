import {Loading} from '../Loading';
import * as S from './styles';
import {ChangeEvent, Suspense, useState} from 'react';
import {FileDownIcon} from 'lucide-react';
import {storage, db} from '../../server/firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {v4 as uuidV4} from 'uuid';
import {addDoc, collection} from 'firebase/firestore';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {CalendarCheck} from 'lucide-react';
const schema = z.object({
	name: z
		.string({
			required_error: 'Nome é obrigatório'
		})
		.min(4, 'Nome deve ter no minimo 4 caracteres')
		.max(25),
	month: z
		.string({
			required_error: 'Mês é obrigatório'
		})
		.min(3, 'Mês é obrigatório'),
	price: z
		.string({
			required_error: 'Preço é obrigatório'
		})
		.min(1, 'Preço é obrigatório'),
	status: z
		.string({
			required_error: 'Status é obrigatório',
			invalid_type_error: 'Age must be a number'
		})
		.min(1, 'Status é obrigatório')
});

type FormData = z.infer<typeof schema>;
const FormTravell = () => {
	const [file, setFile] = useState<File | null>(null);
	const [url, setUrl] = useState<string | null>(null);
	const [requestLoading, setLoading] = useState(false);
	const months = [
		{
			id: 1,
			name: 'Janeiro'
		},
		{
			id: 2,
			name: 'Fevereiro'
		},
		{
			id: 3,
			name: 'Março'
		},
		{
			id: 4,
			name: 'Abril'
		},
		{
			id: 5,
			name: 'Maio'
		},
		{
			id: 6,
			name: 'Junho'
		},
		{
			id: 7,
			name: 'Julho'
		},
		{
			id: 8,
			name: 'Agosto'
		},
		{
			id: 9,
			name: 'Setembro'
		},
		{
			id: 10,
			name: 'Outubro'
		},
		{
			id: 11,
			name: 'Novembro'
		},
		{
			id: 12,
			name: 'Dezembro'
		}
	];

	const status = [
		{
			id: 1,
			name: 'Pago'
		},
		{
			id: 2,
			name: 'Não pago'
		}
	];

	const {
		register,
		handleSubmit,
		formState: {errors},
		reset
	} = useForm<FormData>({
		resolver: zodResolver(schema)
	});
	const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			const image = e.target.files[0];

			await setFile(image);

			if (
				image.type == 'application/pdf' ||
				image.type === 'image/png' ||
				image.type === 'image/jpeg'
			) {
				sendFile(image);
			} else {
				toast.info('Selecione uma imagem ou arquivo pdf');
				console.log('arquivo invalido');
			}
		}
	};

	const onSubmit = async (data: FormData) => {
		setLoading(true);
		await addDoc(collection(db, 'travels'), {
			name: data.name,
			month: data.month,
			price: data.price,
			status: data.status,
			image: url
		})
			.then(() => {
				reset();

				setFile(null);
				setLoading(false);
				toast.success('Cadastro feito', {
					position: 'top-right',
					icon: <CalendarCheck color='#fff' />,
					style: {
						backgroundColor: 'purple',
						color: '#fff',
						border: 'none'
					}
				});
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				toast.error('Erro ao cadastrar');
			});
	};

	const sendFile = async (image: File) => {
		if (image) {
			const uid = uuidV4();
			const storageRef = ref(storage, `images/${image?.name}/${uid}`);
			uploadBytes(storageRef, image).then((snapshot) => {
				getDownloadURL(snapshot.ref).then((url) => {
					setUrl(url);
				});
			});
		}
	};

	return (
		<Suspense fallback={<Loading />}>
			<S.Form onSubmit={handleSubmit(onSubmit)}>
				<S.Title>Infomações Piauí 3.0 🛩️🏖️</S.Title>
				<S.Input
					type='text'
					{...register('name')}
					name='name'
					error={errors.name?.message}
					placeholder='Nome'
				/>
				{errors.name && <S.MessageError>{errors.name.message}</S.MessageError>}
				<S.Select
					{...register('month')}
					name='month'
					error={errors.month?.message}
				>
					<option value=''>Selecione o mês</option>
					{months.map((month) => (
						<option key={month.id} value={month.name}>
							{month.name}
						</option>
					))}
				</S.Select>
				{errors.month && (
					<S.MessageError>{errors?.month?.message}</S.MessageError>
				)}
				<S.Input
					type='number'
					{...register('price')}
					name='price'
					placeholder='Valor despositado'
					error={errors.price?.message}
				/>
				{errors.price && (
					<S.MessageError>{errors?.price?.message}</S.MessageError>
				)}
				<S.Select
					{...register('status')}
					name='status'
					error={errors.status?.message}
				>
					<option value=''>Selecione o status</option>
					{status.map((month) => (
						<option key={month.id} value={month.name}>
							{month.name}
						</option>
					))}
				</S.Select>
				{errors.status && (
					<S.MessageError>{errors?.status?.message}</S.MessageError>
				)}
				<S.Paymethod>
					{file ? (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<S.Label>{file.name}</S.Label>

							<FileDownIcon color='#8234e9' size={32} />
						</div>
					) : (
						<S.Label>Selecione o comprovante</S.Label>
					)}

					<S.InputFile
						type='file'
						accept='.pdf, image/png, image/jpeg'
						onChange={handleFile}
					/>
				</S.Paymethod>

				<S.Button
					type='submit'
					disabled={requestLoading}
					style={{opacity: requestLoading ? 0.5 : 1}}
				>
					{requestLoading ? 'Cadastrando...' : 'Cadastrar'}
				</S.Button>
			</S.Form>
		</Suspense>
	);
};

export {FormTravell};
