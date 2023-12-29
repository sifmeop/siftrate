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
    })
})
