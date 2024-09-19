import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export const petsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJWT);
  app.post("/pets", create);
};
