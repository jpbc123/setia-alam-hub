import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  group_id: string;
  user_id: string;
  user_email: string;
  content: string;
  created_at: string;
}

const GroupChatPage = () => {
  const { id } = useParams(); // group ID from route
  const { user, session } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const isPaidUser = session?.user?.user_metadata?.is_paid;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load existing messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("group_id", id)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error loading messages:", error.message);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();
  }, [id]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel(`chat-group-${id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `group_id=eq.${id}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => [...prev, newMsg]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  // Submit handler
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const { error } = await supabase.from("chat_messages").insert({
      group_id: id,
      user_id: user?.id,
      user_email: user?.email,
      content: newMessage.trim(),
    });

    if (error) {
      console.error("Error sending message:", error.message);
    } else {
      setNewMessage("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-xl font-bold mb-4 text-malaysia-dark">
        Group Chat
      </h1>

      <div className="bg-white rounded-lg shadow p-4 max-h-[70vh] overflow-y-auto border">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-3">
            <div className="text-sm font-medium text-malaysia-dark">
              {msg.user_email}
            </div>
            <div className="text-sm text-gray-700">{msg.content}</div>
            <div className="text-xs text-gray-400">
              {new Date(msg.created_at).toLocaleString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {isPaidUser ? (
        <div className="mt-4 flex gap-2">
          <Input
            placeholder="Type your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      ) : (
        <p className="text-sm mt-4 italic text-gray-500">
          Only paid members can post messages. Upgrade to reply.
        </p>
      )}
    </div>
  );
};

export default GroupChatPage;
