import React, { Component } from "react";
import Axios from "axios";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";



export default class Users extends Component {
  state = {
    data: null,
    counter: 1,
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

  componentDidUpdate = (prevProps) => {
   // const {  id } = this.props.match.params;

    const newUsersByMinute = new Date();
    const returnedUsers = newUsersByMinute.getMinutes();
    //console.log(returnedUsers);
    let url = `https://randomuser.me/api/?page=${returnedUsers}&results=10&seed=abc&nat=fr`;
    Axios.get(url)
      .then(response => this.setState({ data: response.data }))
      .catch(error => console.error(error));
  }


  ////////////////////////////////////////////////////////////////

 /* getNextUsers = () => {
    axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=7`)
      .then(({ data }) => {
        this.setState({
          results: data.data
        })
      })
  } */


  loadMoreUsers = (event) => {
    event.preventDefault();
      this.setState({
        counter: this.state.counter + 1,
      })
      console.log(this.state.counter);
      //let pagecount = Number(this.state.counter);
    let url = `https://randomuser.me/api/?page=${this.state.counter}&results=10&nat=fr`;
    Axios.get(url)
      .then(response => this.setState({ data: response.data}))
      .catch(error => console.error(error));
  }

  loadNextUsers = (event) => {
    event.preventDefault();
      this.setState({
        counter: this.state.counter + 1,
      })
      console.log(this.state.counter);
      //let pagecount = Number(this.state.counter);
    let url = `https://randomuser.me/api/?page=${this.state.counter}&results=10&nat=fr`;
    Axios.get(url)
      .then(response => this.setState({ data: response.data}))
      .catch(error => console.error(error));
      console.log(url);
  }

  render = () => {
    const { data } = this.state;
    //if (data.results) {
    if (!data) {
      return <div> Data is null.....</div>;
    }
    return (
      <div className="yellow">
        <h2 className="text-center">Présentation</h2>
        <div className="users">
          {data.results.map((item, index) => (
            <Card className="mb-3" key={index}>
              <Card.Header className="cardHeader"><b>Name</b>: {item.name.first} {item.name.last}</Card.Header>
              <Card.Img style={{ height: '20rem' }} variant="top" src={item.picture.large} />
              <ListGroup variant="flush">
                <ListGroup.Item><i>Gender</i>: {item.gender}</ListGroup.Item>
                <ListGroup.Item>
                  <i>Country</i>: {item.location.city}, {item.location.country}
                </ListGroup.Item>
                <ListGroup.Item > <i>Email</i>: <Card.Link href="#">{item.email}</Card.Link> </ListGroup.Item>
              </ListGroup>
              <Router>
              <Link to={`/page`}>
                <Button style={{ width: '120px' }} className="mt-3 ml-2" variant="primary">Voir le profil</Button>
             </Link>
              </Router>
            </Card>
          ))}
        </div>
        <Button variant="info" className="mt-2 mr-3" type="submit" onClick={this.loadMoreUsers} >
          More users..
        </Button>
        <Button variant="info" className="mt-2 mr-3" type="submit" onClick={this.loadNextUsers} >
          page Suivant
        </Button>
        <Button variant="info" className="mt-2" type="submit" onClick={this.loadMoreUsers} >
          Page précédent
        </Button>
      </div>
    );
   
  };
}