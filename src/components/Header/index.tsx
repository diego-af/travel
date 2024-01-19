import {useContext, useState} from 'react';
import * as S from './styles';
import {TravellContext} from '../../provider';

const Header = () => {
	const {setTab} = useContext(TravellContext);
	const [active, setActive] = useState(1);
	const items = [
		{
			name: 'Adicionar',
			id: 1
		},
		{
			name: 'Ver reservas',
			id: 2
		}
	];

	const handleClick = (id: number) => {
		setTab(id);
		setActive(id);
	};
	return (
		<S.List>
			{items.map((item) => (
				<S.Item
					key={item.id}
					onClick={() => handleClick(item.id)}
					active={active === item.id}
				>
					{item.name}
				</S.Item>
			))}
		</S.List>
	);
};

export {Header};
