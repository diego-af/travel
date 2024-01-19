import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	height: 16px;
	border-radius: 50%;
	border: 1px solid #41c78f;
	border-top-color: transparent;
	animation: rot1 1.2s linear infinite;

	@keyframes rot1 {
		to {
			transform: rotate(360deg);
		}
	}
`;
