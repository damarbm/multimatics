<script>
import axios from 'axios'

export default {
  data() {
    return {
      baseUrl: 'https://cordova-media.com/apps/restapi/api',
      employees: [],
      newEmployee: { name: '', email: '', designation: '' },
      editEmployee: null,
    }
  },
  methods: {
    async getAllEmployees() {
      try {
        const response = await axios.get(`${this.baseUrl}/list`)

        this.employees = response.data.slice(-15)
      } catch (error) {
        console.error(error)
      }
    },
    async createEmployee() {
      try {
        const response = await axios.post(`${this.baseUrl}/store`, this.newEmployee)
        this.employees.unshift(response.data)
        this.newEmployee = { name: '', email: '', designation: '' }
        this.getAllEmployees()
      } catch (error) {
        console.error(error)
      }
    },
    async updateEmployee() {
      try {
        const response = await axios.put(
          `${this.baseUrl}/update/${this.editEmployee.id}`,
          this.editEmployee,
        )
        const index = this.employees.findIndex((employee) => employee.id === this.editEmployee.id)
        this.employees[index] = response.data
        this.editEmployee = null
        this.getAllEmployees()
      } catch (error) {
        console.error(error)
      }
    },
    async deleteEmployee(id) {
      try {
        await axios.delete(`${this.baseUrl}/delete/${id}`)
        this.employees = this.employees.filter((employee) => employee.id !== id)
      } catch (error) {
        console.error(error)
      }
    },
    setEditEmployee(employee) {
      this.editEmployee = { ...employee }
    },
  },
  mounted() {
    this.getAllEmployees()
  },
}
</script>
<template>
  <div>
    <h1>Vue Rest API CRUD</h1>
    <div>
      <h2>Add Employee</h2>
      <input v-model="newEmployee.name" placeholder="Employee Name" />
      <input v-model="newEmployee.email" placeholder="Employee Email" />
      <input v-model="newEmployee.designation" placeholder="Employee Designation" />
      <button @click="createEmployee">Add</button>
    </div>
    <div v-if="editEmployee">
      <h2>Edit Employee</h2>
      <input v-model="editEmployee.name" />
      <input v-model="editEmployee.email" />
      <input v-model="editEmployee.designation" />
      <button @click="updateEmployee">Edit</button>
      <button @click="editEmployee = null">Batal</button>
    </div>
    <table border="1" style="border-collapse: collapse; padding-left: 10px" cellpadding="2">
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Email</th>
        <th>Designation</th>
        <th>Action</th>
      </tr>
      <tr v-for="(value, id) in employees" :key="id">
        <td>{{ id + 1 }}</td>
        <td>{{ value.name }}</td>
        <td>{{ value.email }}</td>
        <td>{{ value.designation }}</td>
        <td>
          <button @click="setEditEmployee(value)">Edit</button>
          <button @click="deleteEmployee(value.id)">Hapus</button>
        </td>
      </tr>
    </table>
  </div>
</template>
<style></style>
