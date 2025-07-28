import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  listing: {
    id: string;
    title: string;
    category: string;
    description: string;
    image_urls: string[];
    created_at: string;
  };
}

export default function ClassifiedCard({ listing }: Props) {
  return (
    <Card className="shadow-md border rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="text-lg">{listing.title}</CardTitle>
        <span className="text-xs text-gray-500">{listing.category}</span>
      </CardHeader>
      <CardContent className="space-y-2">
        {listing.image_urls.length > 0 && (
          <img
            src={listing.image_urls[0]}
            alt="Listing image"
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
        <p className="text-sm text-gray-700">{listing.description}</p>
        <p className="text-xs text-gray-400">Posted on {new Date(listing.created_at).toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}
