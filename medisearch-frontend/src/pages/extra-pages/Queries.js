// material-ui
import { Typography, Input } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

// project import
import MainCard from "components/MainCard";
import OrderTable from "pages/dashboard/OrdersTable";

import { FileAddOutlined, SearchOutlined } from "@ant-design/icons";
import { Grid } from "../../../node_modules/@mui/material/index";

// ==============================|| SAMPLE PAGE ||============================== //

const Queries = () => (
  <Grid container rowSpacing={4.5} columnSpacing={2.75}>
    {/* row 1 */}
    <Grid item xs={10} sx={{ mb: -2.25 }}>
      <Typography variant="h5">Dashboard</Typography>
    </Grid>
    <Grid item xs={2}>
      <Button variant="contained" startIcon={<FileAddOutlined />}>
        Create Request
      </Button>
    </Grid>
    <Grid item lg={12}>
      <MainCard>
        {/* <div className="col" sx={{ flexGrow: 1 }}>
          <Input
            id="standard-basic"
            label="Search"
            onChange={this.handleSearch}
            placeholder="Search..."
            startAdornment={
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            }
          />
        </div> */}
        <OrderTable />
      </MainCard>
    </Grid>
  </Grid>
  // <MainCard >
  //     <Button variant="outlined" startIcon={<FileAddOutlined />}>Create Request</Button>
  //     {/* <Typography variant="body2">
  //         Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
  //         ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
  //         reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
  //         qui officiate descent molls anim id est labours.
  //     </Typography> */}
  //     <OrderTable />
  // </MainCard>
);

export default Queries;
