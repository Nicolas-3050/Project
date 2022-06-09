import { Grid, Typography } from "@mui/material";
import { FunctionComponent } from "react";

const Dashboard: FunctionComponent = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          Sumatohomu - Frontend
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" align="center">
          👈 Utilisez le menu de gauche
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
