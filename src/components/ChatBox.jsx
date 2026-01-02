
import { useEffect, useRef, useState } from "react";
import { sendMessageToBot } from "../utils/fakeChatApi.js";
import "../styles/chat.css";

function MessageBubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`msg-row ${isUser ? "right" : "left"}`}>
      <div className={`bubble ${isUser ? "user" : "bot"}`}>
        {!isUser && <span className="avatar">🤖</span>}
        <div className="bubble-text">{text}</div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="msg-row left">
      <div className="bubble bot typing">
        <span className="avatar">🤖</span>
        <div className="dots"><span></span><span></span><span></span></div>
      </div>
    </div>
  );
}

export default function ChatBox() {
  const [messages, setMessages] = useState(() => [
    { id: "m1", role: "bot", text: "Hi! I’m your ShopCart assistant. How can I help today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { id: crypto.randomUUID(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessageToBot(text);
      const botMsg = { id: crypto.randomUUID(), role: "bot", text: reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "bot", text: "Sorry, I had trouble responding. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-wrap">
      <div className="chat-header">
        <div className="chat-title">Chat Assistant</div>
        <div className="chat-subtitle">Ask about products, price, or recommendations</div>
      </div>

      <div className="chat-list" ref={listRef} aria-live="polite">
        {messages.map((m) => <MessageBubble key={m.id} role={m.role} text={m.text} />)}
        {loading && <TypingIndicator />}
      </div>

      <div className="chat-input-row">
        <textarea
          className="chat-input"
          rows={1}
          placeholder="Type your message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="chat-send" onClick={sendMessage} disabled={loading || input.trim() === ""}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
