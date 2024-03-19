import React, { Suspense, useState, lazy } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { darkTheme } from "./utils/Theme";
// import { Home, CreatePost } from "./pages";
import { Navbar } from "./components";
import { BasicContext } from "./context";
import fallbackRender from "./utils/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "react-js-loader";

const Home = lazy(() => import("./pages/Home"));
const CreatePost = lazy(() => import("./pages/CreatePost"));

const Container = styled.div`
	width: 100%;
	height: 100vh;
	overflow: hidden;
	background: ${({ theme }) => theme.body};
	color: ${({ theme }) => theme.title};
`;

const App = () => {
	const [actionInitiated, setActionInitiated] = useState(false);
	return (
		<BasicContext.Provider value={{ actionInitiated, setActionInitiated }}>
			<ThemeProvider theme={darkTheme}>
				<BrowserRouter>
					<Container>
						<Navbar />
						<main>
							<ErrorBoundary FallbackComponent={fallbackRender} onReset={() => {}}>
								<Suspense
									fallback={
										<div className="loader__class">
											<Loader type="bubble-loop" size={100} />
										</div>
									}
								>
									<Routes>
										<Route path="/" element={<Home />}></Route>
										<Route path="/create-post" element={<CreatePost />}></Route>
									</Routes>
								</Suspense>
							</ErrorBoundary>
						</main>
					</Container>
				</BrowserRouter>
			</ThemeProvider>
		</BasicContext.Provider>
	);
};

export default App;
