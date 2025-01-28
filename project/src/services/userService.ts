import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'auth_token';
const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 hour in milliseconds

let inactivityTimer: NodeJS.Timeout;

export interface JWTPayload {
  username: string;
  role: 'admin' | 'user';
  exp: number;
}

export const userService = {
  generateToken(username: string, role: 'admin' | 'user'): string {
    const payload = {
      username,
      role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
    };
    // In a real app, this would be done on the server
    // For demo purposes, we'll just base64 encode the payload
    return btoa(JSON.stringify(payload));
  },

  setToken(token: string): void {
    sessionStorage.setItem(TOKEN_KEY, token);
    this.resetInactivityTimer();
  },

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  clearToken(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
  },

  verifyToken(): JWTPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = JSON.parse(atob(token)) as JWTPayload;
      const now = Math.floor(Date.now() / 1000);
      
      if (decoded.exp < now) {
        this.clearToken();
        return null;
      }
      
      return decoded;
    } catch (error) {
      this.clearToken();
      return null;
    }
  },

  resetInactivityTimer(): void {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    inactivityTimer = setTimeout(() => {
      this.clearToken();
      window.location.href = '/login';
    }, INACTIVITY_TIMEOUT);
  },

  setupInactivityListeners(): void {
    const events = ['mousedown', 'keydown', 'mousemove', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, () => this.resetInactivityTimer());
    });
  },
};