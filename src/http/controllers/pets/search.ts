import { makeSearchServices } from "@/services/factories/make-search-services";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const search = async (request: FastifyRequest, reply: FastifyReply) => {
  const searchGymQuerySchema = z.object({
    city: z.string(),
    age: z.enum(["Filhote", "Adulto", "Idoso", ""]).default(""),
    size: z
      .enum(["Pequenino", "Pequeno", "Medio", "Grande", "Gigante", ""])
      .default(""),
    energy_level: z
      .enum(["Sedentario", "Calmo", "Moderado", "Ativo", "Hiperativo", ""])
      .default(""),
    environment: z.enum(["Compacto", "Medio", "Amplo", ""]).default(""),
  });

  const { city, age, size, energy_level, environment } =
    searchGymQuerySchema.parse(request.query);

  const searchPets = makeSearchServices();
  const { pets } = await searchPets.execute({
    city,
    age: age || undefined,
    size: size || undefined,
    energy_level: energy_level || undefined,
    environment: environment || undefined,
  });

  return reply.status(200).send({ pets });
};
