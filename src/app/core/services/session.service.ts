import { Injectable, signal } from '@angular/core';
import { BackendMenuItem } from '@/app/mock-backend/menu/menu.mock';

export interface SessionState {
  tagCliente: string;
  token: string | null;
  role: string | null;
  menu: BackendMenuItem[];
  isLoggedIn: boolean;
}

const STORAGE_KEY = 'APP_SESSION';

@Injectable({ providedIn: 'root' })
export class SessionService {
  // 🔹 stato reattivo globale
  private readonly state = signal<SessionState>(this.load());

  // 🔹 letture pubbliche (come Preferences.Get in MAUI)
  tagCliente = () => this.state().tagCliente;
  token = () => this.state().token;
  role = () => this.state().role;
  menu = () => this.state().menu;
  isLoggedIn = () => this.state().isLoggedIn;

  // =======================
  // 🔐 LOGIN
  // =======================
  login(
    token: string,
    tagCliente: string,
    role: string,
    menu: BackendMenuItem[],
  ) {
    this.setState({
      token,
      tagCliente,
      role,
      menu,
      isLoggedIn: true,
    });
  }

  // =======================
  // 🚪 LOGOUT
  // =======================
  logout() {
    // 1️⃣ reset stato in memoria
    this.state.set(this.emptyState());

    // 2️⃣ rimozione completa dal localStorage
    localStorage.removeItem(STORAGE_KEY);
  }

  // =======================
  // 🚀 INIT (bootstrap app)
  // =======================
  init() {
    this.state.set(this.load());
  }

  // =======================
  // PRIVATE
  // =======================
 private setState(state: SessionState) {
  console.log('💾 setState → salvataggio sessione', state);
  this.state.set(state);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

  private load(): SessionState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return this.emptyState();
      }
      return JSON.parse(raw) as SessionState;
    } catch {
      return this.emptyState();
    }
  }

  private emptyState(): SessionState {
    return {
      tagCliente: 'DemoBroker', // placeholder
      token: null,
      role: null,
      menu: [],
      isLoggedIn: false,
    };
  }
}
