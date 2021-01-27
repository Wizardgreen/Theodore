import { awakeTheodore } from "./bot";

require("dotenv").config();
const key = process.env.KEY;

if (key) {
  awakeTheodore(key);
} else {
  throw new Error("Key is undefined");
}
