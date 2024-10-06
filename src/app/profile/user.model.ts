export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    height: number;
    weight: number;
    gender: 'masculin' | 'feminin' | '';
    birthdate: string;
    activity: 'sedentaire' | 'legerementActif' | 'moderementActif' | 'tresActif' | 'extemementActif' | '';
    goal: 'perteDePoids' | 'maintientDuPoids' | 'priseDeMasse' | '';
    activityLabel?: string; //////////////////////////////////////////////////
    genderLabel?: string;
    goalLabel?: String;
  }