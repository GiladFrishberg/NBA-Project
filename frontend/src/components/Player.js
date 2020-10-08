import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Navbar from "./Navbar";
import ShowData from "./ShowData";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Player() {
  const [inputText, setInputText] = useState("");
  const [inputText2, setInputText2] = useState("");
  const [stats, setStats] = useState([]);
  const [stats2, setStats2] = useState([]);
  const classes = useStyles();

  const fetchItemsPlayers = async (first, last) => {
    // this one finds the player id and gives his season stats

    const dataplayer = await fetch(
      `https://www.balldontlie.io/api/v1/players?search=${first}%20${last}`
    );
    const itemsplayer = await dataplayer.json();
    const id = itemsplayer.data[0].id;
    const playerstats = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
    );
    let statsics = await playerstats.json();
    statsics = statsics.data[0];
    const entries = Object.entries(statsics);
    setStats(entries);
  };

  const fetchItemsPlayers2 = async (first, last) => {
    // this one finds the player id and gives his season stats

    const dataplayer = await fetch(
      `https://www.balldontlie.io/api/v1/players?search=${first}%20${last}`
    );
    const itemsplayer = await dataplayer.json();
    const id = itemsplayer.data[0].id;
    const playerstats = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
    );
    let statsics = await playerstats.json();
    statsics = statsics.data[0];
    const entries = Object.entries(statsics);
    setStats2(entries);
  };

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const inputTextHandler2 = (e) => {
    setInputText2(e.target.value);
  };

  const selectPlayer = (e) => {
    e.preventDefault();
    var str = inputText;
    var res = str.split(" ");
    const first = res[0].toLowerCase();
    const last = res[1].toLowerCase();
    console.log(first + " " + last + "!!");
    fetchItemsPlayers(first, last);
  };

  const selectPlayer2 = (e) => {
    e.preventDefault();
    var str = inputText2;
    var res = str.split(" ");
    const first = res[0].toLowerCase();
    const last = res[1].toLowerCase();
    console.log(first + " " + last + "!!");
    fetchItemsPlayers2(first, last);
  };

  return (
    <div>
      <Navbar />
      <br />
      <header>
        1 Vs 1 <i class="fas fa-skull-crossbones"></i>
      </header>
      <div className="home">
        {" "}
        <h3> You can compare between 2 players</h3>{" "}
      </div>
      <form noValidate autoComplete="off">
        <TextField
          id="filled-basic"
          onChange={inputTextHandler}
          label="First Player"
          variant="filled"
        />
        <Button
          onClick={selectPlayer}
          variant="contained"
          color="primary"
          href="#contained-buttons"
        >
          select 1
        </Button>
        <TextField
          onChange={inputTextHandler2}
          id="filled-basic"
          label="Second Player"
          variant="filled"
        />
        <Button
          onClick={selectPlayer2}
          variant="contained"
          color="primary"
          href="#contained-buttons"
        >
          select 2
        </Button>
      </form>
      <div className="team">
        <ShowData teamStats={stats} />

        <ShowData teamStats={stats2} />
      </div>
    </div>
  );
}
