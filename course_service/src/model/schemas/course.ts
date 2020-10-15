import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  owner: String,
  tags: [],
  learningObjectives: [],
  lessons: [],
  assesments: [],
  priorKnowledge: []
})

export { courseSchema }
