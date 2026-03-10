// import React, { useEffect, useState } from "react";
// import LeadsTable from "./components/LeadsTable";

// function App() {
//   const [leads, setLeads] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: ""
//   });
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((data) => {
//         const mappedLeads = data.map((user) => ({
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           phone: user.phone
//         }));

//         setLeads(mappedLeads);
//       })
//       .catch((error) => {
//         console.error("Error fetching leads:", error);
//       });
//   }, []);

//   const handleArchive = (id) => {
//     const updatedLeads = leads.filter((lead) => lead.id !== id);
//     setLeads(updatedLeads);
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const validate = () => {
//     let newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Invalid email";
//     }

//     const phoneRegex = /^\d+$/;
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone is required";
//     } else if (!phoneRegex.test(formData.phone)) {
//       newErrors.phone = "Phone must contain digits only";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setMessage("");

//     if (!validate()) return;

//     const webhookPayload = {
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       source: "manual",
//       createdAt: new Date().toISOString()
//     };

//     console.log("Webhook payload:");
//     console.log(JSON.stringify(webhookPayload, null, 2));

//     try {
//       const response = await fetch("https://localhost:7285/api/Leads", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log("Server response:", data);

//         const newLead = {
//           id: Date.now(),
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone
//         };

//         setLeads((prevLeads) => [...prevLeads, newLead]);

//         setMessage("Lead saved successfully");
//         setMessageType("success");

//         setFormData({
//           name: "",
//           email: "",
//           phone: ""
//         });

//         setErrors({});
//         setShowForm(false);
//       } else {
//         setMessage("Server validation failed");
//         setMessageType("danger");
//         console.log("Server validation failed:", data);
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       setMessage("Server error");
//       setMessageType("danger");
//     }
//   };
//   const filteredLeads = leads.filter((lead) =>
//   lead.name.toLowerCase().includes(search.toLowerCase())
// );
//   return (
//     <div
//       className="min-vh-100 py-5"
//       style={{
//         background: "linear-gradient(135deg, #eef2ff, #f8fbff)"
//       }}
//     >
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-lg-10">
//             <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
//               <div
//                 className="text-white p-4"
//                 style={{
//                   background: "linear-gradient(90deg, #0d6efd, #6610f2)"
//                 }}
//               >
//                 <h1 className="h3 mb-1 fw-bold">Lead Management Dashboard</h1>
//                 <p className="mb-0 opacity-75">
//                   Fetch leads, add manual lead, and manage archive actions
//                 </p>
//               </div>
//               <div className="mt-3 mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search by name..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>
//               <div className="card-body p-4 p-md-5">
//                 <div className="row">
//                   <div className="col-md-12">
//                     <div className="mb-4">
//                       <button
//                         className="btn btn-success"
//                         onClick={() => setShowForm(!showForm)}
//                       >
//                         {showForm ? "Close Form" : "Add Manual Lead"}
//                       </button>
//                     </div>

//                     {/* <h2 className="h4 mb-4 fw-bold text-dark">Add New Lead</h2> */}

//                     {message && (
//                       <div className={`alert alert-${messageType}`} role="alert">
//                         {message}
//                       </div>
//                     )}
//                     {showForm && (
//                       <form onSubmit={handleSubmit}>
//                         <div className="row g-3">
//                           <div className="col-md-4">
//                             <label className="form-label fw-semibold">Name</label>
//                             <input
//                               type="text"
//                               name="name"
//                               value={formData.name}
//                               onChange={handleChange}
//                               className={`form-control ${errors.name ? "is-invalid" : ""}`}
//                               placeholder="Enter full name"
//                             />
//                             {errors.name && (
//                               <div className="invalid-feedback">{errors.name}</div>
//                             )}
//                           </div>

//                           <div className="col-md-4">
//                             <label className="form-label fw-semibold">Email</label>
//                             <input
//                               type="text"
//                               name="email"
//                               value={formData.email}
//                               onChange={handleChange}
//                               className={`form-control ${errors.email ? "is-invalid" : ""}`}
//                               placeholder="Enter email"
//                             />
//                             {errors.email && (
//                               <div className="invalid-feedback">{errors.email}</div>
//                             )}
//                           </div>

//                           <div className="col-md-4">
//                             <label className="form-label fw-semibold">Phone</label>
//                             <input
//                               type="text"
//                               name="phone"
//                               value={formData.phone}
//                               onChange={handleChange}
//                               className={`form-control ${errors.phone ? "is-invalid" : ""}`}
//                               placeholder="Enter phone number"
//                             />
//                             {errors.phone && (
//                               <div className="invalid-feedback">{errors.phone}</div>
//                             )}
//                           </div>
//                         </div>

//                         <div className="mt-4 d-flex gap-2">
//                           <button type="submit" className="btn btn-primary px-4">
//                             Save Lead
//                           </button>

//                           <button
//                             type="button"
//                             className="btn btn-outline-secondary"
//                             onClick={() => {
//                               setFormData({
//                                 name: "",
//                                 email: "",
//                                 phone: ""
//                               });
//                               setErrors({});
//                               setMessage("");
//                             }}
//                           >
//                             Clear
//                           </button>
//                         </div>
//                       </form>
//                     )}

//                     <LeadsTable leads={filteredLeads} onArchive={handleArchive} />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="text-center mt-3 text-muted small">
//               Built with React + Bootstrap + .NET API
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import LeadsTable from "./components/LeadsTable";

function App() {
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const mappedLeads = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }));

        setLeads(mappedLeads);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  }, []);

  const handleArchive = (id) => {
    const updatedLeads = leads.filter((lead) => lead.id !== id);
    setLeads(updatedLeads);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    const phoneRegex = /^\d+$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone must contain digits only";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!validate()) return;

    const webhookPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      source: "manual",
      createdAt: new Date().toISOString()
    };

    console.log("Webhook payload:");
    console.log(JSON.stringify(webhookPayload, null, 2));

    try {
      const response = await fetch("https://localhost:7285/api/Leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Server response:", data);

        const newLead = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        };

        setLeads((prevLeads) => [...prevLeads, newLead]);

        setMessage("Lead saved successfully");
        setMessageType("success");

        setFormData({
          name: "",
          email: "",
          phone: ""
        });

        setErrors({});
        setShowForm(false);
      } else {
        setMessage("Server validation failed");
        setMessageType("danger");
        console.log("Server validation failed:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("Server error");
      setMessageType("danger");
    }
  };

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #eef2ff, #f8fbff)"
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div
                className="text-white p-4"
                style={{
                  background: "linear-gradient(90deg, #0d6efd, #6610f2)"
                }}
              >
                <h1 className="h3 mb-1 fw-bold">Lead Management Dashboard</h1>
                <p className="mb-0 opacity-75">
                  Fetch leads, add manual lead, and manage archive actions
                </p>
              </div>

              <div className="card-body p-4 p-md-5">
                <div className="mb-4 d-flex justify-content-between align-items-center gap-3">
                  <input
                    type="text"
                    className="form-control"
                    style={{ maxWidth: "350px" }}
                    placeholder="Search lead..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <button
                    className="btn btn-success"
                    onClick={() => setShowForm(!showForm)}
                  >
                    {showForm ? "Close Form" : "Add Manual Lead"}
                  </button>
                </div>

                {message && (
                  <div className={`alert alert-${messageType}`} role="alert">
                    {message}
                  </div>
                )}

                {showForm && (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label fw-semibold">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`form-control ${errors.name ? "is-invalid" : ""}`}
                          placeholder="Enter full name"
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-control ${errors.email ? "is-invalid" : ""}`}
                          placeholder="Enter email"
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                          placeholder="Enter phone number"
                        />
                        {errors.phone && (
                          <div className="invalid-feedback">{errors.phone}</div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 d-flex gap-2">
                      <button type="submit" className="btn btn-primary px-4">
                        Save Lead
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setFormData({
                            name: "",
                            email: "",
                            phone: ""
                          });
                          setErrors({});
                          setMessage("");
                        }}
                      >
                        Clear
                      </button>
                    </div>
                  </form>
                )}

                <LeadsTable leads={filteredLeads} onArchive={handleArchive} />
              </div>
            </div>

            <div className="text-center mt-3 text-muted small">
              Built with React + Bootstrap + .NET API
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;