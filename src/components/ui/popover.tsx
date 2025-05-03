import React from 'react';

// Composant de base Popover
export const Popover: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

// Composant de base PopoverTrigger
export const PopoverTrigger: React.FC<{ asChild?: boolean; children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// Composant de base PopoverContent
export const PopoverContent: React.FC<{ className?: string; align?: string; children: React.ReactNode }> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
}; 