import styled from 'styled-components';

export const Content = styled.div`
	width: 100%;
	padding: 24px;
	max-width: 700px;
	display: flex;
	flex-direction: column;
	background-color: #fafafa;
	border-radius: 8px;
	height: auto;
	margin-top: 46px;
	gap: 16px;
`;
export const Title = styled.h3``;
export const ContentMonths = styled.div`
	width: 100%;
`;
export const List = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;

	display: flex;
	gap: 8px;
	align-items: center;
	overflow-x: scroll;
	padding-right: 12px;
	&::-webkit-scrollbar {
		display: none;
	}
`;
export const Item = styled.li<{active: boolean}>`
	background-color: ${({active}) => (active ? '#b789fb' : '#361362')};
	display: flex;
	gap: 4px;
	align-items: center;
	color: #fffffa;
	padding: 8px;
	border-radius: 8px;
	width: fit-content;
	cursor: pointer;
	font-weight: ${({active}) => (active ? '600' : '400')};

	&:hover {
		background-color: #b789fb;
	}
`;
export const ListPersons = styled.ul`
	list-style: none;
	display: flex;
	flex-direction: column;
	margin: 0;
	width: 100%;
`;
export const Person = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	border-bottom: 1px solid #ccc;
	padding-bottom: 4px;
	font-weight: 500;
`;

export const Name = styled.span`
	flex: 1;
	font-weight: 500;
`;
export const Valor = styled.span`
	flex: 1;
	text-align: end;
	font-weight: 400;
`;
export const Status = styled.span`
	flex: 1;
	text-align: center;
	font-weight: 400;
`;

export const Link = styled.a`
	cursor: pointer;
`;

export const TotalContent = styled.div`
	background-color: #fafafa;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
export const Quantity = styled.span`
	font-weight: 700;
`;
export const ValueTotal = styled.span``;
