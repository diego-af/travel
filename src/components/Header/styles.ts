import styled from 'styled-components';

export const List = styled.ul`
	margin: 0;
	position: fixed;
	padding: 0;
	width: 100%;
	display: flex;
	justify-content: space-around;
	bottom: 0;
	gap: 24px;
	background-color: #361362;
	list-style: none;
	padding: 8px;
`;
export const Item = styled.li<{active: boolean}>`
	position: relative;
	color: #ffffff;
	font-size: 0.9rem;
	font-weight: ${({active}) => (active ? 'bold' : '500')};
	padding: 5px;
	border-radius: 4px;
	cursor: pointer;

	&::after {
		content: '';
		display: ${({active}) => (active ? 'block' : 'none')};
		position: absolute;
		width: auto;
		height: 2px;
		right: 0;
		left: 0;
		top: 24px;
		background-color: red;
	}
`;
