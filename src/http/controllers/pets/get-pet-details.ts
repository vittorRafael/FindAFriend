import { makeGetPetDetails } from "@/services/factories/make-get-pet-details";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const getPetDetails = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const validatePetIdParamsSchema = z.object({
    petId: z.string().uuid(),
  });
  const { petId } = validatePetIdParamsSchema.parse(request.params);

  const getPetDetails = makeGetPetDetails();

  const { pet } = await getPetDetails.execute({ petId });

  return reply.status(200).send({ pet });
};
