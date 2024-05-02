import { z } from "zod";

export const Route = {
  name: "ModalCatchAll",
  params: z.object({
    catchAll: z.string().array(),
  })
};

