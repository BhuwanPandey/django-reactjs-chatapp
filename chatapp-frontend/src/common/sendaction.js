

export const commonAction = (text,chat_name,data,isfirst,socket) =>{
    const firstconnection = {
        type: "chat_begin",
        message: text,
        chat_name: chat_name,
        user: data.display_name,
    };
    const input = {
    type: "chat_message",
    message: text,
    chat_id: data.chat_id,
    };
    isfirst
    ? socket.send(JSON.stringify(firstconnection))
    : socket.send(JSON.stringify(input));
}



// commonAction