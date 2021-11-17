import { useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import { IUser } from "../interfaces";
import { UserItem } from "../components/UserItem";
import { Link } from "react-router-dom";
import { config } from "../constants/config";
import { Loading } from "../components/Loading";
import zulipInit from "zulip-js";

const Users = () => {
  const [users, setUsers] = useState<Array<IUser["members"]>>([]);
  const handleFetchUser = async () => {
    try {
      const client = await zulipInit(config);
      const allUsers = await client.users.retrieve();
      setUsers(allUsers.members.filter((u: IUser) => u.is_active));
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  if (!users.length) <Loading />;

  return (
    <Grid.Column style={{ maxWidth: 450, textAlign: "left", margin: "20px 0" }}>
      <h1>Users</h1>
      {users.map((u) => (
        <UserItem key={u.user_id} user={u} />
      ))}
      <Link to="home">
        <Button content="Home" secondary />
      </Link>
    </Grid.Column>
  );
};

export default Users;
