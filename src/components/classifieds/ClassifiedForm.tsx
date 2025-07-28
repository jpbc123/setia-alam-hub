import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onPost: () => void;
}

export default function ClassifiedForm({ open, setOpen, onPost }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Sports & Fitness");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    let imageUrl = "";

    if (imageFile) {
      const { data, error } = await supabase.storage
        .from("classifieds")
        .upload(`${user.id}/${Date.now()}_${imageFile.name}`, imageFile);

      if (error) return alert("Upload failed");

      const { data: publicURL } = supabase.storage
        .from("classifieds")
        .getPublicUrl(data.path);
      imageUrl = publicURL.publicUrl;
    }

    const { error } = await supabase.from("classifieds").insert({
      user_id: user.id,
      title,
      category,
      description,
      image_urls: imageUrl ? [imageUrl] : [],
    });

    if (error) return alert("Failed to post listing");

    setOpen(false);
    onPost();
    setTitle("");
    setCategory("Sports & Fitness");
    setDescription("");
    setImageFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Post a New Listing</DialogTitle>
        </DialogHeader>

        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option>Sports & Fitness</option>
          <option>Home & Living</option>
          <option>Services</option>
          <option>Buy & Sell</option>
          <option>Others</option>
        </select>
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />

        <Button onClick={handleSubmit}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
}
