import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

const CreateGroupModal = ({ userId, userEmail, onGroupCreated }: any) => {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;

    setLoading(true);
    const { data, error } = await supabase.from("chat_groups").insert([
      {
        title,
        created_by: userEmail || userId,
      },
    ]);

    if (error) {
      alert("Error creating group: " + error.message);
    } else {
      onGroupCreated(); // Refresh list
      setTitle("");
      setOpen(false);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          + Start Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-lg font-bold mb-2">Create New Chat Group</h2>
        <Input
          placeholder="Group name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button disabled={loading} onClick={handleCreate}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
