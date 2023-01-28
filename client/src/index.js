import Chat from "./Chat";

const form = document.querySelector("#addMsg");
const container = document.querySelector("#container");
const inputUsername = document.querySelector("#userName");
const inputMessage = document.querySelector("#message");
const chat = new Chat({ onMessage: renderMessage });

form.addEventListener("submit", onAddMsgFormClick);

function onAddMsgFormClick(e) {
    e.preventDefault();

    addMessage();

    cleanInputField();
}

function addMessage() {
    const data = getInputFieldValue();
    if (
        isEmptyStrValidation(data.username) ||
        isEmptyStrValidation(data.message)
    ) {
        return;
    }
    chat.send(data);
}

function renderMessage(data) {
    const html = generateMessageHtml(data);

    container.insertAdjacentHTML("beforeend", html);
}

function generateMessageHtml(data) {
    return `<div>${data.username}: ${data.message}</div>`;
}

function getInputFieldValue() {
    return {
        username: inputUsername.value,
        message: inputMessage.value,
    };
}

function isEmptyStrValidation(data) {
    if (data == "") {
        alert("Invalid name or message !");
        return true;
    }

    return false;
}

function cleanInputField() {
    inputMessage.value = "";
}
