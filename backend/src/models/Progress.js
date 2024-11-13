import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    menteeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalScore: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Method to calculate percentage before saving
progressSchema.pre('save', function (next) {
  this.percentage = (this.score / this.totalScore) * 100;
  next();
});

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;
