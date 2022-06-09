import {
  AvTimer,
  Delete,
  Help,
  Sensors,
  Thermostat,
  WaterDamage,
} from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FunctionComponent } from "react";
import { SensorGet, SensorType } from "../../interfaces/Sensor";
interface SensorListItemProps {
  sensor: SensorGet;
  onDelete: (sensor: SensorGet) => void;
}

const getTypeIcon = (type: SensorType) => {
  switch (type) {
    case SensorType.TEMPERATURE:
      return <Thermostat sx={{ fontSize: 30 }} />;
    case SensorType.HUMIDITY:
      return <WaterDamage sx={{ fontSize: 30 }} />;
    case SensorType.BARO:
      return <AvTimer sx={{ fontSize: 30 }} />;
    case SensorType.PROXIMITY:
      return <Sensors sx={{ fontSize: 30 }} />;
    default:
      return <Help sx={{ fontSize: 30 }} />;
  }
};

const SensorListItem: FunctionComponent<SensorListItemProps> = (
  props: SensorListItemProps
) => {
  const { sensor, onDelete } = props;

  return (
    <ListItem>
      <IconButton
        color="error"
        onClick={() => {
          onDelete(sensor);
        }}
      >
        <Delete />
      </IconButton>
      <ListItemIcon>{getTypeIcon(sensor.type)}</ListItemIcon>
      <ListItemText
        primary={sensor.designation}
        secondary={sensor.value || sensor.rawValue}
      />
    </ListItem>
  );
};

export default SensorListItem;
