import { Grid, Stack, Typography } from "@mui/material";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import User from "../interfaces/User";
import { AlertContext } from "./utils/AlertProvider";
import requester from "../modules/requester";
import UserListItem from "./utils/UserListItem";
import { AxiosError } from "axios";

const Users: FunctionComponent = () => {
  const [users, setUsers] = useState([] as User[]);
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await requester.get("user");
        setUsers(response.data.data);
      } catch (error: unknown) {
        const err = error as AxiosError;
        if (err.response && err.response.data) {
          showAlert("warning", err.response.data as string);
        } else {
          showAlert("warning", error as string);
        }
      }
    };
    getUsers();
  }, [showAlert]);

  const deleteUser = (id: number | string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          Utilisateurs
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" align="center">
          Il y a actuellement {users.length} utilisateur
          {users.length > 1 && "s"} :
        </Typography>
      </Grid>
      <Grid item xs={12} md={10} lg={8} xl={6}>
        <Stack spacing={2}>
          {users.map((user) => (
            <UserListItem key={user.id} user={user} onDeleteUser={deleteUser} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};
export default Users;
