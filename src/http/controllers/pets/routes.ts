import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { getPetDetails } from "./get-pet-details";
import { search } from "./search";

export const petsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJWT);
  app.get("/pets/search", search);
  app.post("/pets", create);
  app.get("/pets/:petId", getPetDetails);
};
