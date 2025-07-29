import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
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

    const subscription = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `group_id=eq.${groupId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [groupId]);

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
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
        <CardContent>
          <div className="h-[400px] overflow-y-auto mb-4 space-y-3">
            {messages.map((msg) => (
			<div
			key={msg.id}
			className={`p-3 rounded-lg ${
				msg.sender_id === user?.id
				? "bg-gray-200 text-gray-900 text-right ml-auto max-w-xs"
				: "bg-gray-100 text-gray-900 mr-auto max-w-xs"
			}`}
			>
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs mt-1 text-gray-500">
                  {msg.sender_email} •{" "}
                  {new Date(msg.created_at).toLocaleTimeString()}
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
