import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createRow({ label, value }, index) {
  const bgColor = index % 2 === 0 ? "#f9f9f9" : "none";
  return (
    <TableRow sx={{ backgroundColor: bgColor }}>
      <TableCell variant="head">
        <Typography>{label}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography>{value}</Typography>
      </TableCell>
    </TableRow>
  );
}

export default function ProductDetails({ product }) {
  const { brand, model, type, description } = product;
  const detailsArr = [
    { label: "Brand", value: brand },
    { label: "Model", value: model },
    { label: "Type", value: type },
  ];

  return (
    <div
      className="product-details"
      style={{
        marginLeft: "10%",
        marginRight: "10%",
        width: "80%",
      }}
    >
      <Typography variant="h5" align="center">
        Description
      </Typography>
      <Typography
        paragraph
        color="text.secondary"
        sx={{
          textAlign: "justify",
          textJustify: "inter-word",
        }}
      >
        {description}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {detailsArr.map((d, index) => {
              return createRow(d, index);
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
