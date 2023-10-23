import zod from "zod";

const envShema = zod.object({
  DATABASE_URL: zod.string().min(1),
  GOOGLE_CLIENT_ID: zod.string().min(1),
  GOOGLE_CLIENT_SECRET: zod.string().min(1),
  NEXTAUTH_SECRET: zod.string().min(1),
});

export const env = envShema.parse(process.env);
