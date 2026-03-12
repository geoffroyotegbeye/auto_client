"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/AppIcon";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: string;
}

const stats: Stat[] = [
  {
    value: 10000,
    suffix: "+",
    label: "Véhicules vendus",
    description: "Plus de 10 000 clients satisfaits depuis notre création en 2013",
    icon: "TruckIcon",
  },
  {
    value: 7,
    suffix: "",
    label: "Marques premium",
    description: "Mercedes-Benz, KIA, Jeep, Fiat, Fuso, Kaiyi et Ashok Leyland",
    icon: "StarIcon",
  },
  {
    value: 24,
    suffix: "h/7j",
    label: "Assistance disponible",
    description: "Service après-vente et support client toujours à votre écoute",
    icon: "ClockIcon",
  },
  {
    value: 98,
    suffix: "%",
    label: "Clients satisfaits",
    description: "Qualité, proximité et confiance au cœur de notre relation client",
    icon: "HeartIcon",
  },
];

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

function StatCard({ stat, triggered }: { stat: Stat; triggered: boolean }) {
  const count = useCountUp(stat.value, 1800, triggered);
  const display = stat.value >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString();

  return (
    <div className="p-8 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-vm-dark-card rounded-2xl hover:border-vm-red transition-all group shadow-sm hover:shadow-lg">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-950/30 transition-colors">
          <Icon name={stat.icon as Parameters<typeof Icon>[0]["name"]} size={22} className="text-vm-red" />
        </div>
        <span className="badge badge-outline">{stat.label}</span>
      </div>
      <div className="stat-number">
        {stat.value >= 1000 ? display : count}
        {stat.suffix}
      </div>
      <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed mt-3">{stat.description}</p>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-32 bg-white dark:bg-vm-dark" ref={sectionRef}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left copy */}
          <div className="lg:col-span-4 space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-vm-red">
              Pourquoi nous
            </p>
            <h2 className="section-title text-gray-900 dark:text-white">
              Votre partenaire
              <br />
              <span className="italic font-light text-gray-600 dark:text-gray-400">automobile de confiance.</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              MIG Motors SA, distributeur exclusif au Bénin des plus grandes marques automobiles. Excellence, proximité et expertise depuis 2013.
            </p>
            <div className="flex flex-col gap-3 pt-4">
              {[
                "Garantie constructeur sur tous nos véhicules",
                "Financement flexible adapté à votre budget",
                "Service après-vente avec pièces d'origine",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-[13px] text-gray-600 dark:text-gray-400">
                  <Icon name="CheckCircleIcon" size={16} variant="solid" className="text-vm-red flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} triggered={triggered} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}