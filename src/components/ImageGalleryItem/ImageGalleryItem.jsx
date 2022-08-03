import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ data: { webformatURL, type } }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={type}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};
