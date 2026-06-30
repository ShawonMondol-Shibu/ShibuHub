"use client";
import { SectionCards } from "@/components/section-cards";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) return null;
      return res.json();
    },
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards stats={stats} />
        </div>
      </div>
    </div>
  );
}
