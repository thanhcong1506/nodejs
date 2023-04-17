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
import { useParams } from "react-router-dom";

const DetailOrder = () => {
  const { id } = useParams();

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
  const [detailOrder, setDetailOrder] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const fetchDetailOrder = async () => {
    try {
      const { data } = await newRequest.get(`/order/history/${id}`);
      setUserInfo(data);
      setDetailOrder(data.cartItems);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDetailOrder();
  }, [id]);

  return (
    <div>
      <div>
        <h3>INFORMATION ORDER</h3>

        <ul className="list-unstyled text-black-50">
          <li>{`ID User : ${userInfo.userId}`} </li>
          <li>{`Full Name : ${userInfo.name}`}</li>
          <li> {`Phone :  ${userInfo.phone}`}</li>
          <li>{`Address :   ${userInfo.address}`} </li>
          <li>
            {`Total : ${(userInfo.totalBill * 1).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}`}{" "}
          </li>
        </ul>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">ID Product</TableCell>
              <TableCell className="tableCell">Name</TableCell>
              <TableCell className="tableCell">Price</TableCell>
              <TableCell className="tableCell">Image</TableCell>
              <TableCell className="tableCell">Count</TableCell>
              <TableCell className="tableCell">Date Order</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detailOrder &&
              detailOrder.map((pr) => (
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
                      src={pr.image}
                      alt="image"
                    />
                  </StyledTableCell>

                  <StyledTableCell className="tableCell">
                    {pr.quantity}
                  </StyledTableCell>

                  <StyledTableCell className="tableCell">
                    {pr.date.replace(/T.*/, "").split("-").reverse().join("/")}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DetailOrder;
