import React, { useState } from 'react';
import FormItem from './FormItem';

const Form = ({ onSubmit, category, setCategory }) => {
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <form
        className="p-4 max-w-md mx-auto flex flex-col lg:w-screen sm:w-full "
        onSubmit={onSubmit}
      >
        <FormItem
          itemName={'category'}
          itemValue={category}
          itemCategory={'category'}
          handleChangeFunc={handleCategoryChange}
        />

        {/* number of questions */}
        <FormItem
          itemName={'category'}
          itemValue={category}
          itemCategory={'category'}
          handleChangeFunc={handleCategoryChange}
        />
      </form>
    </div>
  );
};

export default Form;
