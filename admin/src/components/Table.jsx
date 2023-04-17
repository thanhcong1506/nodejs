import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import newRequest from "../utils/newRequest";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const List = ({ data }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    const result = window.confirm("Want to delete?");
    if (result) {
      try {
        const res = await newRequest.delete(`/product/${id}`);

        toast.success("Delete success");
        setList(list.filter((item) => item._id !== id));
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    }
  };

  const handleUpdate = (product) => {
    navigate(`product/${product._id}`, { state: { product } });
  };

  return (
    <TableContainer component={Paper} className="shadow">
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Image</TableCell>
            <TableCell className="tableCell">Category</TableCell>
            <TableCell className="tableCell">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list &&
            list.map((pr) => (
              <StyledTableRow key={pr._id}>
                <StyledTableCell className="tableCell">
                  {pr._id}
                </StyledTableCell>
                <StyledTableCell className="tableCell">
                  {pr.name}
                </StyledTableCell>
                <StyledTableCell className="tableCell">
                  {pr.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </StyledTableCell>
                <StyledTableCell className="tableCell">
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                    className=" img-fluid "
                    src={pr.images[0]}
                    alt="image"
                  />
                </StyledTableCell>

                <StyledTableCell className="tableCell">
                  {pr.category}
                </StyledTableCell>
                <StyledTableCell className="tableCell">
                  <button
                    className=" btn btn-success me-2"
                    onClick={() => handleUpdate(pr)}
                  >
                    Update
                  </button>
                  <button
                    className=" btn btn-danger"
                    onClick={() => handleDelete(pr._id)}
                  >
                    Delete
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
