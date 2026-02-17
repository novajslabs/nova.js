import { useMeasure } from '../../../hooks/js/useMeasure.js';

const RESIZABLE_STYLE = {
    resize: 'both',
    overflow: 'auto',
    padding: '20px',
    border: '1px solid black'
};

export const Resizable = () => {
    const [ref, size] = useMeasure();

    return (
        <div ref={ref} style={RESIZABLE_STYLE}>
          <p>Resize this box!</p>
          <p>Width: {size.width}px</p>
          <p>Height: {size.height}px</p>
        </div>
      );
}