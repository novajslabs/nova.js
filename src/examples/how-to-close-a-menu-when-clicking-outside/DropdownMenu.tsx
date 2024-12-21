import { useState, useRef } from 'react';
import { useOutsideClick } from '../../hooks/ts/useOutsideClick';

export const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useOutsideClick(dropdownRef, closeMenu);

  return (
    <div ref={dropdownRef}>
      <button onClick={toggleMenu}>Show menu</button>
      {isOpen && (
        <div>
          <ul>
            <li>Profile</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};
