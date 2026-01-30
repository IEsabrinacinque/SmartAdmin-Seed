import { BackendMenuItem } from '../menu/menu.mock';
import { MENU_MOCK } from '../menu/menu.mock';

export interface LoginResponseMock {
  codErrore: number;
  messaggio: string;
  dati?: {
    token: string;
    user: {
      id: number;
      nome: string;
      cognome: string;
      email: string;
    };
    menu: BackendMenuItem[];
  };
}

export const LOGIN_RESPONSE_OK: LoginResponseMock = {
  codErrore: 0,
  messaggio: 'Login effettuato con successo',
  dati: {
    token: 'FAKE_JWT_TOKEN',
    user: {
      id: 1,
      nome: 'Mario',
      cognome: 'Rossi',
      email: 'mario.rossi@email.it'
    },
    menu: MENU_MOCK
  }
};

export const LOGIN_RESPONSE_ERROR = {
  codErrore: 101,
  messaggio: 'Username o password non validi'
};
