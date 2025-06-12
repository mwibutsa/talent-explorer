import { useUserContext } from "@/context/userContext";
import { IChatbotMessage } from "@/interfaces/chatbot";
import { extractSearchParamsFromPrompt } from "@/llms/langchain";
import { mapToIUser } from "@/utils/helpers";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { ISearchResponse } from "@/interfaces/people";

export default function useChatbot() {
  const [messages, setMessages] = useState<IChatbotMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your AI talent assistant. I can help you search for specific talents using natural language. Try asking me something like 'Find me developers with React experience' or 'Show me designers from New York'. I can also highlight specific users from your current search results!",
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

  const { setUsers } = useUserContext();

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
        const { size, ...payload } = await extractSearchParamsFromPrompt(input);
        if (payload.skill) {
          payload["skill/role"] = {
            text: payload.skill.term,
            proficiency: payload.skill.proficiency,
          };
          delete payload.skill;
        }
        const { data } = await axios.post<ISearchResponse>(
          "https://search.torre.co/people/_search",
          payload,
          {
            params: { size },
          }
        );

        setUsers(mapToIUser(data));

        const assistantMessage: IChatbotMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Cool, that is done. Would you like me to help you with anything else?",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
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
    [input, loading, setUsers]
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
