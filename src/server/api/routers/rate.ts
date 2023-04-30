import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

export const rateRouter = createTRPCRouter({
  getAllRatedMovies: publicProcedure
    .input(
      z.object({
        userId: z.string()
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.ratedMovie.findMany({
        where: {
          userId: input.userId
        }
      })
    }),
  getYearlyRatedMovies: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        year: z.number()
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.ratedMovie.findMany({
        where: {
          userId: input.userId,
          year: input.year
        }
      })
    }),
  getMonthlyRatedMovies: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        month: z.number()
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.ratedMovie.findMany({
        where: {
          userId: input.userId,
          month: input.month
        }
      })
    }),
  getByDataRatedMovies: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        year: z.number(),
        month: z.number()
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.ratedMovie.findMany({
        where: {
          userId: input.userId,
          year: input.year,
          month: input.month
        }
      })
    }),
  createRate: publicProcedure
    .input(
      z.object({
        title: z.string(),
        poster: z.string(),
        rated: z.number(),
        comment: z.string(),
        userId: z.string(),
        date: z.string(),
        year: z.number(),
        month: z.number()
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.ratedMovie.create({
        data: {
          title: input.title,
          poster: input.poster,
          rated: input.rated,
          comment: input.comment,
          userId: input.userId,
          date: input.date,
          year: input.year,
          month: input.month
        }
      })
    }),
  updateRate: publicProcedure
    .input(
      z.object({
        id: z.string(),
        comment: z.string(),
        rated: z.number()
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.ratedMovie.update({
        where: {
          id: input.id
        },
        data: {
          comment: input.comment,
          rated: input.rated
        }
      })
    })
})
