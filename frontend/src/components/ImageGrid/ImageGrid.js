import './ImageGrid.css';
import { ImageList, ImageListItem } from '@mui/material';

function ImageGrid({images}) {

  return (
    <div className="ImageGrid">
      <ImageList cols={2} rowHeight={164}>
      {images?.map((item) => (
        <ImageListItem key={item.url}>
          <img
            src={process.env.PUBLIC_URL + item.url}
            alt={item.title}
            loading="lazy"
          />
          {/* <div>{item.title}</div> */}
        </ImageListItem>
      ))}
      <div className="ImageGrid-plusBtn">{images===[]?"Add photos":"+"}</div>
      </ImageList >
    </div>
    
  )
}

export default ImageGrid;