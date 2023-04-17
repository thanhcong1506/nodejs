import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import newRequest from "../utils/newRequest";
import useFetch from "../hooks/useFetch";

const DataGridUser = () => {
  const { data } = useFetch("http://localhost:5000/api/user");
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await newRequest.get("/user");
      setUser(data);
    };
    fetchUser();
  }, []);

  const handleDelete = async (id) => {
    const result = window.confirm("Want to delete?");
    if (result) {
      try {
        await newRequest.delete(`/user/${id}`);
        setUser(user.filter((item) => item._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "name",
      headerName: "Name",
      width: 220,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",

      width: 150,
      editable: true,
    },
    {
      field: "createAt",
      headerName: "Create At",

      width: 100,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const rows =
    user &&
    user.map((row) => ({
      id: row._id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      createAt: row.createdAt.replace(/T.*/, "").split("-").reverse().join("/"),
    }));

  return (
    <div>
      <Box sx={{ height: 500, width: "100%" }}>
        {rows && (
          <DataGrid
            className="datagrid"
            rows={rows}
            columns={columns}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowId={(row) => row.id}
          />
        )}
      </Box>
    </div>
  );
};

export default DataGridUser;
