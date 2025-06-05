import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import { useGetCategoriesQuery } from "@/features/api/courseApi";

const Filter = ({ handleFilterChange, selectedCategories, sortByPrice }) => {
  const { data: categoryData, isLoading: isCategoryLoading } = useGetCategoriesQuery();
  const categories = categoryData?.categories || [];

  // Restore static categories list
  const staticCategories = [
    "Next JS",
    "Data Science",
    "Frontend Development",
    "Fullstack Development",
    "MERN Stack Development",
    "Backend Development",
    "Javascript",
    "Python",
    "Docker",
    "MongoDB",
    "HTML",
  ];

  // When a category is toggled, update parent state to trigger backend fetch
  const handleCategoryChange = (categoryId) => {
    let newCategories;
    if (selectedCategories.includes(categoryId)) {
      newCategories = selectedCategories.filter((id) => id !== categoryId);
    } else {
      newCategories = [...selectedCategories, categoryId];
    }
    // Always call parent handler to trigger backend fetch
    handleFilterChange(newCategories, sortByPrice);
  };

  // When sort is changed, update parent state to trigger backend fetch
  const selectByPriceHandler = (selectedValue) => {
    handleFilterChange(selectedCategories, selectedValue);
  };

  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
        <Select value={sortByPrice} onValueChange={selectByPriceHandler}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      <div className="space-y-2">
        <h2 className="font-semibold text-md">Category</h2>
        {staticCategories.map((category) => (
          <div key={category} className="flex items-center gap-2">
            <Checkbox
              id={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => handleCategoryChange(category)}
            />
            <Label htmlFor={category}>{category}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
