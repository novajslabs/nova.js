import React, { useState } from "react";
import { useDebounce } from "./hooks/useDebounce"; // Asegúrate de que el path sea correcto

// Simula una lista de elementos que queremos buscar
const fruits = [
  "Apple",
  "Banana",
  "Mango",
  "Grapes",
  "Papaya",
  "Coconut",
  "Guava",
  "Orange",
  "Pineapple",
  "Watermelon",
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms de delay

  // Filtramos la lista basada en el término de búsqueda debounceado
  const filteredItems = fruits.filter((fruit) =>
    fruit.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
