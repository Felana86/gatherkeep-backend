export class UserEntity {
    constructor(
        public readonly id: number,
        public readonly email: string,
        public readonly password: string,
        public readonly firstName?: string,
        public readonly lastName?: string,
        public readonly role: 'HABITANT' | 'MEMBRE' | 'ASSOCIATION' = 'HABITANT',
        public readonly refreshToken?: string,
        public readonly refreshTokenSecret?: string,
    ) {}
}