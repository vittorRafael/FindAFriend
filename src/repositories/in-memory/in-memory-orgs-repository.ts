import { Prisma, Org } from "@prisma/client";
import { randomUUID } from "crypto";
import { OrgsRepository } from "../orgs-repository";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      author_name: data.author_name,
      email: data.email,
      whatsapp: data.whatsapp,
      password: data.password,
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };

    this.items.push(org);

    return org;
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);
    if (!org) return null;

    return org;
  }
}
