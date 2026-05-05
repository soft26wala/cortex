import React from "react";
import Image from "next/image";
import Link from "next/link";
import { conferences, intermissions } from "../../../app/api/data";

const Schedules = () => {
  return (
    <>
      <div className="space-y-6 mt-10">

  {[
    {
      title: "Step 1: Run Meta Ads 📈",
      desc: "We generate leads from Facebook & Instagram",
    },
    {
      title: "Step 2: WhatsApp AI Bot 🤖",
      desc: "Auto reply & convert customers instantly",
    },
    {
      title: "Step 3: Website / Funnel 💻",
      desc: "Show services & build trust",
    },
    {
      title: "Step 4: Order System 🛒",
      desc: "Take orders directly on WhatsApp",
    },
    {
      title: "Step 5: Growth Dashboard 📊",
      desc: "Track sales & business performance",
    },
  ].map((item, i) => (
    <div
      key={i}
      className="bg-white/5 border border-white/10 p-6 rounded-xl hover:scale-[1.02] transition"
    >
      <h3 className="text-white font-bold text-lg">{item.title}</h3>
      <p className="text-gray-400">{item.desc}</p>
    </div>
  ))}

</div>
    </>
  );
};

export default Schedules;
