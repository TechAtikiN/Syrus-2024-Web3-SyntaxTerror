import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";


const SearchInput = () => {
  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 " />
      <Input
        className="w-full md:w-[300px] pl-9 rounded-lg  focus-visible:ring-slate-200"
        placeholder="Search for a product"
      />
    </div>
  );
};

export default SearchInput;
