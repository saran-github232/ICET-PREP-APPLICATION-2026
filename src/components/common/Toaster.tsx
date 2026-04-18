import React from 'react';

export const Toaster: React.FC = () => {
  return (
    <div id="toaster-portal" className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {/* Simple portal for toasts if needed later */}
    </div>
  );
};
