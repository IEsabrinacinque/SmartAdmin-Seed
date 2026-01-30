import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, provideAppInitializer } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimations(),
    provideToastr(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideHttpClient(),
      provideAppInitializer(() => {
      console.log('🚀 Angular bootstrap (equivalente App.xaml.cs)');
      const tagCliente = localStorage.getItem('TagCliente') ?? 'DemoBroker';
      console.log('📋 TagCliente:', tagCliente);

      // QUI ANDRANNO:
      // ThemeService.applyTheme(tagCliente)
      // AuthService.restoreSession()
      // ConfigService.initialize()
    }),

  ]
};
