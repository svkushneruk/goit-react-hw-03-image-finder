import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ data }) => {
  return (
    <li className={css.ImageGalleryItem} key={data.id}>
      <img
        src={data.webformatURL}
        alt={data.type}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};
