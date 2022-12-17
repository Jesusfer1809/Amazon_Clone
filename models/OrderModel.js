import { Schema, model, models } from 'mongoose'

const orderSchema = new Schema(
  {
    session_id: {
      type: String,
      required: [true, 'id required']
    },
    amount: {
      type: Number
    },
    images: {
      type: [String]
    },
    customer: {
      type: String,
      require: [true, 'You must provide a customer']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

// taskSchema.pre("save", async function (next) {
//   this.creator = await Promise.all(
//     this.creator.map(async (id) => User.findById(id))
//   );
//   next();
// });

export default models.Order || model('Order', orderSchema)
