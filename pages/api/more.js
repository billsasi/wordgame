
import getWords from "../../services/getWords";

let count = 0;
export default function handler(req, res) {
  const arr = [];
  for (let i = 0; i < 50; i++) {
    ++count;
    arr.push('n' + count);
  }
  res.status(200).json(arr);
}
