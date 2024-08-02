interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  available: boolean;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface IProductDetails extends IProduct {  
  tags: ITagDetails[]
}