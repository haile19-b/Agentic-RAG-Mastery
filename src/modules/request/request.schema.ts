import { z } from "zod"

export const userSchema = z.object({
    userInput:z.string().max(1000,"data too long!").min(10,"data too short to embed it")
})