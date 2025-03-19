import { Role } from '@prisma/client';

export class UserEntity {
    constructor(
        public id: number,
        public  email: string,
        public  password: string,
        public  firstName?: string | null,
        public  lastName?: string | null,
        public  role?   : Role | null,
        public  refreshToken?: string | null,
    ) {}
}