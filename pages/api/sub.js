
import getWords from "../../services/getWords";

let count = 0;
export default function handler(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });

    res.write("retry: 10000\n");
    res.write("event: connecttime\n");
    res.flush();
    setInterval(() => {
        res.write(new Date().toISOString() + " >> " + count++ + "\n");
        res.flush();
    }, 500);
}
