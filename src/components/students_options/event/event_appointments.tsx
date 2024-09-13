import AppBar from "../appbar";
import React, { useState } from "react";
import { formatDate, getCurrentDate, addDaysToDate } from "../../../utils/date";

const currentDate = getCurrentDate("YYYY/MM/DD");

const eventDatePlus6Days = formatDate(
  addDaysToDate(new Date(), 6),
  "YYYY/MM/DD"
);

const eventsSchedule = [
  {
    eventName: "Graduation",
    eventDate: currentDate,
    participantsNum: 23,
  },
  {
    eventName: "Graduation",
    eventDate: currentDate,
    participantsNum: 23,
  },
  {
    eventName: "Graduation",
    eventDate: currentDate,
    participantsNum: 23,
  },
  {
    eventName: "Graduation",
    eventDate: currentDate,
    participantsNum: 23,
  },
  {
    eventName: "Graduation",
    eventDate: eventDatePlus6Days,
    participantsNum: 23,
  },
];

const EventAppointments = () => {
  const [eventScheduleDate, isEventScheduleDate] = useState<Date | null>(null);

  return (
    <div className="mx-14 flex flex-col-reverse">
      {eventsSchedule.map((items, index) => (
        <div
          key={index}
          className={`flex justify-between w-2/3 h-52 rounded-roundedButt my-5
    ${
      items.eventDate === eventDatePlus6Days
        ? "bg-gradient-to-r duration-500 from-primary to-red-500"
        : "bg-gray-700 opacity-60"
    }
    ${
      items.eventDate === currentDate
        ? "flex ring-4 ring-blue-500 opacity-100"
        : ""
    }`}
        >
          <div className="flex flex-col justify-between p-5 text-white">
            <div>
              <p className="text-3xl">{items.eventName}</p>
              <p className="text-xl">{items.eventDate}</p>
            </div>
            <p className="text-2xl">
              Number of participants: {items.participantsNum}
            </p>
          </div>
          <div className="flex flex-col justify-between items-end p-5">
            <p className="flex justify-center items-center text-2xl bg-primary w-10 h-10 rounded-full text-white">
              {index + 1}
            </p>
            <button
              className={`group bg-background rounded-lg p-4 hover:bg-primary hover:scale-95 shadowing duration-200 text-white text-2xl px-7 py-2 ${
                items.eventDate === eventDatePlus6Days ? "flex" : "hidden"
              }`}
            >
              Registration
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventAppointments;
