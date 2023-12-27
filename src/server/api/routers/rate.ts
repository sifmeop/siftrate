import { TypeEnum } from '@prisma/client'
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const rateRouter = createTRPCRouter({
  getAllRatedMovies: publicProcedure
    .input(
      z.object({
        userId: z.string()
      })
    )
    .query(({ ctx, input }) => {
      return ctx.db.ratedMovie.findMany({
        where: {
          userId: input.userId
        }
      })
    }),
  createRate: publicProcedure
    .input(
      z.object({
        title: z.string(),
        poster: z.string().optional(),
        rated: z.number(),
        comment: z.string(),
        userId: z.string(),
        type: z.nativeEnum(TypeEnum),
        isBest: z.boolean()
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.ratedMovie.create({
        data: {
          title: input.title,
          poster: input.poster,
          rated: input.rated,
          comment: input.comment,
          userId: input.userId,
          type: input.type,
          isBest: input.isBest
        }
      })
    })
})
