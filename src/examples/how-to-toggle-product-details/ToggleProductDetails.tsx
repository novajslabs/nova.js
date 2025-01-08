import { useToggle } from '../../hooks/ts/useToggle';

export const ToggleProductDetails = () => {
  const { current: showDetails, handleToggle: toggleDetails } =
    useToggle(false);

  return (
    <>
      <h1>SmartWatch Pro X</h1>
      <p>
        The SmartWatch Pro X is the ultimate smartwatch for those looking to
        combine style, technology, and performance in one device. With a
        high-resolution AMOLED display, you'll enjoy vibrant colors and sharp
        details, even under direct sunlight.
      </p>
      {showDetails && (
        <p>
          Designed for everyday use, the Pro X offers advanced health tracking,
          continuous heart rate monitoring, and the option to measure blood
          oxygen levels, making it the perfect companion for any physical
          activity. Plus, its GPS feature lets you track your routes without
          needing to carry your phone.
        </p>
      )}
      <button onClick={toggleDetails}>
        {showDetails ? 'Show less' : 'Show more'}
      </button>
    </>
  );
};
