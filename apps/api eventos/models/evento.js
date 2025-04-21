import mongoose from "mongoose";

const EventoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  local: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  dono: {
    type: String,
    required: true,
  },
});

const evento = mongoose.model("Evento", EventoSchema);
export default evento;
