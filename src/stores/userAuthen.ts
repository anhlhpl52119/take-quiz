import { defineStore } from 'pinia';
import { Storage } from '@util/Storage';
import { ACCESS_TOKEN_KEY } from '@enum/cacheEnum';
import { loginToken, logout, verifyToken } from '@api/auth';
import { UserRole } from '@enum/roleEnum';

interface IUserAuthState {
  token: string | null;
  userInfo: Partial<API.UserInfo> | undefined;
}
export const useUserAuth = defineStore({
  id: 'authStore',
  state: (): IUserAuthState => ({
    token: Storage.get(ACCESS_TOKEN_KEY, null), // get saved "token" in when setup sucess
    userInfo: undefined,
  }),
  getters: {
    getToken(): string | null {
      return this.token!;
    },
    getUserRole(state): UserRole {
      return state.userInfo?.role!;
    },
    getUserName(state): string {
      return (
        state.userInfo?.username!.charAt(0).toUpperCase()! + state.userInfo?.username!.slice(1)!
      );
    },
    getUserEmail(state): string {
      return state.userInfo?.email!;
    },
  },
  actions: {
    async loginReturnToken(loginParams: API.LoginParams) {
      try {
        const { token } = await loginToken(loginParams);
        this._saveTokenToStorage(token);
        return this.afterLogin();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async loginByToken(loginParams: API.LoginParams) {
      try {
        const { token } = await loginToken(loginParams);
        this._saveTokenToStorage(token);
        return this.afterLogin();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async doLogout() {
      await logout();
      this.resetToken();
    },

    resetToken() {
      Storage.clear();
      this.$reset();
    },

    async afterLogin() {
      try {
        const resUserInfo = await verifyToken();
        // const resUserInfo = await verifyUser();
        this.userInfo = resUserInfo;
        this._generateUserRoutes(this.getUserRole);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    _saveTokenToStorage(token: string) {
      this.token = token ?? '';
      const expiretime = 7 * 24 * 60 * 60 * 1000;
      Storage.set(ACCESS_TOKEN_KEY, token, expiretime);
    },

    _generateUserRoutes(userRole: UserRole) {
      switch (userRole) {
        case UserRole.admin:
          //TODO Generate Admin Routes
          break;
        case UserRole.customer:
          //TODO Generate customer Routes
          break;
        case UserRole.guest:
          //TODO Generate guest Routes
          break;
        default:
          // Do someThing
          break;
      }
    },
  },
});
