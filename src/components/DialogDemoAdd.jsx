"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function DialogDemoAdd({ onAdd }) {
  const authorRef = useRef();
  const bookRef = useRef();
  const dateRef = useRef();
  const sizeRef = useRef();
  const typeRef = useRef();
  const languageRef = useRef();
  const topicsRef = useRef();
  const descriptionRef = useRef();
  const fileRef = useRef(); // bu endi URL input
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!authorRef.current.value.trim()) newErrors.author = true;
    if (!bookRef.current.value.trim()) newErrors.book = true;
    if (!dateRef.current.value.trim()) newErrors.date = true;
    if (!sizeRef.current.value.trim()) newErrors.size = true;
    if (!typeRef.current.value.trim()) newErrors.type = true;
    if (!languageRef.current.value.trim()) newErrors.language = true;
    if (!topicsRef.current.value.trim()) newErrors.topics = true;
    if (!descriptionRef.current.value.trim()) newErrors.description = true;

    setErrors(newErrors);

    const firstError = Object.keys(newErrors)[0];
    if (firstError) {
      switch (firstError) {
        case "author":
          authorRef.current.focus();
          break;
        case "book":
          bookRef.current.focus();
          break;
        case "date":
          dateRef.current.focus();
          break;
        case "size":
          sizeRef.current.focus();
          break;
        case "type":
          typeRef.current.focus();
          break;
        case "language":
          languageRef.current.focus();
          break;
        case "topics":
          topicsRef.current.focus();
          break;
        case "description":
          descriptionRef.current.focus();
          break;
      }
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(
        "https://json-api.uz/api/project/chizmachilik/materials",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            author: authorRef.current.value,
            title: bookRef.current.value,
            publishedAt: Number(dateRef.current.value),
            size: Number(sizeRef.current.value),
            resourceType: typeRef.current.value,
            language: languageRef.current.value,
            keywords: topicsRef.current.value.split(",").map((k) => k.trim()),
            summary: descriptionRef.current.value,
            cover: fileRef.current.value.trim(), // URL sifatida
          }),
        },
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("API Error:", text);
        alert("Ma’lumot qo‘shishda xatolik yuz berdi!");
        return;
      }

      const data = await res.json();
      if (onAdd) onAdd(data);

      alert("Ma’lumot muvaffaqiyatli qo‘shildi!");

      // Reset
      authorRef.current.value = "";
      bookRef.current.value = "";
      dateRef.current.value = "";
      sizeRef.current.value = "";
      typeRef.current.value = "";
      languageRef.current.value = "";
      topicsRef.current.value = "";
      descriptionRef.current.value = "";
      fileRef.current.value = "";
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Server bilan bog‘lanishda xatolik yuz berdi!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleClick}>
          ➕
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Yangi ma’lumot qo‘shish</DialogTitle>
          <DialogDescription>
            Bu yerda yangi element qo‘shishingiz mumkin. Tugatgach “Saqlash” ni
            bosing.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 my-4">
          <div className="flex flex-col gap-1">
            <Label>Muallif nomi</Label>
            <Input
              ref={authorRef}
              placeholder="Masalan: Xalimov. M. K"
              className={cn(errors.author && "border-red-500")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Kitob nomi</Label>
            <Input
              ref={bookRef}
              placeholder="Masalan: Qo‘shqinlar"
              className={cn(errors.book && "border-red-500")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Qachon yozilgani</Label>
            <Input
              ref={dateRef}
              type="number"
              placeholder="Masalan: 1980"
              className={cn(errors.date && "border-red-500")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Sahifalar soni</Label>
            <Input
              ref={sizeRef}
              type="number"
              placeholder="Masalan: 120"
              className={cn(errors.size && "border-red-500")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Kitob turi</Label>
            <Input
              ref={typeRef}
              placeholder="Masalan: O'quv qo'llanma"
              className={cn(errors.type && "border-red-500")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Tili</Label>
            <Input
              ref={languageRef}
              placeholder="Masalan: O'zbek"
              className={cn(errors.language && "border-red-500")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Mavzular</Label>
            <Input
              ref={topicsRef}
              placeholder="chizma, geometrik, texnik"
              className={cn(errors.topics && "border-red-500")}
            />
            <p className="text-xs text-zinc-500">
              Bir nechta mavzularni vergul bilan ajrating!
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <Label>Qisqacha</Label>
            <Textarea
              ref={descriptionRef}
              placeholder="Text"
              className={cn(errors.description && "border-red-500")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Kitob rasmi (URL)</Label>
            <Input
              ref={fileRef}
              placeholder="Masalan: https://example.com/image.jpg"
            />
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="ghost">Bekor qilish</Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit}>
            Saqlash
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
