import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const { data, loading, error } = useFetch("/transactions");
  const rows = data;
  const columns = [
    { field: "_id", headerName: "ID", width: 230 },
    {
      field: "user",
      headerName: " User",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 80,
      valueGetter: (params) => `${params.row.info.fullName} `,
      width: 130,
    },
    { field: "hotel", headerName: " Hotel", width: 240 },
    { field: "rooms", headerName: " Room", width: 100 },
    {
      field: "date",
      headerName: " Date",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      valueGetter: (params) =>
        `${params.row.dateStart
          .replace(/T.*/, "")
          .split("-")
          .reverse()
          .join("/")}
          - 
          ${params.row.dateEnd
            .replace(/T.*/, "")
            .split("-")
            .reverse()
            .join("/")} `,
    },
    { field: "price", headerName: " Price", width: 70 },
    { field: "payment", headerName: " Payment Method", width: 130 },
    {
      field: "status",
      headerName: " Status",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <span
              style={
                params.row.status === "Booked"
                  ? {
                      backgroundColor: "#F69685",
                      padding: "4px 2px",
                      borderRadius: "5px",
                    }
                  : {}
              }
            >
              {params.row.status}
            </span>
          </>
        );
      },
    },
  ];
  return (
    // <TableContainer component={Paper} className="table">
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell className="tableCell">ID</TableCell>
    //         <TableCell className="tableCell">User</TableCell>
    //         <TableCell className="tableCell">Hotel</TableCell>
    //         <TableCell className="tableCell">Room</TableCell>
    //         <TableCell className="tableCell">Date</TableCell>
    //         <TableCell className="tableCell">Price</TableCell>
    //         <TableCell className="tableCell">Payment Method</TableCell>
    //         <TableCell className="tableCell">Status</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map((row) => (
    //         <TableRow key={row._id}>
    //           <TableCell className="tableCell">{row._id}</TableCell>
    //           <TableCell className="tableCell">{row.info.fullName}</TableCell>
    //           <TableCell className="tableCell">{row.hotel}</TableCell>
    //           <TableCell className="tableCell">
    //             {row.rooms.join(", ")}
    //           </TableCell>
    //           <TableCell className="tableCell">
    //             {row.dateStart
    //               .replace(/T.*/, "")
    //               .split("-")
    //               .reverse()
    //               .join("/")}{" "}
    //             -{" "}
    //             {row.dateEnd.replace(/T.*/, "").split("-").reverse().join("/")}
    //           </TableCell>
    //           <TableCell className="tableCell">{row.price}</TableCell>
    //           <TableCell className="tableCell">{row.payment}</TableCell>
    //           <TableCell className="tableCell">
    //             <span className={`status ${row.status}`}>{row.status}</span>
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default List;
