import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FilerSaver from "file-saver";
import { FaDownload } from "react-icons/fa6";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImageCard = ({ _id, name, prompt, image, createdDate }) => {
	const date = new Date(createdDate);
	return (
		<Card>
			<LazyLoadImage
				effect="blur"
				style={{ borderRadius: "12px" }}
				width={"100%"}
				alt={name}
				// src={image}
				src={`${image}?w=100`}
			/>

			<HoverOverlay>
				<Prompt>{prompt}</Prompt>
				<p className="created__date">{date.toLocaleString("en-IN")}</p>
				<div className="author__info">
					<Author>{name}</Author>
					<div
						className="download"
						onClick={() => FilerSaver.saveAs(image, "download.jpg")}
					>
						<FaDownload size={14} color="white" />
					</div>
				</div>
			</HoverOverlay>
		</Card>
	);
};

export default ImageCard;

const Card = styled.div`
	position: relative;
	display: flex;
	border-radius: 20px;
	/* cursor: pointer; */
	transition: all 0.3s ease;
	margin-bottom: 12px;
	&:hover {
		/* scale: 1.01; */
	}
	/* &:nth-child(7n + 1) {
		grid-column: auto/span 2;
		grid-row: auto/span 3;
	} */

	.created__date {
		font-size: 11px;
		font-style: italic;
		color: gray;
		margin-top: 6px;
	}
`;

const HoverOverlay = styled.div`
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	align-items: start;
	gap: 2px;
	backdrop-filter: blur(2px);
	background: rgba(0, 0, 0, 0.5);
	transition: opacity 0.3s ease;
	border-radius: 6px;
	justify-content: end;
	padding: 10px;

	${Card}:hover & {
		opacity: 1;
	}

	.author__info {
		margin-top: 10px;
		width: 100%;
		display: flex;
		justify-content: space-between;

		.download {
			width: 30px;
			display: grid;
			place-items: center;
			cursor: pointer;
			transition: all 0.3s ease;

			&:hover {
				transform: scale(1.1);
			}
		}
	}
`;

const Prompt = styled.div`
	font-weight: 400;
	font-size: 14px;
	display: -webkit-box;
	width: 100%;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const Author = styled.div`
	font-size: 13px;
	width: 60%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
