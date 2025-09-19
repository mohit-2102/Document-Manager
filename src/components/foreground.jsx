// Foreground.jsx - Grid Layout Solution
import React, { useState, useEffect, useRef } from "react";
import Card from "./card";
import Navbar from "./Navbar";
import Form from "./Form";
import { db } from "../config/db";
import { starFilter } from "../utils/fileUtils";

function Foreground() {
  const [docs, setDocs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef(null);

  // Load docs from Dexie
  useEffect(() => {
    const fetchDocs = async () => {
      const allDocs = await db.docs.toArray();
      setDocs(allDocs);
    };
    fetchDocs();
  }, []);

  const handleRemove = async (id) => {
    if (confirm("Are you sure you want to delete this document?")) {
      await db.docs.delete(id);
      setDocs(await db.docs.toArray()); // refresh
    }
  };

  const handleSearch = (term) => {
    setSearchQuery(term.toLowerCase());
  };

  const filteredDocs = docs.filter((doc) => {
  const query = searchQuery.toLowerCase();
  const isStarred = localStorage.getItem(`starred-card-${doc.id}`) === "true";

  // If user searches "starred", return only starred docs
  if (starFilter.includes(query)) return isStarred;

  return (
    doc.desc.toLowerCase().includes(query) ||
    doc.extension.toLowerCase().includes(query)
  );
});


  return (
    <>
      <Navbar onAddClick={() => setShowForm(true)} onSearchChange={handleSearch} />

      <div
        ref={ref}
        className="fixed top-17 left-2 right-2 bottom-2 z-[3] p-2 overflow-y-auto overflow-x-hidden scrollbar
                   grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 
                   gap-3 auto-rows-max content-start"
      >
        {showForm && (
          <Form
            onClose={() => {
              setShowForm(false);
              setEditingCard(null);
              db.docs.toArray().then(setDocs); // reload after save
            }}
            initialData={editingCard}
          />
        )}

        {filteredDocs.map((item) => (
          <Card
            key={item.id}
            data={item}
            reference={ref}
            onRemove={() => handleRemove(item.id)}
            onEdit={(card) => {
              setEditingCard(card);
              setShowForm(true);
            }}
          />
        ))}
      </div>
    </>
  );
}

export default Foreground;

