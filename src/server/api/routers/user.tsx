import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        isBest: z.boolean().optional()
      })
    )
    .query(({ ctx, input }) => {
      return ctx.db.user.findFirst({
        where: {
          id: input.id,
          isVisibleRate: true
        },
        include: {
          RatedMovie: {
            where: {
              isBest: input.isBest
            }
          }
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
    })
})
