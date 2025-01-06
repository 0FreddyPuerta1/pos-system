import { USERS_REPOSITORY } from 'src/resources/constanst';
import { User } from './user.entity';

export const userProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
];
