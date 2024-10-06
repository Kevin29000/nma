export class UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    height: number;
    weight: number;
    gender: 'masculin' | 'feminin';
    birthdate: Date;
}