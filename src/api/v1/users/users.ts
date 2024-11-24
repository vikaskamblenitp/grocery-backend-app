import { StatusCodes } from "http-status-codes";
import { UsersApiError } from "./error";
import { UserBase } from "./userBase";
import { ERROR_CODES, ROLE_ID } from "#constants";
import { compareHash } from "#utils/bcrypt";
import { data_users as IUser} from "@prisma/client";

class Users extends UserBase {
  async login(body: { email: string, password: string }) {
    // check if user exists
    const user = await this.getUserByEmail(body.email);

    if(!user) {
      // We should not reveal if the email is not found 
      throw new UsersApiError("Invalid email or password.", StatusCodes.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED);
    }

    // check if password is correct
    if(!compareHash(body.password, user.password)) {
      throw new UsersApiError("Invalid email or password.", StatusCodes.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED);
    }

    // generate token
    const token = await this.generateToken(user);

    return { token };
  }

  async createUser(body: Omit<IUser, "role_id">) {
    // check if user exists
    const user = await this.getUserByEmail(body.email);

    if(user) {
      throw new UsersApiError("User already exists.", StatusCodes.BAD_REQUEST, ERROR_CODES.NOT_ALLOWED);
    }

    const userToCreate = { ...body, role_id: ROLE_ID.USER, profile_url: null };
    const createdUser = await this.create(userToCreate);

    const token = await this.generateToken(createdUser);

    return { data: { token }, message: "User registered successfully." };
  }
}

export const users = new Users();