import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Pagination, Table } from "react-bootstrap";

const perPage = 10;
const Restaurants = () => {
  let location = useLocation();
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const previousPage = () => {
    if (page <= 1) {
      return;
    }
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    let borough = urlParams.get("borough");
    console.log(borough);

    let url = `https://web422-yb.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;

    if (borough !== null) {
      url = url + `&borough=${borough}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((restaurants) => {
        console.log(restaurants);
        setRestaurants(restaurants);
      });
  }, [page, location.search]);

  return (
    <>
      {restaurants !== null && restaurants.length > 0 ? (
        <div>
          <Card>
            <Card.Body>
              <Card.Title>Restaurant List</Card.Title>
              <Card.Text>
                Full of restaurants. Optionally sorted by borough
              </Card.Text>
            </Card.Body>
          </Card>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>name</th>
                <th>address building</th>
                <th>address street</th>
                <th>borough</th>
                <th>cuisine</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => {
                console.log(restaurant);
                return (
                  <tr
                    key={restaurant._id}
                    onClick={() => navigate(`/restaurant/${restaurant._id}`)}
                  >
                    <td>{restaurant.name}</td>
                    <td>{restaurant.address.building}</td>
                    <td>{restaurant.address.street}</td>
                    <td>{restaurant.borough}</td>
                    <td>{restaurant.cuisine}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev onClick={() => previousPage()} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={() => nextPage()} />
          </Pagination>
        </div>
      ) : (
        <Card>
          <Card.Body>
            <Card.Text>No Restaurants Found</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Restaurants;
