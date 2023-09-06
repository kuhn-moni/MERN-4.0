import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

interface CalendarHeatmapModalProps {
  onClose: () => void;
}

const CalendarHeatmapModal: React.FC<CalendarHeatmapModalProps> = ({ onClose }) => {
  // Generate sample data for the heatmap
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  const endDate = new Date();
  const data = generateSampleData(startDate, endDate);

  return (
    <div className="modal">
      <div className="modal-content">
        <button
          className="close-button"
          onClick={onClose}
          style={{
            padding: "10px 20px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
        <h2>Activity Heatmap</h2>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={data}
          showWeekdayLabels={true}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-scale-${value.count}`;
          }}
        />
      </div>
    </div>
  );
};

// Helper function to generate sample data for the heatmap
function generateSampleData(startDate: Date, endDate: Date) {
  const data = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const count = Math.floor(Math.random() * 5); // Random count between 0 and 4
    data.push({ date: currentDate, count });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
}

export default CalendarHeatmapModal;
