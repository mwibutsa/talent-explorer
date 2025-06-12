import { z } from "zod";

export const TorreSearchParamsSchema = z.object({
  and: z.string().optional(),
  not: z.string().optional(),
  or: z.string().optional(),
  candidatedatabaseof: z.string().optional(),

  compensation: z
    .object({
      amount: z.number().optional(),
      currency: z.string().optional(),
      periodicity: z
        .enum(["hourly", "daily", "weekly", "monthly", "yearly"])
        .optional(),
    })
    .optional(),

  compensationrange: z
    .object({
      minAmount: z.number().optional(),
      maxAmount: z.number().optional(),
      currency: z.string().optional(),
      periodicity: z
        .enum(["hourly", "daily", "weekly", "monthly", "yearly"])
        .optional(),
    })
    .optional(),

  completion: z
    .object({
      min: z.number().optional(),
    })
    .optional(),

  context: z
    .object({
      contextFeature: z.literal("candidate").optional(),
      nyax: z.boolean().optional(),
    })
    .optional(),

  ggid: z
    .object({
      include: z.array(z.string()).optional(),
      exclude: z.array(z.string()).optional(),
    })
    .optional(),

  job: z
    .object({
      id: z.string().optional(),
      membersCloseConnections: z.boolean().optional(),
      penalizeOverqualified: z.boolean().optional(),
    })
    .optional(),

  language: z
    .object({
      code: z.string().optional(),
      term: z.string().optional(),
      fluency: z
        .enum([
          "conversational",
          "professional-working",
          "fully-fluent",
          "native",
          "basic",
        ])
        .optional(),
    })
    .optional(),

  location: z
    .object({
      term: z.string().optional(),
    })
    .optional(),

  opento: z
    .object({
      term: z
        .enum([
          "full-time-employment",
          "part-time-employment",
        ])
        .optional(),
    })
    .optional(),

  appliedto: z
    .object({
      refIds: z.array(z.string()).optional(),
    })
    .optional(),

  organization: z
    .object({
      term: z.string().optional(),
    })
    .optional(),

  remoter: z
    .object({
      term: z.boolean().optional(),
    })
    .optional(),

  role: z
    .object({
      term: z.string().optional(),
    })
    .optional(),

  signaledby: z
    .object({
      username: z.string().optional(),
    })
    .optional(),

  signalersof: z
    .object({
      username: z.string().optional(),
    })
    .optional(),

  similarto: z
    .object({
      username: z.string().optional(),
      ggId: z.string().optional(),
    })
    .optional(),

  skill: z
    .object({
      experience: z.string().optional(),
      proficiency: z.string().optional(),
      term: z.string().optional(),
    })
    .optional(),

  subject: z
    .object({
      include: z.array(z.string()).optional(),
      exclude: z.array(z.string()).optional(),
    })
    .optional(),

  timezone: z
    .object({
      left: z.string().optional(),
      right: z.string().optional(),
      tolerance: z.number().optional(),
    })
    .optional(),

  "skill/role": z
    .object({
      text: z.string().optional(),
      experience: z.string().optional(),
      proficiency: z.string().optional(),
    })
    .optional(),
  size: z.number().optional(),
});

export type TorreSearchParams = z.infer<typeof TorreSearchParamsSchema>;
