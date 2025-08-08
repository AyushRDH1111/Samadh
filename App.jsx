import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Card({ children }) {
  return <div className="border rounded-2xl p-4 shadow">{children}</div>;
}

export default function App() {
  const [teachers, setTeachers] = useState([]);
  const [token, setToken] = useState("");
  const [assessment, setAssessment] = useState({ focus: "", experienceLevel: "", preferredStyle: "" });
  const [match, setMatch] = useState(null);

  useEffect(() => {
    fetch(API + "/teachers").then(r=>r.json()).then(setTeachers).catch(()=>{});
  }, []);

  const loginDemo = async () => {
    const res = await fetch(API + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "student@example.com", password: "password" })
    });
    const data = await res.json();
    if (data.token) setToken(data.token);
    else alert(data.message || "Login failed");
  };

  const runAssessment = async () => {
    const res = await fetch(API + "/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(assessment)
    });
    const t = await res.json();
    setMatch(t);
  };

  const book = async (teacherId) => {
    if (!token) return alert("Login first (use demo login).");
    const res = await fetch(API + "/bookings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
      body: JSON.stringify({ teacherId, date: "2025-08-10", time: "09:00" })
    });
    const data = await res.json();
    if (data.booking) alert("Booked!");
    else alert(data.message || "Booking failed");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Yoga Marketplace 🧘</h1>
        <button className="px-4 py-2 rounded-xl bg-black text-white" onClick={loginDemo}>Demo Login</button>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Assessment</h2>
        <div className="grid md:grid-cols-3 gap-3">
          <input className="border p-2 rounded-xl" placeholder="Focus (e.g., flexibility)"
            onChange={e=>setAssessment(s=>({...s, focus:e.target.value}))} />
          <input className="border p-2 rounded-xl" placeholder="Experience Level (beginner/intermediate/advanced)"
            onChange={e=>setAssessment(s=>({...s, experienceLevel:e.target.value}))} />
          <input className="border p-2 rounded-xl" placeholder="Preferred Style (Hatha/Vinyasa/Ashtanga/Restorative)"
            onChange={e=>setAssessment(s=>({...s, preferredStyle:e.target.value}))} />
        </div>
        <button className="px-4 py-2 rounded-xl bg-green-600 text-white" onClick={runAssessment}>Get Best Match</button>
        {match && (
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold">{match.name}</div>
                <div className="text-sm text-gray-600">{(match.specialties||[]).join(", ")}</div>
              </div>
              <button className="px-3 py-2 rounded-xl bg-blue-600 text-white" onClick={()=>book(match._id)}>Book</button>
            </div>
          </Card>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Browse Teachers</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {teachers.map(t => (
            <Card key={t._id}>
              <div className="font-bold">{t.name}</div>
              <div className="text-sm">{t.bio}</div>
              <div className="text-xs text-gray-600 mt-1">Specialties: {(t.specialties||[]).join(", ")}</div>
              <div className="mt-2 font-semibold">₹{t.pricePerSession}</div>
              <button className="mt-2 px-3 py-2 rounded-xl bg-blue-600 text-white" onClick={()=>book(t._id)}>Book</button>
            </Card>
          ))}
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 pt-6">
        MVP demo — set VITE_API_URL in .env to point to your backend.
      </footer>
    </div>
  );
}
