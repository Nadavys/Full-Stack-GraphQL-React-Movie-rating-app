import Panel from "./components/panel"
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import type { IMovie, IActor, IGenre, IReview } from '@joyfulweb/core';

const MOVIES_SEARCH = gql`
query SearchMovie($title: String) {
  searchMovie(title: $title) {
    title
    year
    id
    posterUrl
    reviews {
      id
    }
  }
}
`;

interface MovieListProps {
    searchText: string;
}

const MovieList = ({ searchText }: MovieListProps) => {
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(MOVIES_SEARCH, { variables: { title: searchText } });
    const { searchMovie } = data || {}

    const onClickMovie = (movieId: number) => {
        return navigate('/movie/' + movieId)
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>

    return (
        <Panel>
            <table className="table-fixed min-w-full hover:table-fixed">
                <thead className="">
                    <tr className="text-left">
                        <th className="w-2/4">Title</th>
                        <th className="w-1/4">year</th>
                        <th className="w-1/4">Reviews</th>
                        <th className="w-1/4 text-right"></th>
                    </tr>
                </thead>
                <tbody>

                    {!!searchMovie && searchMovie?.map(
                        ({ title,
                            year,
                            id,
                            reviews,
                            posterUrl }: IMovie) => (
                            <tr onClick={() => onClickMovie(id)} key={id} className="hover:bg-gray-200 hover:cursor-pointer transition-all delay-100 p-5">
                                <td>{title}</td>
                                <td>{year}</td>
                                <td>{reviews?.length}</td>
                                <td><img src={posterUrl} className="pl-8 w-16 md:w-24 lg:w-44" /></td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </Panel>
    )
}

export default MovieList;

