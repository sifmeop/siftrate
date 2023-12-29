import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const userRouter = createTRPCRouter({
  checkVisibleUser: publicProcedure
    .input(
      z.object({
        id: z.string().optional()
      })
    )
    .query(({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: {
          id: input.id,
          isVisibleRate: true
        }
      })
    }),
  toggleVisible: publicProcedure
    .input(
      z.object({
        id: z.string(),
        isVisibleRate: z.boolean()
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: input.id
        },
        data: {
          isVisibleRate: input.isVisibleRate
        }
      })
    }),
  getUser: publicProcedure
    .input(
      z.object({
        name: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const search = await ctx.db.user.findMany({
        where: {
          name: {
            contains: input.name,
            mode: 'insensitive'
          }
        }
      })

      const counts = await Promise.all(
        search.map(
          async ({ id }) =>
            await ctx.db.ratedMovie.count({
              where: {
                userId: id,
              },
              select: {
                _all: true,
                isBest: true
              }
            })
        )
      )

      const result = search.map((user, index) => ({
        ...user,
        count: counts?.[index]?._all ?? 0,
        countBest: counts?.[index]?.isBest ?? 0
      }))
      return result
    })
})
