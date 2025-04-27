import {LocalStorageKeys} from '../config/localStorage';

export class AccessTokenController {
  static saveToken(token: string) {
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  }

  static removeToken() {
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
  }
}
