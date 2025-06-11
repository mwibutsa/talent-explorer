import { IChatbotMessage, IChatbotUser } from "@/interfaces/chatbot";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useChatbot(
  users: IChatbotUser[],
  onUserHighlight: (usernames: string[]) => void
) {
  const [messages, setMessages] = useState<IChatbotMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your AI talent assistant. I can help you search for specific talents using natural language. Try asking me something like 'Find me 10 developers with React experience' or 'Show me designers from New York'. I can also highlight specific users from your current search results!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || loading) return;

      const userMessage: IChatbotMessage = {
        id: Date.now().toString(),
        role: "user",
        content: input,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: input,
            availableUsers: users.map((u) => ({
              username: u.username,
              name: u.name,
            })),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const assistantMessage: IChatbotMessage = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.message,
            timestamp: new Date(),
            highlightedUsers: data.highlightedUsers || [],
          };
          setMessages((prev) => [...prev, assistantMessage]);

          // Highlight users if any were mentioned
          if (
            data.highlightedUsers &&
            data.highlightedUsers.length > 0 &&
            onUserHighlight
          ) {
            onUserHighlight(data.highlightedUsers);
          }
        }
      } catch (error) {
        console.error("Chat failed:", error);
        const errorMessage: IChatbotMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, users, onUserHighlight]
  );

  return {
    messages,
    input,
    loading,
    messagesEndRef,
    handleSubmit,
    setInput,
    scrollToBottom,
  };
}
