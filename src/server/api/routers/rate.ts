import { TypeEnum } from '@prisma/client'
import { z } from 'zod'
import { months, years } from '~/utils/constants'
import { createTRPCRouter, publicProcedure } from '../trpc'

const getGte = (year: number, month: number) => {
  return new Date(year, month, 1)
}

const getLte = (year: number, month: number) => {
  const lastDay = new Date(year, month, 0).getDate()
  return new Date(year, month, lastDay)
}

export const rateRouter = createTRPCRouter({
  getAllRatedMovies: publicProcedure
    .input(
      z.object({
        userId: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.ratedMovie.findMany({
        where: {
          userId: input.userId
        }
      })
      return [...result]?.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      )
    }),
  getYearRecords: publicProcedure
    .input(
      z.object({
        userId: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const counts = await Promise.all(
        years.map(
          async (year) =>
            await ctx.db.ratedMovie.count({
              where: {
                userId: input.userId,
                createdAt: {
                  gte: getGte(year, 0),
                  lte: getLte(year, 11)
                }
              },
              select: {
                _all: true,
                isBest: true
              }
            })
        )
      )
      const result = counts.map(({ _all, isBest }, index) => ({
        year: years[index],
        count: _all ?? 0,
        countBest: isBest ?? 0
      }))

      return result
    }),
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
            await ctx.db.ratedMovie.count({
              where: {
                userId: input.userId,
                createdAt: {
                  gte: getGte(input.selectedYear, id - 1),
                  lte: getLte(input.selectedYear, id - 1)
                }
              },
              select: {
                _all: true,
                isBest: true
              }
            })
        )
      )
      const result = months.map(({ id, title }) => ({
        id,
        title,
        count: counts?.[id - 1]?._all ?? 0,
        countBest: counts?.[id - 1]?.isBest ?? 0
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
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.ratedMovie.findMany({
        where: {
          userId: input.userId,
          createdAt: {
            gte: getGte(input.selectedYear, input.selectedMonth - 1),
            lte: getLte(input.selectedYear, input.selectedMonth - 1)
          }
        }
      })
      return [...result]?.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      )
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
    }),
  deleteRate: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.ratedMovie.delete({
        where: {
          id: input.id
        }
      })
    }),
  editRate: publicProcedure
    .input(
      z.object({
        id: z.string(),
        comment: z.string(),
        rated: z.number(),
        isBest: z.boolean()
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.ratedMovie.update({
        where: {
          id: input.id
        },
        data: {
          comment: input.comment,
          rated: input.rated,
          isBest: input.isBest
        }
      })
    })
})
