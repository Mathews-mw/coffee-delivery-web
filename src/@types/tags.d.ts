interface ITag {
  id: string;
  tag_name: string
}

interface ITagDetails extends ITag {
  product_id: string;
}

interface IProductTagDetails {
  tag_name: string
  tag_id: string
  product_id: string;
}