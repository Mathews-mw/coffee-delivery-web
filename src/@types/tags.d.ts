interface ITag {
  id: string;
  tag_name: string
}

interface ITagDetails extends ITag {
  product_id: string;
}