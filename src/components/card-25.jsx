import { Image } from "@unpic/react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export const Card_25 = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    fetch("https://json-api.uz/api/project/chizmachilik/materials")
      .then((res) => res.json())
      .then((res) => setState(res.data || []))
      .catch(console.error);
  }, []);

  return (
    <div
      className="
  mx-auto
  w-full
  max-w-300
  grid grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  gap-6
  mt-25
  mb-25
  justify-items-center
"
    >
      {state.map((item) => (
        <Card key={item.id} className="group relative w-65 overflow-hidden p-0">
          <div className="relative aspect-square rounded-lg bg-muted overflow-hidden">
            {item.cover ? (
              <Image
                src={item.cover}
                alt={item?.title}
                className=" object-cover
                           scale-95 group-hover:scale-100
                           transition-all duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Rasm yo‘q
              </div>
            )}
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 z-20
             bg-card/90 backdrop-blur-sm
             opacity-0 translate-y-10
             group-hover:opacity-100 group-hover:translate-y-0
             transition-all duration-300
             px-6 py-4 rounded-xl
             flex flex-col gap-4"
          >
            <CardHeader>
              <CardTitle>{item.authors?.join(", ")}</CardTitle>
              <CardDescription>{item.title}</CardDescription>
            </CardHeader>

            <CardFooter>
              <Button className="w-full">Batafsil</Button>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
};
