import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '@/app/core/services/auth/auth.service';
import { SessionService } from '@/app/core/services/session.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  template: `
    <div class="row justify-content-center">
      <div class="col-11 col-md-8 col-lg-6 col-xl-4">
        <div class="login-card p-4 bg-dark bg-opacity-50 rounded-4">
          <h2 class="text-center mb-4">Login</h2>

          <form (ngSubmit)="login()">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                type="text"
                class="form-control form-control-lg"
                [(ngModel)]="email"
                name="email"
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Password</label>
              <input
                type="password"
                class="form-control form-control-lg"
                [(ngModel)]="password"
                name="password"
                required
              />
            </div>

            <div class="d-grid mb-3">
              <button type="submit" class="btn btn-primary btn-lg">
                Sign In
              </button>
            </div>

            <p *ngIf="errorMessage" class="text-danger text-center">
              {{ errorMessage }}
            </p>

            <div class="text-center">
              <a routerLink="/auth/forgot-password" class="small text-white">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class Login {
  email = '';
  password = '';
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private session: SessionService,
    private router: Router,
  ) {}

  login(): void {
  this.errorMessage = null;

  this.authService.login(this.email, this.password)
    .subscribe(res => {

      if (res.codErrore !== 0 || !res.dati) {
        this.errorMessage = res.messaggio;
        return;
      }

      // ✅ dati dal backend (mock)
      const token = res.dati.token;
      const menu = res.dati.menu;

      // 🔧 per ora mock, poi arriverà dal backend
      const role = 'ADMIN';
      const tagCliente = window.location.host; 
      // oppure DemoBroker / Multinsurance quando il backend lo manderà

      // ✅ salva sessione globale
      this.session.login(
        token,
        tagCliente,
        role,
        menu
      );

      // 🚀 redirect
      this.router.navigate(['/myviews/dashboard']);
    });
}
}
