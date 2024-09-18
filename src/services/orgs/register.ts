import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { OrgsAlreadyExistsError } from "../errors/orgs-already-exists-error";

interface RegisterServicesRequest {
  name: string;
  author_name: string;
  email: string;
  password: string;
  whatsapp: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  latitude: number;
  longitude: number;
}

interface RegisterServicesResponse {
  org: Org;
}

export class RegisterServices {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
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
  }: RegisterServicesRequest): Promise<RegisterServicesResponse> {
    const password_hash = await bcryptjs.hash(password, 6);

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);
    if (orgWithSameEmail) throw new OrgsAlreadyExistsError();

    const org = await this.orgsRepository.create({
      name,
      author_name,
      email,
      password: password_hash,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
      whatsapp,
    });

    return { org };
  }
}
