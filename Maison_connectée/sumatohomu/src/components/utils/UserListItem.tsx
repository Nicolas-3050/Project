import { Delete } from "@mui/icons-material";
import {
  Card,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { FunctionComponent } from "react";
import User from "../../interfaces/User";
import requester from "../../modules/requester";

interface UserListItemProps {
  user: User;
  onDeleteUser: (id: number | string) => void;
}

const UserListItem: FunctionComponent<UserListItemProps> = ({
  user,
  onDeleteUser,
}) => {
  const handleDelete = async () => {
    try {
      await requester.delete(`user/${user.id}`);
      onDeleteUser(user.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <ListItem>
        <ListItemText
          primary={
            <div dangerouslySetInnerHTML={{ __html: user.username }}></div>
          }
          secondary={user.email}
        ></ListItemText>
        <ListItemSecondaryAction>
          <IconButton onClick={handleDelete}>
            <Delete></Delete>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Card>
  );
};

export default UserListItem;
