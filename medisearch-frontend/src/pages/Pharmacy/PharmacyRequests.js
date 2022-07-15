import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TextField,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// components
import Page from "../../components/Page";
import Label from "../../components/Label";
import Scrollbar from "../../components/Scrollbar";
import Iconify from "../../components/Iconify";
import SearchNotFound from "../../components/SearchNotFound";
import { UserListHead, UserMoreMenu } from "../../sections/@dashboard/user";
// mock
import USERLIST from "../../_mock/user";
import RequestListToolbar from "../Requests/RequestListToolbar";
import axios from "axios";
import { useEffect } from "react";
import RequestListHead from "../Requests/RequestListHead";
import AvailablePharmacies from "../Requests/AvailablePharmacies";
import IconButton from "@mui/material/IconButton";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "medicineName", label: "Medicine Name", align: "center" },
  { id: "quantity", label: "Quantity", align: "center" },
  {
    id: "availability",
    label: "Availability",
    align: "center",
  },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  console.log("applySortFilter array => ", array);
  const stabilizedThis = array.map((el, index) => [el, index]);
  console.log("applySortFilter stabilizedThis => ", stabilizedThis);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (request) =>
        request.medicineName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const URL = "http://localhost:6060/requests";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

export default function PharmacyRequests() {
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    fetchHandler().then((res) => {
      console.log(res.requests);
      setRequestData(res.requests);
      console.log("data => ", requestData);
    });
  }, []);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("medicineName");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    requestData,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Requests">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Requests
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/createRequest"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create new request
          </Button>
        </Stack>

        <Card>
          <RequestListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, paddingX: 3 }}>
              <Table>
                <RequestListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={requestData.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        medicineName,
                        quantity,
                        requestorData,
                        availablePharmacies,
                        avatarUrl,
                        isVerified,
                      } = row;
                      const isItemSelected =
                        selected.indexOf(medicineName) !== -1;
                      console.log(medicineName, " ====== ", requestorData);
                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          {/* <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) =>
                                handleClick(event, medicineName)
                              }
                            />
                          </TableCell> */}
                          <TableCell component="th" scope="row">
                            <Stack
                              direction="row"
                              alignItems="center"
                              //   spacing={2}
                            >
                              {/* <Avatar alt={medicineName} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {medicineName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">{quantity}</TableCell>
                          <TableCell align="center">
                            <TextField
                              id="amount"
                              label="Amount"
                              variant="outlined"
                              size="small"
                              type="number"
                              sx={{ width: 100 }}
                            />
                            <IconButton color="success">
                              <Iconify icon="charm:tick" />
                            </IconButton>
                            <IconButton color="error">
                              <Iconify icon="charm:cross" />
                            </IconButton>
                          </TableCell>
                          {/* <TableCell align="left">{availablePharmacies}</TableCell> */}
                          {/* <TableCell align="left">
                            {isVerified ? "Yes" : "No"}
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (status === "banned" && "error") || "success"
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell> */}

                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={requestData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
