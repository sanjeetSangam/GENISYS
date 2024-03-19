import React from "react";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	gap: 4px;
`;

const Label = styled.label`
	font-size: 12px;
	color: ${(theme) => theme.text__primary};
	padding: 0px 4px;
	text-transform: uppercase;
`;

const OutlinedInput = styled.div`
	border-radius: 8px;
	border: 0.5px solid ${({ theme }) => theme.text__primary};
	background: transparent;
	color: ${({ theme }) => theme.text__primary};
	outline: none;
	padding: 10px;
	display: flex;
	align-items: center;
	color: white;
	gap: 12px;
	transition: all 0.3s ease;
	&:focus-within {
		border-color: ${({ theme }) => theme.primary};
	}
`;
const Input = styled.input`
	border-radius: 8px;
	width: 100%;
	border: none;
	font-size: 14px;
	padding: 5px;
	background: transparent;
	color: ${({ theme }) => theme.text__primary};
	&:focus {
		outline: none;
	}
	&:-webkit-autofill:focus {
		transition: background-color 0s 600000s, color 0s 600000s !important;
	}
	&:-webkit-autofill {
		transition: background-color 0s 600000s, color 0s 600000s !important;
	}
`;

const TextInput = ({
	label,
	placeholder,
	name,
	value,
	handleInputChange,
	textArea,
	rows,
	columns,
}) => {
	return (
		<Container>
			<Label>{label}</Label>
			<OutlinedInput>
				<Input
					as={textArea ? "textarea" : "input"}
					name={name}
					rows={rows}
					columns={columns}
					placeholder={placeholder}
					value={value}
					onChange={(e) => handleInputChange(e)}
				/>
			</OutlinedInput>
		</Container>
	);
};

export default TextInput;
