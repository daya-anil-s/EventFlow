'use client';

import React from 'react';
import Tooltip from '@/components/ui/Tooltip';
import { Info } from 'lucide-react';
import './DashboardWidget.css';

/**
 * Reusable Dashboard Widget Component
 * @param {import('../types').WidgetProps} props
 */
export default function DashboardWidget({ title, children }) {
  return (
    <div className="dashboard-widget">
      <div className="widget-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <h3 className="widget-title">{title}</h3>

  <Tooltip content={`More information about ${title}`}>
    <button
      aria-label={`More information about ${title}`}
      className="widget-action-btn"
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "4px",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Info size={16} />
    </button>
  </Tooltip>
</div>
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
}
