import { z } from "zod"

export const dataSchema = z.object({
    userData:z.string().max(10000,"data too long!").min(10,"data too short to embed it")
})