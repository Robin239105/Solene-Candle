import React from "react";

interface AdminCardProps {
  title: string;
  value: string | number;
  description: string;
  icon?: React.ReactNode;
}

export function AdminCard({ title, value, description, icon }: AdminCardProps) {
  return (
    <div className="bg-white border border-warm-gray/20 rounded-lg p-6 flex flex-col gap-2 shadow-sm">
      <div className="flex items-center justify-between text-sm text-warm-gray font-medium">
        <span>{title}</span>
        {icon && <div className="text-warm-gray/60">{icon}</div>}
      </div>
      <div className="text-3xl font-heading font-bold tracking-tight text-charcoal">{value}</div>
      <div className="text-xs text-warm-gray/80 mt-1">{description}</div>
    </div>
  );
}
