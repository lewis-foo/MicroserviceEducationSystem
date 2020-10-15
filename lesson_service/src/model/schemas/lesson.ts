import mongoose from 'mongoose'

const lessonSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  lessonData: Object
})

export { lessonSchema }
