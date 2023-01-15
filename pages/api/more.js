
import getWords from "../../services/getWords";

let count = 0;
export default function handler(req, res) {
  res.status(200).json(getWords(20));
}
