import { FunctionComponent, useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Sensor, SensorType } from "../../interfaces/Sensor";
import { AlertContext } from "../utils/AlertProvider";
import requester from "../../modules/requester";

interface AddSensorProps {
  show: boolean;
  onClose: () => void;
  onAddedSensor?: (sensor: Sensor) => void;
}

const AddSensor: FunctionComponent<AddSensorProps> = (
  props: AddSensorProps
) => {
  const [designation, setDesignation] = useState("");
  const [type, setType] = useState(SensorType.TEMPERATURE);
  const { showAlert } = useContext(AlertContext);

  const add = async () => {
    try {
      const sensor = {
        designation,
        type,
        rawValue: type === SensorType.PROXIMITY ? false : 0,
      };
     const response = await requester.post("sensor", sensor); // call onClose and onAddedActuator
      props.onClose();
      if (props.onAddedSensor) {
        props.onAddedSensor({...sensor, id: response.data.data.id});
      }
    } catch (error) {
      showAlert("error", error as string);
    }
  };

  return (
    <Dialog open={props.show} onClose={props.onClose}>
      <DialogTitle>Ajouter un actuateur</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Veuillez remplir les champs ci-dessous pour ajouter votre actuateur
        </DialogContentText>
        <Box marginY={2}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              placeholder="ex: volet roulant"
              label="Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
            <FormControl>
              <InputLabel>Type</InputLabel>
              <Select
                fullWidth
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value as SensorType)}
              >
                <MenuItem value={SensorType.TEMPERATURE}>Température</MenuItem>
                <MenuItem value={SensorType.HUMIDITY}>Humidité</MenuItem>
                <MenuItem value={SensorType.BARO}>Baromètre</MenuItem>
                <MenuItem value={SensorType.PROXIMITY}>Proximité</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={() => add()} disabled={!designation.length}>
              Ajouter
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddSensor;
