import { UserRole } from "providers/AuthProvider/constants"

export type User = {
    id: number,
    username: string,
    email: string,
    role: UserRole,
}