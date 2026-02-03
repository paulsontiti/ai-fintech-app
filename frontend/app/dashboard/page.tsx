"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data);
      } catch (err) {
        router.push("/login");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-6">
        <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
          <h1 className="text-2xl font-bold text-indigo-600">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Wallet Card */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Wallet Balance
            </h2>
            <p className="text-2xl font-bold text-indigo-600">₦50,000</p>
          </div>

          {/* Example Transactions Card */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Recent Transactions
            </h2>
            <ul className="text-gray-600 space-y-1">
              <li>Sent ₦2,000 to Jane Doe</li>
              <li>Received ₦5,000 from John Doe</li>
              <li>Deposit ₦10,000</li>
            </ul>
          </div>

          {/* Example AI Insights Card */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              AI Insights
            </h2>
            <p className="text-gray-600">
              Your spending increased by 10% this week. Consider budgeting!
            </p>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
