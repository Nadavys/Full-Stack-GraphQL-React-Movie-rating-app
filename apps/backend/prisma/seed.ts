import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import data from './db.json'

export interface TMovie {
    id: number
    title: string
    year: string
    runtime: string
    genres: string[]
    director: string
    actors: string
    plot: string
    posterUrl: string
  }
  

async function main(){
    await Promise.all(data.movies.map(
        ({ id,
            title,
            year,
            runtime,
            director,
            plot,
            posterUrl,
            genres,
            actors
        }:TMovie)=>{
            return prisma.movie.create({
                data:{
                    id,
                    title,
                    year: +year,
                    runtime: +runtime,
                    director,
                    plot,
                    posterUrl,
                    generes:{
                        connectOrCreate:genres.map((name)=>({where:{name},create:{name}})),
                    },
                    actors:{
                        connectOrCreate:actors.split(', ').map((name)=>({where:{name},create:{name}})),
                    }
                }
                
            })
        }
    ))


    const reviews:any = [
        {
        rating:5,
        content: "It's amusing to say that I got to know about this film while I was reading wikipedia about Tom Cruise movies which have grossed less than $100M in North America box office",
        movieId:5
    },
    {
        rating:4,
        content: "At times disturbing and always intense, this flick offers its own acid trip for viewers and is a first-hand look at four people who become trapped by their own hell.",
        movieId:48
    },
    {
        rating:2,
        content: "It's a cold and distanced and, yes, rather boring experience during which we feel nothing for any of the characters. It is three hours without actually getting anywhere near the place it should have got to.",
        movieId:98
    },
]

    await Promise.all( 
        reviews.map(
            //@ts-ignore
            ({rating, content, movieId})=>{
                console.log({rating, content, movieId})
                return prisma.review.create({data:{rating, content, movieId}})
            }
        )
    )

}


main().catch(
    (e)=>{
        console.log(e)
        prisma.$disconnect()
        process.exit(1)
    }
).finally(
    ()=>prisma.$disconnect()
)