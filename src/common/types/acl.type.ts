import { Roles } from '../enums/roles.enum';
import { AccessMethods } from './access-methods.type';

export type AccesssControlList = { [P in AccessMethods]: Roles };
