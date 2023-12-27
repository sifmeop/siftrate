import { z } from 'zod'
import { months } from '~/utils/constants'
import { createTRPCRouter, publicProcedure } from '../trpc'

const getLte = (year: number, month: number) => {
  const lastDay = new Date(year, month, 0).getDate()
  return new Date(year, month, lastDay)
}

export const movieRouter = createTRPCRouter({
  getMonthlyRecords: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        selectedYear: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const counts = await Promise.all(
        months.map(
          async ({ id }) =>
            await ctx.db.ratedMovie.aggregate({
              where: {
                userId: input.userId,
                createdAt: {
                  gte: new Date(input.selectedYear, id - 1, 0),
                  lte: getLte(input.selectedYear, id - 1)
                }
              },
              _count: true
            })
        )
      )

      const result = months.map(({ id, title }) => ({
        id,
        title,
        count: counts?.[id - 1]?._count ?? 0
      }))

      return result
    }),
  getByDateMovies: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        selectedMonth: z.number(),
        selectedYear: z.number()
      })
    )
    .query(
      async ({ ctx, input }) =>
        await ctx.db.ratedMovie.findMany({
          where: {
            userId: input.userId,
            createdAt: {
              gte: new Date(input.selectedYear, input.selectedMonth - 1, 0),
              lte: getLte(input.selectedYear, input.selectedMonth - 1)
            }
          }
        })
    )
})
