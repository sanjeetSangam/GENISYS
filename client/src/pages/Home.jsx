import React, { useState, useEffect } from "react";
import { ImageCard, SearchBar } from "../components";
import styled from "styled-components";
import axios from "axios";
import { createPost, getPosts } from "../routes/routes";
import Loader from "react-js-loader";
import InfiniteScroll from "react-infinite-scroll-component";
// import { inserrecords } from "../utils/insertPosts";

const LIMIT = 20;

const RenderCards = ({ data, title, searchTitle }) => {
	if (data?.length > 0) {
		return (
			<>
				<p className="search__title">{searchTitle}</p>
				<CardsWrapper>
					{data.map((post) => (
						<ImageCard key={post._id} {...post} />
					))}
				</CardsWrapper>
			</>
		);
	}
	return (
		<section>
			<h2 className="no__data">{title}</h2>
		</section>
	);
};

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [totalImages, setTotalImages] = useState(0);
	const [activePage, setActivePage] = useState(1);

	const getImagesData = async (isLazy) => {
		if (!isLazy) {
			setLoading(true);
		}
		try {
			const params = {
				limit: LIMIT,
				page: activePage,
			};

			if (searchText?.length > 0) {
				params.search = searchText;
			}

			const { data } = await axios.get(getPosts, {
				params: params,
			});
			console.log("data", data);
			return data;
		} catch (error) {
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	};

	const fetchData = async (isLazy) => {
		const images = await getImagesData(isLazy);
		setPosts([...posts, ...images.data]);
		setTotalImages(images.totalResults);
		setActivePage(activePage + 1);
	};

	const handleSearches = (e) => {
		const { value } = e.target;
		setPosts([]);
		setActivePage(1);
		setSearchText(value);
	};

	useEffect(() => {
		// inserrecords();
		fetchData();
	}, []);

	useEffect(() => {
		const getData = setTimeout(() => {
			if (!searchText) setLoading(true);
			fetchData();
		}, 500);
		return () => clearTimeout(getData);
	}, [searchText]);

	return (
		<Container id="scrollableDiv">
			<section className="home__top">
				<Title>
					<span className="main__header">Embark on an AI Odyssey</span>{" "}
					<SubTitle>Discovering the Vast Realm of Image Generation </SubTitle>
				</Title>

				<SearchBar handleSearches={handleSearches} />
			</section>

			{loading ? (
				<div className="loader__class">
					<Loader type="bubble-loop" size={100} />
				</div>
			) : (
				<Wrapper>
					<InfiniteScroll
						dataLength={posts?.length}
						next={() => {
							fetchData(true);
						}}
						hasMore={posts?.length < totalImages}
						endMessage={<h2 className="result__end">End of result</h2>}
						loader={
							<div className="lazy__loader">
								<Loader type="bubble-loop" size={30} />
							</div>
						}
						scrollableTarget="scrollableDiv"
					>
						{searchText ? (
							<RenderCards
								data={posts}
								searchTitle={`Showing Result for ${searchText} :`}
								title={`No Search Results Found for ${searchText}`}
							/>
						) : (
							<RenderCards data={posts} title="No Posts Yet" />
						)}
					</InfiniteScroll>
				</Wrapper>
			)}
		</Container>
	);
};

export default Home;

const Container = styled.div`
	height: 100%;
	overflow-y: auto;
	padding: 30px 100px;
	padding-top: 0;
	padding-bottom: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* gap: 20px; */
	@media (max-width: 768px) {
		padding: 20px 25px;
		padding-top: 0;
	}

	.home__top {
		position: sticky;
		top: 0px;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		width: 100%;
		background: ${({ theme }) => theme.body};
		padding-top: 20px;
		padding-bottom: 20px;
	}

	.search__title {
		text-align: center;
		font-size: 12px;
		margin-bottom: 10px;
		font-style: italic;
	}
`;

const Title = styled.div`
	font-size: 34px;
	font-weight: 500;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;

	@media (max-width: 768px) {
		font-size: 22px;
		text-align: center;
	}

	.main__header {
		text-transform: uppercase;
	}
`;

const SubTitle = styled.div`
	font-size: 25px;
	font-weight: 500;
	color: ${({ theme }) => theme.secondary};
	@media (max-width: 768px) {
		font-size: 18px;
		margin-top: 10px;
	}
`;

const Wrapper = styled.div`
	display: flex;
	gap: 5px;
	align-items: center;
	justify-content: center;
	width: 100%;

	.result__end {
		width: 100%;
		text-align: center;
		font-size: 12px;
		font-style: italic;
		color: gray;
		margin-top: 10px;
		font-weight: 400;
	}

	.lazy__loader {
		margin-top: 10px;
	}
`;

const CardsWrapper = styled.div`
	/* display: grid; */
	column-width: 33%;
	-webkit-column-width: 33%;
	-moz-column-width: 33%;
	gap: 20px;
	padding: 0 12px;

	@media (min-width: 1200px) {
		/* grid-template-columns: repeat(4, 1fr); */
		column-count: 4;
		-webkit-column-count: 4;
		-moz-column-count: 4;
	}
	@media (min-width: 640px) and (max-width: 1199px) {
		/* grid-template-columns: repeat(3, 1fr); */
		column-count: 3;
		-webkit-column-count: 3;
		-moz-column-count: 3;
	}
	@media (max-width: 639px) {
		/* grid-template-columns: repeat(2, 1fr); */
		column-count: 2;
		-webkit-column-count: 2;
		-moz-column-count: 2;
	}
	@media (max-width: 430px) {
		/* grid-template-columns: repeat(2, 1fr); */
		column-count: 1;
		-webkit-column-count: 1;
		-moz-column-count: 1;
	}
`;
