import { Delete, Lightbulb, RollerShades } from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from "@mui/material";
import React, { FunctionComponent } from "react";
import Actuator, { ActuatorType } from "../../interfaces/Actuator";
interface ActuatorListItemProps {
  actuator: Actuator;
  onCheckChange: (
    actuator: Actuator,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onDelete: (actuator: Actuator) => void;
}

const ActuatorListItem: FunctionComponent<ActuatorListItemProps> = (
  props: ActuatorListItemProps
) => {
  const { actuator, onDelete, onCheckChange } = props;

  return (
    <ListItem>
      <IconButton
        color="error"
        onClick={() => {
          onDelete(actuator);
        }}
      >
        <Delete />
      </IconButton>
      <ListItemIcon>
        {actuator.type === ActuatorType.BLINDS ? (
          <RollerShades sx={{ fontSize: 30 }} />
        ) : (
          <Lightbulb sx={{ fontSize: 30 }} />
        )}
      </ListItemIcon>
      <ListItemText>{actuator.designation}</ListItemText>
      <ListItemSecondaryAction>
        <Switch
          checked={actuator.state}
          onChange={(e) => {
            onCheckChange(actuator, e);
          }}
        ></Switch>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ActuatorListItem;
