import { UserModel } from "../models/user";
import { UserEntity } from "../remote/entities/userEntity";

export function mapUserData(publicationFromApi: UserEntity): UserModel {
  return {
    id: publicationFromApi.sk,
    name: publicationFromApi.name,
    lastName: publicationFromApi.lastName,
    fullName: `${publicationFromApi.name} ${publicationFromApi.lastName}`,
    email: publicationFromApi.email,
    phone: publicationFromApi.phone,
    avatar: publicationFromApi.avatar,
    role: publicationFromApi.role,
  };
}
