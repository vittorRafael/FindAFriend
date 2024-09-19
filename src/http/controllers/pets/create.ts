import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateServices } from "@/services/factories/make-create-services";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum(["Filhote", "Adulto", "Idoso"]).default("Filhote"),
    size: z
      .enum(["Pequenino", "Pequeno", "Medio", "Grande", "Gigante"])
      .default("Pequenino"),
    energy_level: z
      .enum(["Sedentario", "Calmo", "Moderado", "Ativo", "Hiperativo"])
      .default("Sedentario"),
    environment: z.enum(["Compacto", "Medio", "Amplo"]).default("Amplo"),
  });

  const { name, about, age, size, energy_level, environment } =
    registerBodySchema.parse(request.body);

  try {
    const registerServices = makeCreateServices();
    await registerServices.execute({
      name,
      about,
      age,
      size,
      energy_level,
      environment,
      orgId: request.user.sub,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return reply.status(409).send({ message: error.message });

    throw error;
  }

  return reply.status(201).send();
};
