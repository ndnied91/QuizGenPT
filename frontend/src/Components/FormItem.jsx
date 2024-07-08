import React from 'react';

const FormItem = ({
  itemName,
  placeholder,
  itemValue,
  handleChangeFunc,
  itemType = 'text',
  options = [],
}) => {
  return (
    <div className="mb-4">
      <label
        className="capitalize block text-gray-700 text-sm font-bold"
        htmlFor={itemName}
      >
        {itemName}
      </label>
      {itemType === 'select' ? (
        <select
          required
          id={itemName}
          value={itemValue}
          onChange={handleChangeFunc}
          className="capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>
            {placeholder || `Select ${itemName}`}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          required
          type={itemType}
          id={itemName}
          placeholder={placeholder}
          value={itemValue}
          onChange={handleChangeFunc}
          className="capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      )}
    </div>
  );
};

export default FormItem;
