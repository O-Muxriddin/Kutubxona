"use client";

import { ArrowRight, Repeat2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import DialogNestedDemo from "./DialogNestedDemo";

export default function CardFlip() {
  const [items, setItems] = useState([]);
  const [flippedId, setFlippedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://json-api.uz/api/project/chizmachilik/materials")
      .then((res) => res.json())
      .then((res) => setItems(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <div className="w-20 h-20 border-8 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-6"></div>
        <p className="text-lg font-medium text-gray-700">
          Kitoblar yuklanmoqda...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 mb-16 pt-20">
      {items.map((item, index) => {
        const isFlipped = flippedId === item.id;

        return (
          <div
            key={`${item.id}-${index}`}
            className="group relative h-150 w-full [perspective:2000px]"
            onMouseEnter={() => setFlippedId(item.id)}
            onMouseLeave={() => setFlippedId(null)}
          >
            <div
              className={cn(
                "relative h-full w-full transition-all duration-700",
                "[transform-style:preserve-3d]",
                isFlipped
                  ? "[transform:rotateY(180deg)]"
                  : "[transform:rotateY(0deg)]",
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl overflow-hidden border",
                  "bg-black/10 dark:bg-black",
                  "[backface-visibility:hidden]",
                )}
              >
                {item.cover ? (
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Rasm yo‘q
                  </div>
                )}

                <div className="absolute inset-0 bg-black/30 p-4 flex flex-col justify-end text-white">
                  <h3 className="text-lg font-semibold line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm line-clamp-3">{item.summary}</p>

                  <div className="flex justify-between items-center pt-2 text-xs text-white/80">
                    <span>
                      {item.publishedAt} • {item.language}
                    </span>
                    <Repeat2 className="w-4 h-4 text-orange-400" />
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "absolute inset-0 rounded-2xl p-5 border",
                  "bg-zinc-100 dark:bg-black",
                  "[backface-visibility:hidden] [transform:rotateY(180deg)]",
                  "flex flex-col justify-between",
                )}
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-600 mb-4 line-clamp-2">
                    {item.resourceType}
                  </p>

                  <div className="space-y-2">
                    {Array.isArray(item.keywords) &&
                      item.keywords.slice(0, 5).map((key) => (
                        <div
                          key={key}
                          className="flex items-center gap-2 text-sm"
                        >
                          <ArrowRight className="w-3 h-3 text-orange-500" />
                          {key}
                        </div>
                      ))}
                    <h6 className="text-lg font-semibold mb-2 line-clamp-2">
                      {item.size} sahifa
                    </h6>
                  </div>
                </div>

                <div className="mt-4">
                  <DialogNestedDemo
                    data={item} 
                    onUpdate={(updatedItem) => {
                      setItems((prev) =>
                        prev.map((el) =>
                          el.id === updatedItem.id ? updatedItem : el,
                        ),
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
