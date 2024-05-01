import { z } from "zod";

export const Route = {
  name: "ApiSearch",
  params: z.object({
  })
};

export const GET = {
  result: z.object({}),
};
