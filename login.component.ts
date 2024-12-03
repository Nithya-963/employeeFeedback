import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = { username: '', password: '' };
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const loginData = {
      username: this.user.username.trim(),
      password: this.user.password.trim(),
    };
  
    this.http.post(`${this.apiUrl}/authenticate`, loginData).subscribe(
      (response: any) => {
        console.log('Login response:', response);
        alert('Login successful');
        if (response.role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (response.role === 'employee') {
          this.router.navigate(['/employee']);
        }
      },
      (error) => {
        console.error('Login error:', error);
        alert(error.error.message || 'Login failed. Please check your credentials.');
      }
    );
  }
  
  
}