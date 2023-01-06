export interface IActor {
    id: number,
    name: string
    movies: [IMovie]
}

export interface IGenre {
    id: number,
    name: string
    movies: [IMovie]
}

export interface IReview {
    id: number,
    rating: number,
    content: string,
    movie: IMovie,
}

export interface IMovie {
    id: number,
    title: string,
    year: number,
    runtime: number,
    director: string,
    plot: string,
    posterUrl: string,
    actors: [IActor],
    generes: [IGenre],
    reviews: [IReview]
}



export function toHoursAndMinutes(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 1 ? `${hours} Hours ${minutes} Minutes` : `${hours} Hour ${minutes} Minutes`;
}

export default {toHoursAndMinutes}