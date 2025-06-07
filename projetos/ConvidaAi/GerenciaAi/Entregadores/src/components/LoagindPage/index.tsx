import React from "react";

interface LoadingPageProps {
  msg?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ msg }) => {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {msg && (
          <div className="text-center text-gray-700 dark:text-gray-300 text-lg font-medium">
            {msg}
          </div>
        )}

        <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>

        <div className="h-56 w-full bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>

        <div className="space-y-4">
          <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>

          <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex space-x-4">
              <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default LoadingPage;
