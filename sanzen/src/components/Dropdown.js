// Dropdown.js
import React, { useState } from 'react';
import styled from 'styled-components';

// Styled component for the dropdown button
const DropdownButton = styled.div`
  margin: 20px 0;
  padding: 12px 16px;
  font-size: 1em;
  border: 1px solid #ccc; /* Softer light gray border */
  border-radius: 0; /* Remove border radius */
  background-color: #f9f9f9; /* Light gray background */
  color: #333; /* Darker text color */
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  width: 200px; /* Set a fixed width for the dropdown */
`;

// Styled component for the dropdown icon
const DropdownIcon = styled.span`
  position: absolute;
  right: 10px; /* Position it towards the right */
  top: 40%; /* Center it vertically */
  transform: translateY(-50%); /* Adjust vertical alignment */
  border: solid black; /* Arrow color */
  border-width: 0 2px 2px 0; /* Make it an arrow */
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg); /* Rotate to make it an arrow */
`;

// Styled component for options container
const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  max-height: 200px;
  overflow-y: auto;
  width: 200px; /* Match the width of the dropdown button */
`;

// Styled component for individual options
const Option = styled.div`
  padding: 10px 16px;
  color: black;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #eaeaea; /* Light gray background on hover */
  }
`;

// Dropdown component
const CustomDropdown = ({ options, selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onChange(option.value);
    setIsOpen(false); // Close the dropdown after selection
  };

  // Get the current label for the selected value
  const selectedLabel = options.find(option => option.value === selectedValue)?.label || "Select an option";

  return (
    <div style={{ position: 'relative' }}>
      <DropdownButton onClick={toggleDropdown}>
        {selectedLabel} {/* Display selected value dynamically */}
        <DropdownIcon /> {/* Dropdown icon */}
      </DropdownButton>
      
      {isOpen && (
        <OptionsContainer>
          {options.map((option, index) => (
            <Option key={index} onClick={() => handleOptionClick(option)}>
              {option.label}
            </Option>
          ))}
        </OptionsContainer>
      )}
    </div>
  );
};

export default CustomDropdown;
