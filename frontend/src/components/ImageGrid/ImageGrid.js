import './ImageGrid.css';
import { ImageList, ImageListItem } from '@mui/material';

function ImageGrid({images}) {


  return (
    <ImageList sx={{ width: 800, height: 450 }} cols={2} rowHeight={164}>
      {images.map((item) => (
        <ImageListItem key={item.url}>
          <img
            srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default ImageGrid;