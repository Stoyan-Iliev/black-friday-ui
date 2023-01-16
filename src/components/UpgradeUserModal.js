import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { upgradeUser } from "../api/backendRequests";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  justifyItems: "center",
};

const BorderlessTableCell = styled(TableCell)(() => ({
  borderBottom: "none",
}));

const FullWidthTextField = styled(TextField)(() => ({
  width: "100%",
}));

export default function UpgradeUserModal({ open, onClose }) {
  const token = useSelector((state) => state.user.accessToken);
  console.log(token);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState([]);

  const closeOut = () => {
    setUsername("");
    setEmail("");
    setRole("");
    onClose();
  };

  const changeUserRoles = () => {
    console.log(username);
    console.log(email);
    console.log(role);
    upgradeUser(
      {
        username: username,
        email: email,
        roles: [role],
      },
      token
    )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));

    closeOut();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={closeOut}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3 style={{ textAlign: "center" }}>Change User Account Authority</h3>

          <Table>
            <TableBody>
              <TableRow>
                <BorderlessTableCell>
                  <FullWidthTextField
                    id="username"
                    label="Username"
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </BorderlessTableCell>
                <BorderlessTableCell>
                  <FullWidthTextField
                    id="email"
                    label="Email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </BorderlessTableCell>
              </TableRow>
              <TableRow>
                <BorderlessTableCell>
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      id="role"
                      name="role"
                      value={role}
                      label="Role"
                      onChange={(event) => setRole(event.target.value)}
                    >
                      <MenuItem key="client" value="client">
                        Client
                      </MenuItem>
                      <MenuItem key="employee" value="employee">
                        Employee
                      </MenuItem>
                      <MenuItem key="admin" value="admin">
                        Admin
                      </MenuItem>
                    </Select>
                  </FormControl>
                </BorderlessTableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div style={{ display: "grid", placeItems: "center" }}>
            <Button variant="contained" onClick={changeUserRoles}>
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
