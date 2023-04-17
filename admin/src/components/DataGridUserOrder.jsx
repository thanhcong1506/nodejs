import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DataGridOrder = () => {
  const [order, setOrder] = useState();
  const navigate = useNavigate();

  //Order list
  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await newRequest.get("/order");
      setOrder(data);
    };
    fetchOrder();
  }, []);

  const handleView = async (id) => {
    navigate(`/admin/order/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await newRequest.delete(`/order/${id}`);
      setOrder(order.filter((item) => item._id !== id));
      toast.success("Delete success!");
    } catch (error) {
      console.log(error);
      toast.error("You are not admin!");
    }
  };
  const columns = [
    { field: "orderId", headerName: "Order ID", width: 215 },
    { field: "userId", headerName: "User ID", width: 215 },
    {
      field: "name",
      headerName: "Name",
      width: 170,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 110,
      editable: true,
    },

    {
      field: "total",
      headerName: "Total",
      width: 140,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      editable: true,
      renderCell: (params) => {
        return (
          <div className=" d-flex gap-2">
            <button
              className="btn btn-success"
              onClick={() => handleView(params.row.orderId)}
            >
              View
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(params.row.orderId)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const rows =
    order &&
    order.map((row) => ({
      orderId: row._id,
      userId: row.userId,
      name: row.name,
      total: row.totalBill.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      }),
      status: row.status,
      phone: row.phone,
      address: row.address,
    }));

  return (
    <div>
      <div>
        <Box sx={{ height: 600, width: "100%" }}>
          {rows && (
            <DataGrid
              className="datagrid"
              rows={rows}
              columns={columns}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              getRowId={(row) => row.orderId}
            />
          )}
        </Box>
      </div>
    </div>
  );
};

export default DataGridOrder;
