import { FunctionComponent, useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import Actuator, { ActuatorType } from "../../interfaces/Actuator";
import { Box } from "@mui/system";
import request from "../../modules/requester";
import { AxiosError } from "axios";
import { AlertContext } from "../utils/AlertProvider";
interface AddActuatorProps {
  show: boolean;
  onClose: () => void;
  onAddedActuator?: (actuator: Actuator) => void;
}

const AddActuator: FunctionComponent<AddActuatorProps> = (
  props: AddActuatorProps
) => {
  const [designation, setDesignation] = useState("");
  const [type, setType] = useState(ActuatorType.BLINDS);
  const [state, setState] = useState(false);
  const { showAlert } = useContext(AlertContext);

  const add = async () => {
    try {
      const actuator = {
        designation,
        type,
        state,
      };
      const response = await request.post("actuator", actuator);
      // call onClose and onAddedActuator
      props.onClose();
      if (props.onAddedActuator) {
        props.onAddedActuator({ ...actuator, id: response.data.data.id });
      }
    } catch (error) {
      showAlert("error", (error as AxiosError).response?.data);
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
                onChange={(e) => setType(e.target.value as ActuatorType)}
              >
                <MenuItem value={ActuatorType.BLINDS}>Volet</MenuItem>
                <MenuItem value={ActuatorType.LIGHT}>Lumière</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  value={state}
                  onChange={(e) => setState(e.target.checked)}
                />
              }
              label="État actuel"
            />
            <Button onClick={() => add()} disabled={!designation.length}>
              Ajouter
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddActuator;
