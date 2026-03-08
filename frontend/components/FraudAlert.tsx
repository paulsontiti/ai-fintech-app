import { socket } from "@/lib/socket.io";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FraudAlerts() {
  const [fraudAlerts, setFraudAlerts] = useState<any[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    if (!socket.connected) socket.connect();

    socket.emit("join-room", userId);

    socket.on("fraud-alert", (data) => {
      console.log(`⚠️ Fraud Alert: ${data} `);

      setFraudAlerts((prev) => [...prev, data]);
      // Show toast
      toast.error("⚠️ Suspicious Activity Detected!", {
        description: data.reason,
      });

      // Auto-open modal
      setSelectedAlert(data);
    });

    return () => {
      socket.off("fraud-alert");
    };
  }, []);

  return (
    <div>
      <div className="bg-red-800 text-white px-4 py-2 rounded-full shadow-md">
        🔔 Fraud Alerts: {fraudAlerts.length}
      </div>

      {selectedAlert && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-8 rounded-2xl w-[400px] border border-red-500 shadow-xl">
            <h2 className="text-xl font-bold text-red-400 mb-4">
              ⚠️ Fraud Alert
            </h2>

            <p>
              <strong>Reason:</strong> {selectedAlert.reason}
            </p>
               <button
              onClick={() => setSelectedAlert(null)}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
