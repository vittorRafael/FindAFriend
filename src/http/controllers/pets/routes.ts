import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { getPetDetails } from "./get-pet-details";

export const petsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJWT);
  app.post("/pets", create);
  app.get("/pets/:petId", getPetDetails);
};
