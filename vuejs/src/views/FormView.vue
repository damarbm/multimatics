<script>
export default {
  data() {
    return {
      inputData: {
        nim: '',
        name: '',
        subject: '',
        semester: '',
        score: {
          task: 0,
          midExam: 0,
          finalExam: 0,
        },
      },
      subjects: [
        'Logika Algoritma',
        'Pendidikan Pancasila',
        'Pemrograman Mobile',
        'Pemrograman Web',
        'Matematika Komputasi',
      ],
    }
  },
  methods: {
    submitForm() {
      alert(`
      NIM: ${this.inputData.nim}
      Nama: ${this.inputData.name}
      Mata kuliah: ${this.inputData.subject}
      Semester: ${this.inputData.semester}
      Predikat nilai: ${this.calculatedScore}`)

      return this.inputData
    },
  },
  computed: {
    calculatedScore() {
      const { task, midExam, finalExam } = this.inputData.score
      const taskScore = 0.2 * task
      const midExamScore = 0.3 * midExam
      const finalExamScore = 0.5 * finalExam
      const totalScore = taskScore + midExamScore + finalExamScore

      if (totalScore >= 80) {
        return 'A'
      } else if (totalScore >= 70) {
        return 'B'
      } else if (totalScore >= 60) {
        return 'C'
      } else if (totalScore >= 50) {
        return 'D'
      } else {
        return 'E'
      }
    },
  },
}
</script>
<template>
  <div id="form">
    <h1>Formulir Nilai Mahasiswa</h1>
    <label for="" class="label">NIM: </label>
    <input type="text" v-model="inputData.nim" placeholder="Masukkan NIM" />
    <br />
    <label for="" class="label">Nama: </label>
    <input type="text" v-model="inputData.name" placeholder="Masukkan nama" />
    <br />
    <label for="" class="label">Mata kuliah: </label>
    <select name="" id="" v-model="inputData.subject">
      <option v-for="(value, id) in subjects" :key="id" :value="value">
        {{ value }}
      </option>
    </select>
    <br />
    <div style="display: flex; gap: 4px; align-items: center">
      <label for="" class="label">Semester: </label>
      <div style="display: flex; gap: 10px">
        <div v-for="(value, id) in [1, 2, 3, 4, 5, 6, 7, 8]" :key="id">
          <input type="radio" :value="value" v-model="inputData.semester" /> {{ value }}
        </div>
      </div>
    </div>
    <label for="" class="label">Nilai tugas: </label>
    <input
      type="text"
      v-model.number="inputData.score.task"
      placeholder="Masukkan nilai tugas"
    /><br />
    <label for="" class="label">Nilai UTS: </label>
    <input
      type="text"
      v-model.number="inputData.score.midExam"
      placeholder="Masukkan nilai UTS"
    /><br />
    <label for="" class="label">Nilai UAS: </label>
    <input
      type="text"
      v-model.number="inputData.score.finalExam"
      placeholder="Masukkan nilai UAS"
    />
    <br />
    <p>Predikat nilai: {{ calculatedScore }}</p>
    <button style="width: 50%" @click="submitForm">Kirim</button>
    <br />
    <!-- <p>{{ inputData }}</p> -->
  </div>
</template>
<style>
.label {
  display: inline-block;
  min-width: 100px;
}
</style>
