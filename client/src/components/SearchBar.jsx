import React from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
	max-width: 550px;
	display: flex;
	width: 90%;
	border: 1px solid gray;
	border-radius: 8px;
	padding: 12px 16px;
	cursor: pointer;
	gap: 6px;
	align-items: center;

	.search__box {
		border: none;
		outline: none;
		width: 100%;
		color: inherit;
		background: transparent;
	}
`;

const SearchBar = ({ handleSearches }) => {
	return (
		<SearchBarContainer>
			<input
				className="search__box"
				type="text"
				name=""
				id=""
				placeholder="Search with prompt or name"
				onChange={(e) => handleSearches(e)}
			/>
		</SearchBarContainer>
	);
};

export default SearchBar;
