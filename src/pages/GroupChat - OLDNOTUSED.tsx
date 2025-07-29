import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  sender_id: string;
  sender_email: string;
  message: string;
  created_at: string;
}

const GroupChat = () => {
  const { id: groupId } = useParams();
  const { user, session } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const isPaidUser = session?.user?.user_metadata?.is_paid;

  // Fetch messages for this group
  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("group_id", groupId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error.message);
    } else {
      setMessages(data);
    }

    setLoading(false);
  };

  // Post a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const { error } = await supabase.from("chat_messages").insert({
      group_id: groupId,
      sender_id: user?.id,
      sender_email: user?.email,
      message: newMessage.trim(),
    });

    if (error) {
      console.error("Error sending message:", error.message);
    } else {
      setNewMessage("");
    }
  };

  // Listen for new messages in real-time
  useEffect(() => {
    fetchMessages();

    const subscription = supabase
      .channel("chat-room-" + groupId)
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4 text-malaysia-dark">Group Chat</h1>

      <div className="space-y-2 mb-4 max-h-[400px] overflow-y-auto bg-gray-50 p-4 rounded">
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="border-b pb-2">
              <p className="text-sm font-semibold text-malaysia-dark">
                {msg.sender_email}
              </p>
              <p className="text-gray-700 text-sm">{msg.message}</p>
              <p className="text-xs text-gray-400">
                {new Date(msg.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>

      {isPaidUser ? (
        <div className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">
          Only paid members can post messages.
        </p>
      )}
    </div>
  );
};

export default GroupChat;
