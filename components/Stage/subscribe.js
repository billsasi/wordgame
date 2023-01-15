
export async function subscribe(url, callback) {
    const response = await fetch(url);
    const reader = response.body.getReader();

    try {
    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        callback(new TextDecoder("utf-8").decode(value));
    }
    } catch (error) {
        subscribe(url, callback)
    }; 

    if (done) {
        subscribe(url, callback);
    } 
    console.log('Response fully received');
}