import React, { FunctionComponent } from "react";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";

interface User {
  chatId: string;
  userId: string;
}

export const App: FunctionComponent = () => {
  const [client, setClient] = React.useState<Socket>();
  const [chatId, setChatId] = React.useState<string | undefined>();
  const [userName, setUserName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [chatUsers, setChatUsers] = React.useState<User[]>();
  const [mode, setMode] = React.useState("disable");

  const socketClientRef = React.useRef<Socket>();
  const messagesEndRef = React.useRef<HTMLDivElement>();

  const scrollToBottom = () => {
    messagesEndRef.current &&
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    if (mode === "disable") return;
    const client = io("192.168.1.100:9100");
    client.on("connect", () => {
      console.log("connected");
      setClient(client);
      setChatId(client.id);
    });
    client.on("disconnect", () => {
      console.log("diconnected");
    });
    client.on("users", (users: User[]) => {
      setChatUsers(users.map((u) => (u.userId !== u.chatId ? u : undefined)));
    });
    client.on("message", (content) => {
      setMessages(content);
    });
    socketClientRef.current = client;
  }, [mode]);

  React.useEffect(scrollToBottom, [messages]);
  React.useEffect(() => console.log(chatUsers), [chatUsers]);

  return (
    <>
      <Header>
        {chatId && mode !== "disable" && (
          <Chat>
            <Title>Общий чат</Title>
            <ChatBody>
              {messages.map(({ message, from, nickName }, i) => {
                if (from === chatId) {
                  return (
                    <Message key={i}>
                      {nickName && <MyNickName>{nickName}</MyNickName>}
                      {message}
                    </Message>
                  );
                } else {
                  return (
                    <MyMessage key={i}>
                      {nickName && <NickName>{nickName}</NickName>}
                      {message}
                    </MyMessage>
                  );
                }
              })}
              <div ref={messagesEndRef} />
            </ChatBody>
          </Chat>
        )}
        <button
          onClick={() => {
            setMode("enable");
          }}
        >
          Открыть общий чат
        </button>
        {chatId !== undefined && mode !== "disable" && (
          <>
            <input
              placeholder="Введите никнейм"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <textarea
              placeholder="Напишите текст"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  client.emit("message-sent", {
                    message,
                    from: chatId,
                    nickName: userName,
                  });
                  setMessage("");
                }
              }}
              value={message}
            />
            <button
              onClick={() => {
                client.emit("message-sent", {
                  message,
                  from: chatId,
                  nickName: userName,
                });
                setMessage("");
              }}
            >
              Отправить
            </button>
            <button
              onClick={() => {
                client.disconnect();
                setMode("disable");
              }}
            >
              Закрыть
            </button>
            <div>
              connection is ready
              <br /> socket id = {chatId}
            </div>
          </>
        )}
      </Header>
    </>
  );
};

const Header = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  gap: 15px;
`;

const Chat = styled.div`
  position: absolute;
  width: 70%;
  height: 25%;
  background-color: #292f56;
  border: solid 4px black;
  border-radius: 16px;
  padding: 14px;
  top: 5%;
`;

const Message = styled.div`
  width: fit-content;
  margin-top: 16px;
  background-color: #fff;
  color: black;
  border-radius: 15px;
  font-weight: 400;
  font-size: 0.75rem;
  padding: 0 20px;
  overflow-wrap: break-word;
  max-width: 75%;
`;

const MyMessage = styled(Message)`
  margin-top: 12px;
  margin-left: auto;
`;

const Title = styled.div``;

const ChatBody = styled.div`
  overflow: auto;
  height: 90%;
`;

const MyNickName = styled.div`
  font-size: 0.5rem;
  text-align: start;
  color: yellow;
`;

const NickName = styled.div`
  font-size: 0.5rem;
  text-align: end;
  color: forestgreen;
`;
