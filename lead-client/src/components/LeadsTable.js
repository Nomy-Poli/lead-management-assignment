import React from "react";

function LeadsTable({ leads, onArchive }) {
  return (
    <div className="mt-5">
      <h3 className="mb-3 text-primary fw-bold">Leads List</h3>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th style={{ width: "140px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="fw-semibold">{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm w-100"
                      onClick={() => onArchive(lead.id)}
                    >
                      Archive
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted py-4">
                  No leads to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeadsTable;