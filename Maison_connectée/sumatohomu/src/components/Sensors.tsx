import { AddCircle } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  Fragment,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Sensor, SensorGet } from "../interfaces/Sensor";
import AddSensor from "./dialogs/AddSensor";
import SensorListItem from "./utils/SensorListItem";
import requester from "../modules/requester";
import { AlertContext } from "./utils/AlertProvider";

const Sensors: FunctionComponent = () => {
  const [initialized, setInitialized] = useState(false);
  const [sensors, setSensors] = useState([] as SensorGet[] | Sensor[]);
  const [showAddSensor, setShowAddSensor] = useState(false);
  const [intervalId, setIntervalId] = useState(0 as any);
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    const getSensors = async () => {
      const response = await requester.get("sensor");
      setSensors([...response.data.data]);
    };

    const setWatchdog = async () => {
      try {
        await getSensors();
        setInitialized(true);
        if (!intervalId) {
          setIntervalId(
            setInterval(() => {
              getSensors();
            }, 5000)
          );
        }
      } catch (error) {
        showAlert("error", error as string);
      }
    };
    // spoofing, API CALL
    setWatchdog();
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId, showAlert]);

  const handleDelete = async (sensor: Sensor) => {
    // API Call : delete
    try {
      await requester.delete(`sensor/${sensor.id}`);
      setSensors([...sensors.filter((value) => value.id !== sensor.id)]);
    } catch (error) {
      showAlert("error", error as string);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          Capteurs
        </Typography>
      </Grid>
      {initialized ? (
        <Fragment>
          <Grid item xs={12} sm={8} md={6} lg={5} xl={4}>
            <Stack>
              <List>
                {sensors.map((sensor) => (
                  <SensorListItem
                    key={sensor.id}
                    onDelete={handleDelete}
                    sensor={sensor as SensorGet}
                  />
                ))}
              </List>
              <Box justifyContent={"center"} display="flex">
                <Button
                  color="primary"
                  sx={{ borderRadius: 5 }}
                  onClick={() => setShowAddSensor(true)}
                >
                  <AddCircle sx={{ marginRight: 1 }} /> Ajouter
                </Button>
              </Box>
            </Stack>
          </Grid>
          <AddSensor
            show={showAddSensor}
            onClose={() => setShowAddSensor(false)}
            onAddedSensor={(sensor) => setSensors([...sensors, sensor])}
          />
        </Fragment>
      ) : (
        <Grid item xs={12} justifyContent="center" display={"flex"}>
          <CircularProgress color="secondary" />
        </Grid>
      )}
    </Grid>
  );
};
export default Sensors;
