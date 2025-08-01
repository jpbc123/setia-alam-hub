import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Message {
  id: string;
  group_id: string;
  sender_id: string;
  sender_email: string;
  content: string;
  created_at: string;
}

const GroupChatPage = () => {
  const { id: groupId } = useParams<{ id: string }>();
  const { user, session } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [groupTitle, setGroupTitle] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const isPaidUser = session?.user?.user_metadata?.is_paid;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("group_id", groupId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setMessages(data);
    }
  };

  const fetchGroupTitle = async () => {
    const { data, error } = await supabase
      .from("chat_groups")
      .select("title")
      .eq("id", groupId)
      .single();

    if (data && !error) {
      setGroupTitle(data.title);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const { error } = await supabase.from("chat_messages").insert({
      group_id: groupId,
      sender_id: user?.id,
      sender_email: user?.email,
      content: inputMessage.trim(),
    });

    if (!error) {
      setInputMessage("");
    } else {
      console.error("Failed to send message:", error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchGroupTitle();

    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
        },
        (payload) => {
          const newMsg = payload.new as Message;
          if (newMsg.group_id === groupId) {
            setMessages((prev) => [...prev, newMsg]);

            // Optional: play sound or add animation
            const audio = new Audio("/sounds/new-message.mp3");
            audio.play().catch(() => {});
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [groupId]);

  useEffect(scrollToBottom, [messages]);

  const formatTimestamp = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return isToday ? `Today at ${time}` : `${date.toLocaleDateString()} at ${time}`;
  };

	return (
	<div className="h-screen flex flex-col max-w-4xl mx-auto px-4 py-4 pb-24">
		<Card className="flex flex-col flex-1 min-h-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => navigate("/community-chat")}>
              ← Back
            </Button>
            <h1 className="text-2xl font-bold text-malaysia-dark text-center flex-1">
              {groupTitle}
            </h1>
            <div className="w-[75px]" /> {/* Spacer for alignment */}
          </div>
        </CardHeader>
			<CardContent className="flex flex-col flex-1 min-h-0">
			<div className="flex-1 overflow-y-auto mb-4 space-y-3 px-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg shadow ${
                  msg.sender_id === user?.id
                    ? "bg-gray-200 text-gray-900 text-right ml-auto max-w-xs"
                    : "bg-gray-100 text-gray-900 mr-auto max-w-xs"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs mt-1 text-gray-500">
                  {msg.sender_email} • {formatTimestamp(msg.created_at)}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {isPaidUser ? (
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          ) : (
            <p className="text-center text-gray-500 italic">
              Only paid users can send messages.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupChatPage;
