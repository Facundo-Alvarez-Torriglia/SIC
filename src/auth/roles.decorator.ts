import { SetMetadata } from "@nestjs/common"
import { Roles } from "src/common/types/roles"


export const ROLES_KEY="roles"
export const RolesG= (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles)