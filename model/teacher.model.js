const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  firstName: { required: true, type: String, trim: true },
  lastName: { required: true, type: String, trim: true },
  qualifications: { required: true, type: String, trim: true },
  maritalStatus: {
    type: String,
    required: true,
    enum: ["single", "married", "divorced", "widowed"],
  },
  title: {
    type: String,
    required: true,
    enum: ["prof", "dr", "mr", "mrs", "ms", "chief"],
  },
  height: { required: true, type: Number },
});

const teacherModel = mongoose.model("teachers", teacherSchema);

module.exports = teacherModel;
