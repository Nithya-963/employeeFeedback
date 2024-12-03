import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/api/reviews'; // Backend API URL
  employees: any[] = []; // Stores employee data
  newEmployee: { id?: string; employeeName: string; review: string; role: string } = {
    employeeName: '',
    review: '',
    role: 'employee',
  }; // New or edited employee object
  isEditMode = false; // Track whether we are editing or adding

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getEmployees();
  }

  // Fetch employees from the server
  getEmployees() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  // Add or update an employee
  addOrUpdateEmployee() {
    if (this.isEditMode) {
      // Update existing employee
      this.http.put<any>(`${this.apiUrl}/${this.newEmployee.id}`, this.newEmployee).subscribe(
        (response) => {
          console.log('Employee updated:', response);
          this.resetForm();
          this.getEmployees(); // Refresh the list
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
    } else {
      // Add new employee
      this.http.post<any>(this.apiUrl, this.newEmployee).subscribe(
        (response) => {
          console.log('Employee added:', response);
          this.resetForm();
          this.getEmployees(); // Refresh the list
        },
        (error) => {
          console.error('Error adding employee:', error);
        }
      );
    }
  }

  // Edit an existing employee
  editEmployee(employee: any) {
    this.newEmployee = { ...employee, id: employee._id }; // Include the _id field for update
    this.isEditMode = true;
  }

  // Delete an employee
  deleteEmployee(id: string) {
    this.http.delete<any>(`${this.apiUrl}/${id}`).subscribe(
      (response) => {
        console.log('Employee deleted:', response);
        this.getEmployees(); // Refresh the list
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }

  // Reset the form after add or update
  resetForm() {
    this.newEmployee = { employeeName: '', review: '', role: 'employee' };
    this.isEditMode = false;
  }
}
