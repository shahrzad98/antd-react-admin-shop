import { RootState } from '@src/core/Configs/StoreConfiguration';

import { User } from '../model';

const authProfile = (state: RootState): User => state.auth.profile;
const isAuthenticated = (state: RootState): boolean => !!state.auth.token;
const isAuthPending = (state: RootState): boolean => state.auth.isPending;

export default { isAuthenticated, isAuthPending, authProfile };
