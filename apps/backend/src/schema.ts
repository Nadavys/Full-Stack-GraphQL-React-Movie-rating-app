import { makeExecutableSchema } from '@graphql-tools/schema'
import { Context } from './context';

// The GraphQL schema
const typeDefs = `#graphql

type Movie {
  id:        Int!    
  title:     String!
  year:     Int!
  runtime:   Int!
  director:  String!
  plot:      String!
  posterUrl: String!
  generes: [Genere]!
  actors: [Actor]!
  reviews: [Review]!
}

type Actor{
        name: String
}

type Genere {
    name: String
}

type Review{
    id: Int
    rating: Int
    content: String

    movie: Movie
}

type Query {
  searchMovie(title:String): [Movie]!
  getMovie(id:Int): Movie
  allReviews: [Review]!
}

input ReviewInput{
    rating: Int
    content: String
    movieId: Int
}

type Mutation {
    createReview(data:ReviewInput): Review
}
`;

const resolvers = {
    Query: {
        searchMovie: (_: never, { title: searchTitle }: { title: string | null }, context: Context) => {
            return context.prisma.movie.findMany({ where: { title: { contains: searchTitle! } }, include: { actors: true, generes: true, reviews: true }, })
        },
        allReviews: (_: never, __: never, context: Context) => {
            return context.prisma.review.findMany({ include: { movie: true } })
        },
        getMovie:  (_:never, {id}:{id:number}, context:Context )=>{
            return context.prisma.movie.findUnique({where:{id}, include:{actors:true, generes:true, reviews:true}})
        }
    },

    Mutation: {
        createReview: (_: never, { data: { rating, content, movieId } }: any, context: Context) => {
            return context.prisma.review.create({ data: { rating, content, movieId } })
        }
    }
};

export const schema = makeExecutableSchema({
    resolvers,
    typeDefs,
})