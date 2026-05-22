import { ProfileDto } from "./profile-dto";

export interface SignUpResponse {
    profileDto: ProfileDto,
    token: string
}