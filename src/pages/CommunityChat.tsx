import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import CreateGroupModal from "@/components/chat/CreateGroupModal";
import { useNavigate } from "react-router-dom";

interface ChatGroup {
  id: string;
  title: string;
  created_by: string;
  created_at: string;
}

const CommunityChat = () => {
  const { user, session } = useAuth();
  const [chatGroups, setChatGroups] = useState<ChatGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isPaidUser = session?.user?.user_metadata?.is_paid;

  const fetchGroups = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("chat_groups")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching chat groups:", error.message);
    } else {
      setChatGroups(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-malaysia-dark">Community Chat</h1>
        {isPaidUser && (
          <CreateGroupModal
            userId={user?.id}
            userEmail={user?.email}
            onGroupCreated={fetchGroups}
          />
        )}
      </div>

      {loading ? (
        <p>Loading chat groups...</p>
      ) : chatGroups.length === 0 ? (
        <p className="text-gray-500">No chat groups yet.</p>
      ) : (
        chatGroups.map((group) => (
          <Card
            key={group.id}
            className="mb-4 cursor-pointer hover:shadow-md transition"
            onClick={() => navigate(`/group-chat/${group.id}`)}
          >
            <CardHeader>
              <h2 className="text-lg font-semibold text-malaysia-dark">
                {group.title}
              </h2>
              <p className="text-sm text-gray-500">
                Created by: {group.created_by} on{" "}
                {new Date(group.created_at).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 italic">
                Only paid members can start groups. Viewing only.
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default CommunityChat;
