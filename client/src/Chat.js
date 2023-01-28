export default class Chat {
    static URL = "ws://localhost:8080";

    constructor(options) {
        this.options = options;
        this.ws = new WebSocket(Chat.URL);

        this.ws.onopen = this.onopen.bind(this);
        this.ws.onmessage = this.onmessage.bind(this);
        this.ws.onclose = this.onclose;
        this.ws.onerror = this.onerror;
    }

    onopen() {
        console.log("Connection with server was established");
        this.send({
            username: "Server",
            message: "New client connected",
        });
    }

    onmessage(event) {
        const data = JSON.parse(event.data);

        this.options.onMessage(data);
    }

    onclose() {
        console.log("Connection with server was closed");
    }

    onerror(error) {
        console.log("Error", error);
    }

    send(data) {
        this.ws.send(JSON.stringify(data));
    }
}
