// Default expire time item
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

/**
 * Create a local cache object
 * @param {string=} prefixKey -
 * @param {Object} [storage=localStorage] - sessionStorage | localStorage
 */
export const createStorage = ({
  prefixKey = '',
  storage = localStorage,
} = {}) => {
  /**
   * Local cache class
   * @class Storage
   */
  const Storage = class {
    private storage = storage;
    private prefixKey?: string = prefixKey;

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    /**
     * @description set cache
     * @param {string} key cache key
     * @param {*} value cache value
     * @param expire
     */
    set(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
      const stringData = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
      });
      this.storage.setItem(this.getKey(key), stringData);
    }

    /**
     * read cache
     * @param {string} key cache key
     * @param {*=} def default value
     */
    get<T = any>(key: string, def: any = null): T {
      const item = this.storage.getItem(this.getKey(key));
      if (item) {
        try {
          const data = JSON.parse(item);
          const { value, expire } = data;
          // Return directly within the validity period
          if (expire === null || expire >= Date.now()) {
            return value;
          }
          this.remove(this.getKey(key));
        } catch (e) {
          return def;
        }
      }
      return def;
    }

    /**
     * Remove an item from the cache
     * @param {string} key
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    /**
     * Clear all caches
     * @memberOf Cache
     */
    clear(): void {
      this.storage.clear();
    }

    /**
     * set cookies
     * @param {string} name cookie name
     * @param {*} value cookie value
     * @param {number=} expire expiration time
     * If the expiration time is set, the browser automatically deletes by default
     * @example
     */
    setCookie(
      name: string,
      value: any,
      expire: number | null = DEFAULT_CACHE_TIME
    ) {
      document.cookie = `${this.getKey(name)}=${value}; Max-Age=${expire}`;
    }

    /**
     * Get cookie value by name
     * @param name
     */
    getCookie(name: string): string {
      const cookieArr = document.cookie.split('; ');
      for (let i = 0, length = cookieArr.length; i < length; i++) {
        const kv = cookieArr[i].split('=');
        if (kv[0] === this.getKey(name)) {
          return kv[1];
        }
      }
      return '';
    }

    /**
     * Delete the specified cookie by keyname
     * @param {string} key
     */
    removeCookie(key: string) {
      this.setCookie(key, 1, -1);
    }

    /**
     * Empty cookies to invalidate all cookies
     */
    clearCookie(): void {
      const keys = document.cookie.match(/[^ =;]+(?==)/g);
      if (keys) {
        for (let i = keys.length; i--; ) {
          document.cookie = `${keys[i]}=0;expire=${new Date(0).toUTCString()}`;
        }
      }
    }
  };
  return new Storage();
};

export const Storage = createStorage();

export default Storage;
