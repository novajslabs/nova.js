import { useRandomColor } from '../../../hooks/js/useRandomColor';
import { useState } from 'react';

const Label = ({ color, name }) => {
  return (
    <div style={{ backgroundColor: color }} className="label">
      {name}
    </div>
  );
};

export const LabelWithRandomColor = () => {
  const { color: labelColor, generateColor } = useRandomColor();
  const [labelName, setLabelName] = useState('Label');
  const [labels, setLabels] = useState([]);

  const addLabel = () => {
    const nameExists = labels.some((tag) => tag.name === labelName);

    if (nameExists) {
      alert('Label name already exists');
      return;
    }

    const newTag = {
      id: labelName + labelColor,
      name: labelName,
      color: labelColor
    };
    setLabels((prev) => [...prev, newTag]);
    setLabelName('Label');
  };

  return (
    <>
      <Label color={labelColor} name={labelName} />
      <div className="container">
        <input
          type="text"
          onChange={(e) => setLabelName(e.target.value)}
          value={labelName}
        />
        <button onClick={generateColor}>Generate color</button>
        <button onClick={addLabel}>Add label</button>
      </div>
      <div className="container">
        {labels.map((tag) => {
          return <Label color={tag.color} name={tag.name} key={tag.id} />;
        })}
      </div>
    </>
  );
};
