import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const News = () => {
  const [da, setDa] = useState("");
  const [da1, setDa1] = useState("");
  const [da2, setDa2] = useState("");
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  const preventDefault = (event) => event.preventDefault();

  useEffect(() => {
    axios.get("http://localhost:5000/url").then((response) => {
      setDa(response.data.title);
      setDa1(response.data.title1);
      setDa2(response.data.title2);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <header>
        News <i class="far fa-newspaper "></i>
      </header>
      <div className="home">
        {" "}
        <h3> Top news from the NBA</h3>
        <br />
      </div>
      <div className="news">
        {loading ? (
          <p>
            {" "}
            Loading top News from NBA.com and YAHOO.com <CircularProgress />{" "}
          </p>
        ) : (
          <p>
            {" "}
            1. {da} <br />
            <br /> 2. {da1} <br />
            <br /> 3. {da2}{" "}
          </p>
        )}
        <br />
        <img
          src="https://wreg.com/wp-content/uploads/sites/18/2020/01/hypatia-h_befb7026c7f476912a7a8a09709f1d76-h_d40ec2928d0caa702e8275cdd8419ffa.jpg"
          height="200"
        ></img>
        <br />
        <a className="nav_links2" href="https://www.nba.com/news">
          You can see all the news at NBA.COM
        </a>
      </div>
    </div>
  );
};

export default News;
