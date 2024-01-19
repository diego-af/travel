import {useContext} from 'react';
import {Header} from '../Header';
import * as S from './styles';
import {TravellContext} from '../../provider';
import {FormTravell} from '../Form';
import {ListReserv} from '../ListRersev';

const Content = () => {
	const {tab} = useContext(TravellContext);

	const currenView = new Map([
		[1, <FormTravell />],
		[2, <ListReserv />]
	]);
	return (
		<S.Container>
			<Header />
			{currenView.get(tab)}
		</S.Container>
	);
};

export {Content};
