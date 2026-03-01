import React, { useEffect, useState } from "react";
import Header from "./header";
import Ctas from "./cta";
import Footer from "./footer";
import CardFlip from "./CardFlip";

export default function Home() {
  const [searchValue, setSearchValue] = useState(""); // 🔹 CTA dan keladigan search
  const [api, setApi] = useState([]); // 🔹 API ma’lumotlari

  useEffect(() => {
    fetch("https://json-api.uz/api/project/chizmachilik/materials")
      .then((res) => res.json())
      .then((res) => setApi(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredBooks = api.filter((book) => {
    const q = (searchValue || "").toLowerCase();
    const authors = Array.isArray(book.authors)
      ? book.authors.filter(Boolean)
      : [];
    const keywords = Array.isArray(book.keywords)
      ? book.keywords.filter(Boolean)
      : [];

    return (
      !q ||
      (book.title && book.title.toLowerCase().includes(q)) ||
      authors.some((a) => a.toLowerCase().includes(q)) ||
      keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      <Header />
      <Ctas onSearch={setSearchValue} />
      <CardFlip api={filteredBooks} />
      <Footer />
    </div>
  );
}
