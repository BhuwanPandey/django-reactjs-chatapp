
function ChatUser(props) {
  const chat = props.data.chat;
  const url = props.data.url;
  const user = props.data.user;
  const online = props.online;
  const selectDiv = props.selectDiv;
  const onSelect = props.select;

  return (
    <div
      className={`chatUser1 ${
        selectDiv === chat.display_name ? "selected" : ""
      }`}
      onClick={(e) => onSelect(chat)}
    >
      <div className="imgContainer">
        <img
          src={
            chat.chat_profile
              ? url + chat.chat_profile
              : `https://i.pravatar.cc/300?img=${chat.display_name_id}`
          }
          alt={`${chat.display_name[0]}_img`}
        />
        {online ? (
          <span className="onlineStatus"></span>
        ) : (
          <span className="offlineStatus"></span>
        )}
      </div>
      <div className="chatuserInfo">
        <span>{chat.display_name}</span>
        <p>
          {user.username === chat.last_message_sender && (
            <span className="messageSender">You:</span>
          )}
          {chat.last_message && chat.last_message.length > 15 ? chat.last_message.slice(0,15)+"  ..." : chat.last_message}
        </p>
      </div>
    </div>
  );
}
export default ChatUser;
