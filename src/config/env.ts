import { z, ZodError, ZodIssue } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_SEARCH_URL: z.string().url().optional(),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_BASE_URL: z.string().url().optional(),
  OPENAI_MODEL: z.string().optional(),
});

const constructEnvErrorMessages = (errors: ZodIssue[]): string[] => {
  return errors.map((error, idx) => {
    return `${idx + 1}) ${error.path.join(".")} : ${error.message}`;
  });
};

const validateEnv = (): z.infer<typeof envSchema> => {
  try {
    return envSchema.parse(process.env);
  } catch (error: unknown) {
    console.error(constructEnvErrorMessages((error as ZodError).issues));
    throw error;
  }
};

const env = validateEnv();

export default env;
