import React from 'react';

function ProgressTracker({ status }: { status: string }) {
  const stage = status === 'New' ? 1 : status === 'In Progress' ? 2 : status === 'Resolved' ? 3 : 4;

  return (
    <ol className="flex border pt-8 px-2 rounded-md justify-between items-center relative text-gray-500 dark:text-gray-400">
      <li className="mb-10 ms-6 flex flex-col items-center">
        {
          stage >= 1 ? (
            <span className=" flex items-center justify-center w-10 h-10 bg-green-300 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              <span className="text-green-600 dark:text-green-200">{stage}</span>
            </span>
          ) : (
            <span className=" flex items-center justify-center  w-10 h-10 bg-purple-300 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              <span className="text-purple-800 font-bold text-lg dark:text-purple-200">1</span>
            </span>
          )
        }
        <h3 className="font-bold text-lg leading-tight text-center">New</h3>
        <p className="text-sm text-center">Created a new Case</p>
      </li>

      {/* {add a horizontal line } */}
      <li className="h-1 absolute top-12 left-32 w-44 bg-gray-200 dark:bg-gray-700" />

      <li className="mb-10 ms-6 flex flex-col items-center">
        {
          stage > 2 ? (
            <span className=" flex items-center justify-center  w-10 h-10 bg-purple-300 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              <span className="text-purple-800 font-bold text-lg dark:text-purple-200">{stage}</span>
            </span>
          ) : (
            <span className=" flex items-center justify-center  w-10 h-10 bg-purple-300 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              <span className="text-purple-800 font-bold text-lg dark:text-purple-200">2</span>
            </span>
          )
        }
        <h3 className="font-bold text-lg leading-tight text-center">In Progress</h3>
        <p className="text-center text-sm">Case is in active state</p>
      </li>

      <li className="h-1 absolute top-12 right-28 w-40 bg-gray-200 dark:bg-gray-700" />

      <li className="mb-10 ms-6 flex flex-col items-center">
        {
          stage > 3 ? (
            <span className=" flex items-center justify-center  w-10 h-10 bg-purple-300 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              <span className="text-purple-800 font-bold text-lg dark:text-purple-200">{stage}</span>
            </span>
          ) : (
            <span className=" flex items-center justify-center  w-10 h-10 bg-purple-300 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              <span className="text-purple-800 font-bold text-lg dark:text-purple-200">3</span>
            </span>
          )
        }
        <h3 className="font-bold text-lg leading-tight text-center">Resolved</h3>
        <p className="text-center text-sm">Resolved the case</p>
      </li>
    </ol>
  );
}

export default ProgressTracker;
