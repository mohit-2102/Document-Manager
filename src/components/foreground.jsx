import React, { useRef, useState, useEffect } from "react";
import Card from "./card";
import Navbar from "./Navbar";
import Form from "./Form";

function Foreground() {
    const [data, setData] = useState(() => {
        const stored = localStorage.getItem("docsData");
        return stored ? JSON.parse(stored) : [];
    });

    const [showForm, setShowForm] = useState(false);
    const [editingCard, setEditingCard] = useState(null); // ✅ Track editing
    const [docs, setDocs] = useState([])
    //   const [searchTerm, setSearchTerm] = useState("")
    const [searchQuery, setSearchQuery] = useState("");


    const ref = useRef(null);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("docsData", JSON.stringify(data));
    }, [data]);

    const handleAddOrEdit = (newData) => {
        if (editingCard) {
            // ✅ update existing card
            setData((prev) =>
                prev.map((item) => (item.id === editingCard.id ? { ...newData, id: editingCard.id } : item))
            );
            setEditingCard(null);
        } else {
            // ✅ add new card
            setData((prev) => [...prev, newData]);
        }
    };

    const handleRemove = (id) => {
        setData((prev) => prev.filter((item) => item.id !== id));
    };

    const handleSearch = (term) => {
        setSearchQuery(term.toLowerCase())
    }

    const filteredDocs = data.filter((doc) => {
        const query = searchQuery.toLowerCase();
        return (
            doc.desc.toLowerCase().includes(query) ||
            doc.extension.toLowerCase().includes(query)
        );
    });

    return (
        <>
            <Navbar onAddClick={() => setShowForm(true)}
            onSearchChange={handleSearch} />

            <div
                ref={ref}
                className="fixed top-17 left-2 right-2 bottom-2 z-[3] flex flex-wrap gap-5 p-2 overflow-y-scroll overflow-x-hidden scrollbar"
            >
                {showForm && (
                    <Form
                        onAdd={handleAddOrEdit}
                        onClose={() => {
                            setShowForm(false);
                            setEditingCard(null);
                        }}
                        initialData={editingCard} // ✅ pass editing data
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


// import React, { useRef, useState, useEffect } from "react";
// import Card from "./card";
// import Navbar from "./Navbar";
// import Form from "./Form";

// function Foreground() {
//   const [data, setData] = useState(() => {
//     const stored = localStorage.getItem("docsData");
//     return stored ? JSON.parse(stored) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("docsData", JSON.stringify(data));
//   }, [data]);

//   const [showForm, setShowForm] = useState(false);
//   const ref = useRef(null);

//   const handleAdd = (newData) => {
//     setData((prev) => [...prev, newData]);
//   };

//   const handleRemove = (id) => {
//     setData((prev) => prev.filter((item) => item.id !== id));
//   };

//   return (
//     <>
//       <Navbar onAddClick={() => setShowForm(true)} />

//       <div
//         ref={ref}
//         className="fixed top-17 left-2 right-2 bottom-2 z-[3] flex flex-wrap gap-5 p-2 overflow-y-scroll overflow-x-hidden scrollbar"
//       >
//         {showForm && (
//           <Form onAdd={handleAdd} onClose={() => setShowForm(false)} />
//         )}
//         {data.map((item) => (
//           <Card
//             key={item.id}
//             data={item}
//             reference={ref}
//             onRemove={() => handleRemove(item.id)}
//           />
//         ))}
//       </div>
//     </>
//   );
// }

// export default Foreground;

