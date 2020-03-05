import React, { Component } from "react";
import Axios from "axios";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

/*const componentsByResource = {
  people: Character,
  planets: Planet
};

const ListItem = ({ name, url }) => {
 const [resource, id] = parseSwapiUrl(url);

  return (
    <ListGroup.Item>
      <Link to={`/${resource}/${id}`}>{name}</Link>
    </ListGroup.Item>
  );
}; */

export default class Users extends Component {
  state = {
    data: null
  };

  fetchData = () => {
    let url = `https://randomuser.me/api/?page=1&results=10&seed=abc&nat=fr`;
    Axios.get(url)
      .then(response => this.setState({ data: response.data }))
      .catch(error => console.error(error));
  };

  componentDidMount = () => {
    this.fetchData();
  };

  render = () => {
    const { data } = this.state;
    //if (data.results) {
    if (!data) {
      return <div> Data is null.....</div>;
    }
    return (
      <div className="yellow">
        <h2 className="text-center">Profile</h2>
        <div className="users">
          {data.results.map((item, index) => (
            <Card className="mb-3" key={index}>
              <Card.Header className="cardHeader"><b>Name</b>: {item.name.first} {item.name.last}</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>Gender: {item.gender}</ListGroup.Item>
                <ListGroup.Item>
                  Country: {item.location.city}, {item.location.country}
                </ListGroup.Item>
                <ListGroup.Item> Email: {item.email} </ListGroup.Item>
              </ListGroup>
            </Card>
          ))}
        </div>
        <Button variant="info" className="mt-2">
          More users..
        </Button>
      </div>
    );
    //}

    /* if (!data) {
      return (
        <div className="text-center">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </div>
      );
    }

    if (!id && data.results) {
      return (
        <ListGroup>
          {data.results.map((item, index) => (
            <ListItem {...item} key={index} />
          ))}
        </ListGroup>
      );
    }

    const ComponentName = componentsByResource[resource] || "div";

    return (
      <div>
        <Link to={`/${resource}`}>
          <Button variant="primary">Back to list</Button>
        </Link>
        <ComponentName {...data} />
      </div>
    );*/
  };
}
