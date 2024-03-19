import React from "react";
import styled from "styled-components";

const Button = styled.button`
	border-radius: 10px;
	border: none;
	color: white;
	font-size: 14px;
	cursor: ${({ isloading, isdisabled }) => (isloading || isdisabled ? "not-allowed" : "pointer")};
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 6px;
	height: min-content;
	padding: 6px 15px;

	@media (max-width: 600px) {
		padding: 8px 12px;
	}

	${({ type, theme }) =>
		type === "secondary" ? `background: ${theme.secondary};` : `background: ${theme.primary};`}

	${({ isloading }) => isloading === 1 && `opacity: 0.8;`}
  	${({ isdisabled }) => isdisabled === 1 && `opacity: 0.4;`}
`;

const ButtonComponent = ({
	text,
	isLoading = false,
	isDisabled = false,
	rightIcon,
	leftIcon,
	type,
	buttonClickHandler,
}) => {
	const disableButton = isDisabled || isLoading;

	return (
		<Button
			onClick={() => buttonClickHandler && !disableButton && buttonClickHandler()}
			isdisabled={disableButton ? 1 : 0}
			type={type}
			isloading={isLoading ? 1 : 0}
			disabled={disableButton}
		>
			{leftIcon}
			{text}
			{rightIcon}
		</Button>
	);
};

export default ButtonComponent;
