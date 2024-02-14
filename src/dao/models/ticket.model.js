import mongoose from "mongoose";

const ticketEsquema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      default: () => Math.random().toString(36).substring(2, 2 + 9)
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
    },
    purchaser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);


export const ticketModelo = mongoose.model("ticket", ticketEsquema);
