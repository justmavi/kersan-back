import { Roles } from '../enums/roles.enum';

export const AccessControlOptions = {
  /**
   * All API is open, anyone can request.
   */
  LevelZero: {
    GET: Roles.NO_ROLE,
    POST: Roles.NO_ROLE,
    DELETE: Roles.NO_ROLE,
    PUT: Roles.NO_ROLE,
  },
  /**
   * Read can anyone, write can only moderators and higher
   */
  LevelOne: {
    GET: Roles.NO_ROLE,
    POST: Roles.ROLE_MODERATOR,
    DELETE: Roles.ROLE_MODERATOR,
    PUT: Roles.ROLE_MODERATOR,
  },
  /**
   * Read can anyone, write can only admins and higher
   */
  LevelTwo: {
    GET: Roles.NO_ROLE,
    POST: Roles.ROLE_ADMIN,
    DELETE: Roles.ROLE_ADMIN,
    PUT: Roles.ROLE_ADMIN,
  },
  /**
   * Read can moderators, write can only admins and higher
   */
  LevelThree: {
    GET: Roles.ROLE_MODERATOR,
    POST: Roles.ROLE_ADMIN,
    DELETE: Roles.ROLE_ADMIN,
    PUT: Roles.ROLE_ADMIN,
  },
  /**
   * All actions available only for moderators and higher
   */
  LevelFour: {
    GET: Roles.ROLE_MODERATOR,
    POST: Roles.ROLE_MODERATOR,
    DELETE: Roles.ROLE_MODERATOR,
    PUT: Roles.ROLE_MODERATOR,
  },
  /**
   * All actions available only for admins and higher
   */
  LevelFive: {
    GET: Roles.ROLE_ADMIN,
    POST: Roles.ROLE_ADMIN,
    DELETE: Roles.ROLE_ADMIN,
    PUT: Roles.ROLE_ADMIN,
  },
};
