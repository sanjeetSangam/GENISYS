import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import { ButtonComponent } from "../components";
import { prompts } from "../utils/prompts";
import axios from "axios";
import { createPost, generateImage } from "../routes/routes";
import { RiAiGenerate } from "react-icons/ri";
import { FaShareSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BasicContext } from "../context";

const initialValues = {
	name: "",
	prompt: "",
	image: "",
	createdDate: "",
};

const FormField = ({ setGeneratedImage, setGeneratingImage, setPostingImage }) => {
	const [formData, setFormData] = useState(initialValues);
	const [isActionLoading, setIsActionLoading] = useState(false);
	const navigate = useNavigate();
	const { actionInitiated, setActionInitiated } = useContext(BasicContext);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const generateRandomPrompts = () => {
		if (isActionLoading || actionInitiated) {
			return;
		}
		const randomIndex = Math.floor(Math.random() * prompts.length);
		const randomPrompt = prompts[randomIndex];
		if (randomPrompt === formData.prompt) {
			generateRandomPrompts();
		} else {
			setFormData({
				...formData,
				prompt: randomPrompt,
			});
		}
	};

	const generateDalle = async () => {
		if (!formData.prompt) return;
		setGeneratingImage(true);
		setIsActionLoading(true);
		setActionInitiated(true);
		try {
			const paramJSON = { prompt: formData.prompt };
			const { data } = await axios.post(generateImage, paramJSON);
			const generated = `data:image/jpeg;base64,${data.photo}`;
			setFormData({
				...formData,
				image: generated,
			});
			setGeneratedImage(generated);
		} catch (error) {
			console.log(error);
		} finally {
			setGeneratingImage(false);
			setIsActionLoading(false);
			setActionInitiated(false);
		}
	};

	const postImage = async () => {
		setIsActionLoading(true);
		setPostingImage(true);
		setActionInitiated(true);
		try {
			const params = formData;
			params.createdDate = new Date();
			await axios.post(createPost, params);
			navigate("/");
		} catch (error) {
			console.error(error);
		} finally {
			setIsActionLoading(false);
			setPostingImage(false);
			setActionInitiated(false);
		}
	};

	return (
		<Form>
			<div className="form__header">
				<p className="form__title">Generate Image with prompt</p>
				<p className="form__sub__title">
					Write your prompt according to the image you want to generate
				</p>
			</div>

			<div className="form-inputs__buttons">
				<div className="inputs">
					<div className="author">
						<label>Author</label>
						<TextInput
							value={formData.name}
							name="name"
							handleInputChange={handleInputChange}
						/>
					</div>
					<div className="prompt">
						<label>
							Image Prompt <div style={{color : "white"}} onClick={generateRandomPrompts}>Surpise Me</div>{" "}
						</label>
						<TextInput
							name="prompt"
							value={formData.prompt}
							handleInputChange={handleInputChange}
							textArea
							rows={8}
						/>
					</div>
					<div className="note">
						* You can post the AI generated Image to showcase in the feeds! <br />* To
						Post, you need Author, Prompt and generated Image
					</div>
				</div>
				<div className="buttons">
					<ButtonComponent
						leftIcon={<RiAiGenerate size={20} />}
						text="Generate Image"
						buttonClickHandler={generateDalle}
						isLoading={isActionLoading}
						isDisabled={isActionLoading || !formData.prompt}
					/>
					<ButtonComponent
						leftIcon={<FaShareSquare size={20} />}
						text="Post Image"
						isLoading={isActionLoading}
						type="secondary"
						buttonClickHandler={postImage}
						isDisabled={
							isActionLoading || !formData.prompt || !formData.name || !formData.image
						}
					/>
				</div>
			</div>
		</Form>
	);
};

export default FormField;

const Form = styled.div`
	width: 100%;

	.form__header {
		display: flex;
		flex-direction: column;
		gap: 5px;
		margin-bottom: 50px;
		font-weight: 500;

		.form__title {
			font-size: 30px;
		}
		.form__sub__title {
			font-size: 12px;
			color: ${({ theme }) => theme.text__secondary};
			margin-top: 6px;
		}

		@media (max-width: 768px) {
			.form__title {
				/* text-align: center; */
			}
			.form__sub__title {
				/* text-align: center; */
			}
		}
	}

	.form-inputs__buttons {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	.inputs {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	label {
		margin-bottom: 4px;
		font-size: 14px;
		display: flex;
		gap: 10px;
		align-items: flex-end;

		div {
			border: 1px solid gray;
			padding: 3px 10px;
			border-radius: 0.5rem;
			background: #3f3f3f;
			font-size: 10px;
			cursor: pointer;
		}
	}

	.note {
		font-size: 11px;
		color: ${({ theme }) => theme.text__secondary};
		font-weight: 400;
		font-style: italic;
	}

	.buttons {
		display: flex;
		gap: 10px;
	}
`;
