import { useClipboard } from '../../hooks/ts/useClipboard';

const APIKeys = [
  { id: 1, name: 'API Key 1', value: '1234-5678-ABCD-EFGH' },
  { id: 2, name: 'API Key 2', value: 'IJKL-9876-MNOP-QRST' },
  { id: 3, name: 'API Key 3', value: 'UVWX-5432-YZAB-CDEF' }
];

export const CopyApiKeys = () => {
  const { copiedText, copyToClipboard } = useClipboard();

  const handleCopy = async (keyValue: string, keyName: string) => {
    try {
      await copyToClipboard(keyValue);
      alert(`Copied: ${keyName}`);
    } catch (e) {
      alert('Failed to copy:');
    }
  };

  return (
    <div>
      <ul>
        {APIKeys.map((key) => (
          <li key={key.id}>
            <div>
              <p>{key.name}</p>
              <p>{key.value}</p>
            </div>
            <button onClick={() => handleCopy(key.value, key.name)}>
              {copiedText === key.value ? 'Copied!' : 'Copy'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
