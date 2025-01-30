import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

const Calendar = React.forwardRef(({
  mode = "single",
  selected,
  onSelect,
  className,
  ...props
}, ref) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const days = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

  const isSelected = (date) => {
    if (!selected) return false;
    return selected.toDateString() === date.toDateString();
  };

  const previousMonth = (event) => {
    event.preventDefault(); // Prevent form submission
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = (event) => {
    event.preventDefault(); // Prevent form submission
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="p-3" ref={ref}>
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="sm" onClick={previousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear() + 543}
        </div>
        <Button variant="outline" size="sm" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-slate-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);
          return (
            <Button
              key={index}
              variant="outline"
              className={`h-9 w-9 p-0 font-normal ${isSelected(date) ? "bg-slate-900 text-slate-50 hover:bg-slate-900 hover:text-slate-50" : ""}`}
              onClick={(event) => {
                event.preventDefault(); // Prevent form submission
                onSelect?.(date);
              }}
            >
              {index + 1}
            </Button>
          );
        })}
      </div>
    </div>
  );
});

Calendar.displayName = "Calendar";

export { Calendar };
