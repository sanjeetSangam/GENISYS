import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { logo } from "../assets";
import { ButtonComponent } from "../components";
import { MdOutlineExplore, MdCreate } from "react-icons/md";
import { BasicContext } from "../context";

const Nav = styled.div`
	position: sticky;
	top: 0px;
	z-index: 2;
	width: 100%;
	background: ${({ theme }) => theme.navbar};
	padding: 14px 100px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 7px;
		text-transform: uppercase;
		font-weight: 600;
		color: ${({ theme }) => theme.text__primary};
	}

	img {
		width: 20px;
	}

	@media only screen and (max-width: 768px) {
		padding: 10px 12px;
	}
`;

const Navbar = () => {
	const { actionInitiated } = useContext(BasicContext);
	const navigate = useNavigate();
	const loaction = useLocation();
	const path = loaction.pathname.split("/");
	return (
		<Nav>
			<div className="logo">
				<img src={logo} alt="" className="" />
				<p>Genisys</p>
			</div>

			{path[1] === "create-post" ? (
				<ButtonComponent
					text="Explore Feeds"
					leftIcon={<MdOutlineExplore size={20} />}
					type="secondary"
					buttonClickHandler={() => navigate("/")}
					flex
					isLoading={actionInitiated}
					isDisabled={actionInitiated}
				/>
			) : (
				<ButtonComponent
					isDisabled={actionInitiated}
					isLoading={actionInitiated}
					text="Create Post"
					leftIcon={<MdCreate size={20} />}
					flex
					buttonClickHandler={() => {
						navigate("/create-post");
					}}
				/>
			)}
		</Nav>
	);
};

export default Navbar;
