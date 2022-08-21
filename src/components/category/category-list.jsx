import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

const CategoryList = (props) => {
  const { categoryList, selectedCategory } = props;

  return (
    <div className="flex gap-3 overflow-auto">
      {categoryList.map((category) => {
        return (
          <Link key={category.id} to={`/products/category/${category.id}`}>
            <button
              className={cn(
                "whitespace-nowrap px-5 py-1 rounded-md",
                {
                  "bg-primary text-white":
                    category.id == Number(selectedCategory),
                },
                {
                  "text-gray-800 bg-gray-200 dark:text-white dark:bg-[#222222]":
                    category.id !== Number(selectedCategory),
                }
              )}
            >
              {category.name}
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryList;
