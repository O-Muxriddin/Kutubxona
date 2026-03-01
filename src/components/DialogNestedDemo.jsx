"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function DialogNestedDemo({ data, onUpdate }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentId, setCurrentId] = useState(null);

  const [form, setForm] = useState({
    author: "",
    title: "",
    publishedAt: "",
    size: "",
    resourceType: "",
    language: "",
    keywords: "",
    summary: "",
  });

  // data kelganda form to‘ldiriladi
  useEffect(() => {
    if (data) {
      setCurrentId(data.id);
      setForm({
        author: data.author || "",
        title: data.title || "",
        publishedAt: data.publishedAt?.toString() || "",
        size: data.size?.toString() || "",
        resourceType: data.resourceType || "",
        language: data.language || "",
        keywords: data.keywords?.join(", ") || "",
        summary: data.summary || "",
      });
    }
  }, [data]);

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!currentId) return;

    // ✅ FAqat string maydonlar tekshiriladi
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const value = form[key];
      if (typeof value === "string" && value.trim() === "") {
        newErrors[key] = true;
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(
        `https://json-api.uz/api/project/chizmachilik/materials/${currentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            author: form.author,
            title: form.title,
            publishedAt: Number(form.publishedAt),
            size: Number(form.size),
            resourceType: form.resourceType,
            language: form.language,
            keywords: form.keywords.split(",").map((k) => k.trim()),
            summary: form.summary,
          }),
        },
      );

      if (!res.ok) {
        alert("Tahrirlashda xatolik!");
        return;
      }

      const updated = await res.json();
      if (onUpdate) onUpdate(updated);

      alert("Muvaffaqiyatli tahrirlandi!");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Server bilan bog‘lanishda xato!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleClick}>
          Tahrirlash
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ma’lumotni tahrirlash</DialogTitle>
          <DialogDescription>O‘zgartiring va saqlang</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 my-4">
          {[
            { label: "Muallif", name: "author" },
            { label: "Kitob nomi", name: "title" },
            { label: "Yili", name: "publishedAt", type: "number" },
            { label: "Sahifalar", name: "size", type: "number" },
            { label: "Turi", name: "resourceType" },
            { label: "Tili", name: "language" },
            { label: "Mavzular", name: "keywords" },
          ].map((f) => (
            <div key={f.name} className="flex flex-col gap-1">
              <Label>{f.label}</Label>
              <Input
                type={f.type || "text"}
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                className={cn(errors[f.name] && "border-red-500")}
              />
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <Label>Qisqacha</Label>
            <Textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              className={cn(errors.summary && "border-red-500")}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Bekor qilish
          </Button>
          <Button onClick={handleSubmit}>Saqlash</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
