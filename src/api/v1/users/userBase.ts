import { prisma } from "#helpers/prismaClient";
import { generateHash } from "#utils/bcrypt";
import { generateJwtToken } from "#utils/token";
import { data_users as IUser} from "@prisma/client"

export class UserBase {
  create(body: Omit<IUser, "created_at" | "updated_at">) {
    body.password = generateHash(body.password);
    // Implementation
    return prisma.data_users.create({
      data: body
    });
  }

  getUserByEmail(email: string): Promise<IUser | null> {
    return prisma.data_users.findFirst({ where: { email }, include: { core_roles: true } });
  }

  getUserById(id: string): Promise<IUser | null> {
    return prisma.data_users.findFirst({ where: { id }, include: { core_roles: true } });
  }

  async generateToken(user: IUser | { id: string }) {
    if("name" in user) {
      Reflect.deleteProperty(user, "password");
      return generateJwtToken(user);
    } 
      const newUser = await this.getUserById(user.id);

      if(!newUser) {
        throw new Error("User not found");
      }

      Reflect.deleteProperty(newUser, "password");

      return generateJwtToken(newUser);
    
  }

}