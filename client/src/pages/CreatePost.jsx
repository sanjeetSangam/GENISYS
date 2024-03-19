import React, { useState } from "react";
import styled from "styled-components";
import { FormField } from "../components";
import { preview } from "../assets";
import Loader from "react-js-loader";

const CreatePost = () => {
	const [generatedImage, setGeneratedImage] = useState(preview);
	const [generatingImage, setGeneratingImage] = useState(false);
	const [postingImage, setPostingImage] = useState(false);

	return (
		<Container>
			{postingImage && (
				<div className="loading">
					<Loader type="bubble-top" title={"Posting to Community . . ."} size={50} />
				</div>
			)}
			<div className="generate__image-form">
				<FormField
					setGeneratedImage={setGeneratedImage}
					setGeneratingImage={setGeneratingImage}
					setPostingImage={setPostingImage}
				/>
			</div>
			<div className="generated__image-preview">
				{generatingImage && (
					<div className="loader__class">
						<Loader type="bubble-spin" title={"Generating..."} size={100} />
					</div>
				)}
				<img src={generatedImage} alt="" />
			</div>
		</Container>
	);
};

export default CreatePost;

const Container = styled.div`
	height: 100%;
	padding: 30px 100px;
	/* display: grid;
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); */
	display: flex;
	justify-content: center;
	gap: 50px;
	overflow-y: auto;
	position: relative;

	.generate__image-form {
		display: grid;
		width: 40%;
		place-items: center;
	}

	.generated__image-preview {
		display: grid;
		place-items: center;
		position: relative;

		img {
			border: 1px dashed yellow;
			width: 400px;
			border-radius: 0.8rem;
			padding: 10px;
			object-fit: contain;
		}
	}

	@media (max-width: 1400px) {
		padding: 20px 35px;

		.generate__image-form {
			width: 60%;
		}
		.generated__image-preview {
			img {
				width: 300px;
			}
		}
	}

	@media (max-width: 900px) {
		flex-direction: column;
		justify-content: flex-start;
		.generate__image-form {
			width: 100%;
		}
	}

	@media (max-width: 500px) {
		gap: 10px;
		padding: 20px 20px;
		/* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
		.generated__image-preview {
			margin-top: 30px;
		}
	}

	@media (max-width: 300px) {
		/* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
		.generated__image-preview {
			img {
				width: 200px;
			}
		}
	}

	.loading {
		position: absolute;
		backdrop-filter: blur(1px);
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 3;
	}
`;
