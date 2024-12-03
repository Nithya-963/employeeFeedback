import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/api'; // Backend API URL
  employees: any[] = [];
  currentEmployee: { name: string } = { name: 'John Doe' }; // Placeholder data
  reviewData = {
    employeeName: '',
    review: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.http.get<any[]>(`${this.apiUrl}/users`).subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  addReview() {
    const review = {
      employeeName: this.reviewData.employeeName,
      review: this.reviewData.review,
    };

    this.http.post<any>(`${this.apiUrl}/reviews`, review).subscribe(
      (response) => {
        console.log('Review added:', response);
        // Clear form fields after submission
        this.reviewData.employeeName = '';
        this.reviewData.review = '';
      },
      (error) => {
        console.error('Error adding review:', error);
      }
    );
  }

  addEmployee() {
    const employee = { name: this.reviewData.employeeName };
    this.http.post<any>(`${this.apiUrl}/users`, employee).subscribe(
      (response) => {
        console.log('Employee added:', response);
        this.getEmployees();
      },
      (error) => {
        console.error('Error adding employee:', error);
      }
    );
  }

  editEmployee(id: number, updatedData: any) {
    this.http.put<any>(`${this.apiUrl}/users/${id}`, updatedData).subscribe(
      (response) => {
        console.log('Employee updated:', response);
        this.getEmployees();
      },
      (error) => {
        console.error('Error updating employee:', error);
      }
    );
  }

  deleteEmployee(id: number) {
    this.http.delete<any>(`${this.apiUrl}/users/${id}`).subscribe(
      (response) => {
        console.log('Employee deleted:', response);
        this.getEmployees();
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }
}
