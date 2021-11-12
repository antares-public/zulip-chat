import { useEffect, useState } from "react";
import { Button, Grid, Loader } from "semantic-ui-react";
import zulipInit from "zulip-js";
import { IUser } from "../interfaces";
import { User } from "../components/User";
import { Link } from "react-router-dom";
import { config } from "../constants/config";

const Users = () => {
  const [users, setUsers] = useState<Array<IUser["members"]>>([]);
  const handleFetchUser = async () => {
    const client = await zulipInit(config);
    const allUsers = await client.users.retrieve();
    setUsers(allUsers.members.filter((u: IUser) => u.is_active));
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  if (!users.length) {
    return (
      <Grid.Column
        style={{ maxWidth: 450, textAlign: "left", margin: "20px 0" }}
      >
        <Loader active>Loading</Loader>
      </Grid.Column>
    );
  }

  return (
    <Grid.Column style={{ maxWidth: 450, textAlign: "left", margin: "20px 0" }}>
      <h1>Users</h1>
      {users.map((u) => (
        <User key={u.user_id} user={u} />
      ))}
      <Link to="home">
        <Button content="Home" secondary />
      </Link>
    </Grid.Column>
  );
};

export default Users;
