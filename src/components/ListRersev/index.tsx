import {Suspense, useContext, useEffect, useState} from 'react';
import * as S from './style';
import {CalendarDays, DownloadIcon, Ban} from 'lucide-react';
import {collection, getDocs, query} from 'firebase/firestore';
import {db} from '../../server/firebase';
import {TravellContext, TravelsData} from '../../provider';
import {Loading} from '../Loading';

const ListReserv = () => {
	const {travels, setTravels} = useContext(TravellContext);
	const [active, setActive] = useState('Todos');
	const [travelTemp, setTemp] = useState<TravelsData[] | []>([]);

	const travelRender = active === 'Todos' ? travels : travelTemp;
	const months = [
		{
			id: 0,
			name: 'Todos'
		},
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

	useEffect(() => {
		function getTravels() {
			const travelRef = collection(db, 'travels');

			const queryRef = query(travelRef);

			getDocs(queryRef).then((spanshot) => {
				const travelsTemp = [] as TravelsData[];

				spanshot.forEach((doc) => {
					travelsTemp.push({
						image: doc.data().image,
						month: doc.data().month,
						name: doc.data().name,
						price: doc.data().price,
						status: doc.data().status
					});
				});
				setTravels(travelsTemp);
			});
		}

		getTravels();
	}, []);

	const handleClick = (name: string) => {
		setActive(name);

		filteredTravels(name);
	};

	const filteredTravels = (month: string) => {
		if (month === 'Todos') {
			setTravels(travels);
		} else {
			const filtered = travels.filter((item) => item.month === month);
			setTemp(filtered);
		}
	};

	const formatMoney = (value: number) => {
		const formatter = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		});
		return formatter.format(value);
	};

	const calculateTotal = () => {
		const elements = travels.map((item) => {
			return {
				total: Number(item.price),
				name: item.name
			};
		});

		const elementTemp = travelTemp.map((item) => {
			return {
				total: Number(item.price),
				name: item.name
			};
		});

		const travelCalculate = active === 'Todos' ? elements : elementTemp;
		const total = travelCalculate.reduce(
			(total, item) => total + item.total,
			0
		);

		return formatMoney(Number(total));
	};
	return (
		<S.Content>
			<S.Title>Reservas por Mês selecionado</S.Title>
			<S.ContentMonths>
				<S.List>
					{months.map((item) => (
						<S.Item
							key={item.id}
							onClick={() => handleClick(item.name)}
							active={active === item.name}
						>
							<CalendarDays size={16} color='#fff' />
							{item.name}
						</S.Item>
					))}
				</S.List>
			</S.ContentMonths>

			<Suspense fallback={<Loading />}>
				<S.ListPersons>
					{travelRender &&
						travelRender.map((item) => (
							<S.Person key={item.name}>
								<S.Name>{item?.name}</S.Name>
								<S.Valor>{formatMoney(Number(item?.price))}</S.Valor>
								<S.Status>{item?.status}</S.Status>
								{item.image ? (
									<S.Link href={item.image} download>
										<DownloadIcon color='#b789fb' style={{cursor: 'pointer'}} />
									</S.Link>
								) : (
									<S.Link href={item.image} download>
										<Ban color='red' />
									</S.Link>
								)}
							</S.Person>
						))}
				</S.ListPersons>
			</Suspense>

			<S.TotalContent>
				<S.Quantity>Total de Reservas: {travelRender.length}</S.Quantity>
				<div
					style={{
						display: 'flex',
						alignItems: 'flex-start',
						flexDirection: 'column'
					}}
				>
					<span style={{fontWeight: 'bold'}}>Total:</span>
					<S.ValueTotal>{calculateTotal()}</S.ValueTotal>
				</div>
			</S.TotalContent>
		</S.Content>
	);
};

export {ListReserv};
