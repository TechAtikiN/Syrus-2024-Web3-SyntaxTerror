import Image from "next/image";
import React from "react";

interface Case {
  title: string;
  caseId: string;
  status: string;
  date: string;
  plaintiffName: string;
}

interface CaseListingCardProps {
  caseItem: Case;
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case "Pending":
      return "text-yellow-700 bg-yellow-500/50 border-yellow-500 dark:text-yellow-200";
    case "Settled":
      return "text-green-800 bg-green-500/50 border-green-500 dark:text-green-200";

    case "Cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const CaseListingCard = ({ caseItem }: CaseListingCardProps) => {
  const statusColor = getStatusColor(caseItem.status);

  return (
    <div className="group border p-3 rounded-lg ">
      <div className="flex flex-col gap-2   ">
        <div className="relative overflow-hidden h-56 rounded-lg">
          <Image
            src="https://static.vecteezy.com/system/resources/thumbnails/011/231/538/small/abstract-geometric-background-with-isometric-digital-blocks-blockchain-concept-and-modern-technology-illustration-free-vector.jpg"
            unoptimized
            alt="Case Image"
            fill
            className="object-cover w-full   cursor-pointer transition-all duration-300 transform group-hover:scale-110"
          />
        </div>

        <h3 className="text-lg font-semibold text-primary">{caseItem.title}</h3>
        <p className="text-sm text-gray-400">
          <span className="font-semibold">Case ID</span> {caseItem.caseId}
        </p>
        <p className="text-sm text-gray-400">
          <span
            className={`inline-block px-3 text-xs font-semibold py-1  rounded-full ${statusColor}`}
          >
            {caseItem.status}
          </span>
        </p>
       
        <p className="text-sm text-gray-400">
           {caseItem.date}
        </p>
      </div>
    </div>
  );
};

export default CaseListingCard;
