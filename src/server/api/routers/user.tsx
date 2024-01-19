import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

const getGte = (year: number) => {
  return new Date(year, 0, 1)
}

const getLte = (year: number) => {
  const lastDay = new Date(year, 11, 0).getDate()
  return new Date(year, 11, lastDay)
}

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
          isVisibleRate: true,
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
                userId: id
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
    }),
  getAllUserGrade: publicProcedure
    .input(
      z.object({
        id: z.string(),
        year: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const response = await ctx.db.ratedMovie.findMany({
        where: {
          userId: input.id,
          createdAt: {
            gte: getGte(input.year),
            lte: getLte(input.year)
          }
        },
        select: {
          rated: true
        }
      })
      let grades: {
        label: number | string
        value: number | string
      }[] = []
      response.forEach(({ rated }) => {
        const findGrade = grades.findIndex(({ label }) => label === rated)

        if (findGrade !== -1) {
          const { value } = grades[findGrade]!

          grades[findGrade] = {
            label: rated,
            value: +value + 1
          }
        } else {
          grades.push({
            label: rated,
            value: 1
          })
        }
      })
      grades = [...grades].sort((a, b) => +b.label - +a.label)
      const count = response.length
      return [{ label: 'Все', value: count }, ...grades]
    })
})
