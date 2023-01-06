import Panel from "./components/panel"
import { gql, useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import type { IMovie, IActor, IGenre, IReview } from '@joyfulweb/core';

const GET_MOVIE = gql`
query GetMovie($getMovieId: Int) {
  getMovie(id: $getMovieId) {
    id
    title
    year
    runtime
    director
    plot
    posterUrl
    generes {
      name
    }
    actors {
      name
    }
    reviews {
      rating
      content
    }
  }
}
`;

const MovieReview = () => {
    const navigate = useNavigate();
    let { movieId } = useParams();

    const { loading, error, data } = useQuery(GET_MOVIE, { variables: { getMovieId: +movieId } });
    const { getMovie: movie }:{getMovie:IMovie} = data || {}

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>

    return (
        <>
            <Panel>
                <button onClick={() => { navigate('/') }} className="text-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                    </svg>
                    <span>Back</span>
                </button>

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <MovieInfo movie={movie} />
                    <img className="max-w-2xl" src={movie.posterUrl} alt={movie.title} />
                </div>
            </Panel>

            {!!movie?.reviews.length && <ReviewList reviews={movie?.reviews} />}
            <PostReview movie={movie} />
        </>
    )
}
export default MovieReview;


const MovieInfo = ({ movie }: IMovie) => {
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h1 className="text-2xl font-bold leading-6 text-gray-900">{movie.title}</h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{movie.plot}</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Director</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{movie.director}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Genere</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{movie.actors.map(({ name }: IActor) => name).join(", ")}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Year</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{movie.year}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Genere</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{movie.generes.map(({ name }: IGenre) => name).join(", ")}</dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Runtime</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{toHoursAndMinutes(movie.runtime)}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

const ReviewList = ({ reviews }: IReview) => {
    return (
        <Panel className="mt-4">
            <h3 className="text-lg text-border">Reviews</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-6 ">
                <dl>
                    {reviews.map(
                        ({ rating, content }: IReview) => (
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 mb-1">
                                <dt className="text-sm font-medium text-gray-500">
                                    <StarsRating rating={rating} />
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{content}</dd>
                            </div>
                        )
                    )}
                </dl>
            </div>
        </Panel>
    )
}

const StarsRating = function ({ rating = 5 }) {
    return (

        <div className="flex items-center">
            {Array(rating).fill(null).map(
                () => <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            )}

            {Array(5 - rating).fill(null).map(
                () => <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            )}
        </div>
    );
}; 

const CREATE_REVIEW = gql`
mutation CreateReview($data: ReviewInput) {
    createReview(data: $data) {
      id
    }
  }
  `

const PostReview = ({ movie }: IMovie) => {
    const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW, {
        awaitRefetchQueries: true,
        refetchQueries: [
            { query: GET_MOVIE, variables: { getMovieId: movie.id } }
        ]
    });

    return (
        <Panel className=" mt-4 ">
            <form onSubmit={async (e) => {
                e.preventDefault()
                const formData = new FormData(e.target);
                const formProps = Object.fromEntries(formData);
                console.log(formProps);
                await createReview({ variables: { data: { content: formProps.content, rating: +formProps.rating, movieId: movie.id } } });
                if (error) {
                    return alert(error)
                }
            }}>
                <h3 className="text-lg text-bold">Post Movie Review</h3>
                <div className="mt-2 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label htmlFor="comment" className="sr-only">
                            Your comment
                        </label>
                        <textarea
                            id="content"
                            rows={4}
                            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                            placeholder="Write a review..."
                            required
                            defaultValue={""}
                            name="content"

                        />
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <select
                            name="rating"
                            id="rating"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option selected="">Choose a Rating</option>
                            {Array(5).fill(null).map((_, index) => <option key={index} value={index + 1}>{index + 1}</option>)}

                        </select>

                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button
                            type="submit"
                            className="inline-flex items-center py-3 px-6 text-s font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        >
                            Post Review
                        </button>
                    </div>
                </div>
            </form>
        </Panel>
    )
}



export function toHoursAndMinutes(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 1 ? `${hours} Hours ${minutes} Minutes` : `${hours} Hour ${minutes} Minutes`;
}