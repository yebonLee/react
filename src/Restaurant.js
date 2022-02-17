import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Card, CardDeck } from "react-bootstrap";
import Restaurants from "./Restaurants";

const Restaurant = (props) => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  const convertDateFormat = (dateString) => {
    const dateObj = new Date(dateString);
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();

    const newDateString = `${month}/${date}/${year}`;

    return newDateString;
  };
  // console.log(id);
  useEffect(() => {
    setLoading(true);
    fetch(`https://web422-yb.herokuapp.com/api/restaurants/${id}`)
      .then((res) => res.json())
      .then((restaurant) => {
        setLoading(false);
        console.log(restaurant.data);
        if (restaurant.data.hasOwnProperty("_id")) {
          setRestaurant(restaurant.data);
        } else {
          setRestaurant(null);
        }
      });
  }, [id]);

  if (!loading) {
    if (restaurant) {
      return (
        <>
          <Card>
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Text>
                {restaurant.address.building} {restaurant.address.street}
              </Card.Text>
            </Card.Body>
          </Card>

          <MapContainer
            style={{ height: "400px" }}
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
            ></Marker>
          </MapContainer>

          <h3>Ratings</h3>
          <CardDeck>
            {restaurant.grades.map((grade) => {
              return (
                <Card>
                  <Card.Header>Grade: {grade.grade}</Card.Header>
                  <Card.Body>
                    Completed: {convertDateFormat(grade.date)}
                  </Card.Body>
                </Card>
              );
            })}
          </CardDeck>
        </>
      );
    } else {
      return (
        <>
          <Card>
            <Card.Body>
              <Card.Text>Unable to find Restaurant with id :{id}</Card.Text>
            </Card.Body>
          </Card>
        </>
      );
    }
  } else {
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Text>Loading...</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
};

export default Restaurant;
