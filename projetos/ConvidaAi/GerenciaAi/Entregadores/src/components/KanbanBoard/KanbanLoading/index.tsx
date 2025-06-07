import * as React from "react";

const KanbanLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full space-y-4">
      <div className="flex space-x-4">
        <div className="flex flex-col space-y-2">
          <div className="w-10 h-10 bg-gray-500 dark:bg-indigo-500 rounded-md animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-500 dark:bg-indigo-500 rounded-md animate-pulse"></div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="w-10 h-10 bg-gray-500 dark:bg-indigo-500 rounded-md animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-500 dark:bg-indigo-500 rounded-md animate-pulse"></div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="w-10 h-10 bg-gray-500 dark:bg-indigo-500 rounded-md animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-500 dark:bg-indigo-500 rounded-md animate-pulse"></div>
        </div>
      </div>

      <p className="text-gray-500 text-sm animate-bounce mt-4">
        Carregando o Kanban...
      </p>
    </div>
  );
};

export default KanbanLoading;
