const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  students_number: { type: String }, 
  year_id: { type: Number }, 
}, { collection: 'student' }); 

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
