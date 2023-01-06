import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Movies from './Movies';
import MovieReview from './MovieReview';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Movies />} />
      <Route path="movie/:movieId" element={<MovieReview />} />
    </>
  )
);

function App() {

  return (
    <div className="sm:py-12 flex justify-center max-w-screen-xl mx-auto">
      <div className="flex flex-col ">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
