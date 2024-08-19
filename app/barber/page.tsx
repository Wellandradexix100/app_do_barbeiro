"use client";
import { useState, useEffect } from "react";

interface Appointment {
  id: string;
  date: string;
  user: { name: string };
  service: { name: string };
}

const BarberPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        console.error("Failed to fetch appointments");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchAppointments(); // Fetch appointments initially

    const ws = new WebSocket("ws://localhost:8080"); // Replace with your WebSocket server URL
    setWebSocket(ws);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "update") {
        fetchAppointments(); // Fetch appointments on update
      }
    };

    return () => {
      ws.close(); // Clean up on component unmount
    };
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Agendamentos</h1>
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm"
            >
              <p className="text-lg font-semibold text-gray-700">
                Data: {new Date(appointment.date).toLocaleString()}
              </p>
              <p className="text-md text-gray-600">
                Cliente: {appointment.user.name}
              </p>
              <p className="text-md text-gray-600">
                Serviço: {appointment.service.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BarberPage;
