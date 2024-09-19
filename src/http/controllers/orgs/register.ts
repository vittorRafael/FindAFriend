import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { OrgsAlreadyExistsError } from "@/services/errors/orgs-already-exists-error";
import { makeRegisterServices } from "@/services/factories/make-register-services";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string().min(5),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
    whatsapp: z.string(),
  });

  const {
    name,
    author_name,
    email,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
    whatsapp,
  } = registerBodySchema.parse(request.body);

  try {
    const registerServices = makeRegisterServices();
    await registerServices.execute({
      name,
      author_name,
      email,
      password,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
      whatsapp,
    });
  } catch (error) {
    if (error instanceof OrgsAlreadyExistsError)
      return reply.status(409).send({ message: error.message });

    throw error;
  }

  return reply.status(201).send();
};
