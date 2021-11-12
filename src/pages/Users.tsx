import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import zulipInit from "zulip-js";
import { IUser } from "../interfaces";
import { User } from "./User";

const config = {
  username: process.env.REACT_APP_EMAIL,
  apiKey: process.env.REACT_APP_KEY,
  realm: process.env.REACT_APP_REALM,
};

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
  console.log(users);
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450, textAlign: "left" }}>
        <h1 style={{ marginBottom: 10 }}>Users</h1>
        {users.map((u) => (
          <User key={u.user_id} user={u} />
        ))}
      </Grid.Column>
    </Grid>
  );
};

export default Users;
