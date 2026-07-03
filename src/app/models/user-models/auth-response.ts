import { ProfileDto } from "./profile-dto";

export interface AuthResponse {
    profileDto: ProfileDto,
    token: string
}