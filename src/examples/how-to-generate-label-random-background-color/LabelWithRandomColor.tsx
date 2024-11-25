import { useRandomColor } from '../../hooks/ts/useRandomColor';
import { useState } from 'react';
import './styles.css';

interface Label {
  id: string;
  name: string;
  color: string;
}

const Label = ({ color, name }: { color: string; name: string }) => {
  return (
    <div style={{ backgroundColor: color }} className="label">
      {name}
    </div>
  );
};

export const LabelWithRandomColor = () => {
  const { color: labelColor, generateColor } = useRandomColor();
  const [labelName, setLabelName] = useState<string>('Label');
  const [labels, setLabels] = useState<Label[]>([]);

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
