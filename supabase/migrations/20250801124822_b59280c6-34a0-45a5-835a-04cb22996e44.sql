-- Create classifieds table
CREATE TABLE public.classifieds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.classifieds ENABLE ROW LEVEL SECURITY;

-- Create policies for classifieds
CREATE POLICY "Classifieds are viewable by everyone" 
ON public.classifieds 
FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own classifieds" 
ON public.classifieds 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own classifieds" 
ON public.classifieds 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own classifieds" 
ON public.classifieds 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create storage bucket for classifieds
INSERT INTO storage.buckets (id, name, public) VALUES ('classifieds', 'classifieds', true);

-- Create storage policies for classifieds
CREATE POLICY "Classified images are publicly viewable" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'classifieds');

CREATE POLICY "Users can upload their own classified images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'classifieds' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own classified images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'classifieds' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own classified images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'classifieds' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_classifieds_updated_at
BEFORE UPDATE ON public.classifieds
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();