import { Link } from "react-router-dom";
import { Grid, Item } from "semantic-ui-react";
import { homeConfig } from "../constants/home";

export const Home = () => {
  return (
    <Grid.Column style={{ maxWidth: 450, textAlign: "left" }}>
      <Item.Group divided>
        <h1>Home</h1>
        {homeConfig.map(({ img, name, desc }) => (
          <Item key={img}>
            <Item.Image size="tiny" src={img} />
            <Item.Content>
              <Item.Header>
                <Link to={`/${name}`}>{name}</Link>
              </Item.Header>
              <Item.Description>{desc}</Item.Description>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
      <h5>Github: <a href="https://github.com/antaresofficial/zulip-chat">https://github.com/antaresofficial/zulip-chat</a></h5>
    </Grid.Column>
  );
};
