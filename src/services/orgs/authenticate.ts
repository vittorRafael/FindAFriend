import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import bcryptjs from "bcryptjs";
import { Org } from "@prisma/client";
import { OrgsRepository } from "@/repositories/orgs-repository";

interface AuthenticateServicesRequest {
  email: string;
  password: string;
}
interface AuthenticateServicesResponse {
  org: Org;
}

export class AuthenticateServices {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServicesRequest): Promise<AuthenticateServicesResponse> {
    const org = await this.orgsRepository.findByEmail(email);
    if (!org) throw new InvalidCredentialsError();

    const doesPasswordMatches = await bcryptjs.compare(password, org.password);

    if (!doesPasswordMatches) throw new InvalidCredentialsError();

    return { org };
  }
}
