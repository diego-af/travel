import styled from 'styled-components';

export const Form = styled.form`
	width: 100%;
	padding: 24px;
	max-width: 400px;
	display: flex;
	flex-direction: column;
	background-color: #fafafa;
	border-radius: 8px;
	height: auto;
	margin-top: 46px;
	gap: 16px;
`;

export const Input = styled.input<{error?: string}>`
	width: 100%;
	padding: 8px;
	position: relative;
	border: none;
	border-radius: 5px;
	border: ${({error}) => (error ? '1px solid #ff0000' : ' 1px solid #ccc')};
	&:focus {
		outline: ${({error}) =>
			error ? '1px solid #ff0000' : '1px solid #361362'};
	}
`;
export const Select = styled.select<{error?: string}>`
	padding: 8px;
	border-radius: 5px;
	border: ${({error}) => (error ? '1px solid #ff0000' : '1px solid #ccc')};

	&:focus {
		outline: ${({error}) =>
			error ? '1px solid #ff0000' : '1px solid #361362'};
	}
`;

export const Button = styled.button`
	padding: 12px;
	border: none;
	border-radius: 5px;
	border: 1px solid #ccc;
	background-color: #8234e9;
	color: #fafafafa;

	&:hover {
		background-color: 2px solid #361362;
	}
	cursor: pointer;
`;
export const Title = styled.h6`
	text-align: center;
	font: 600 1rem 'Roboto', sans-serif;
`;

export const Paymethod = styled.div`
	display: flex;
	padding: 16px 12px;
	justify-content: center;
	align-items: center;
	position: relative;
	border: none;
	border-radius: 5px;
	border: 1px solid #ccc;
	overflow: hidden;
`;
export const Label = styled.h6`
	font: 500 1rem 'Roboto', sans-serif;
	color: #361362;
`;

export const InputFile = styled.input`
	position: absolute;
	opacity: 0;
	width: 100%;
	height: 100%;
	cursor: pointer !important;
`;
export const MessageError = styled.span`
	color: red;
	font-size: 10px;
`;
