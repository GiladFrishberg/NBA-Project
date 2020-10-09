import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ShowData from "./ShowData";

const teams_array = [
  { fullname: "Atlanta Hawks", nickname: "hawks" },
  { fullname: "Boston Celtics", nickname: "celtics" },
  { fullname: "Brooklyn Nets", nickname: "nets" },
  { fullname: "Charlotte Hornets", nickname: "hornets" },
  { fullname: "Chicago Bulls", nickname: "bulls" },
  { fullname: "Cleveland Cavaliers", nickname: "cavaliers" },
  { fullname: "Dallas Mavericks", nickname: "mavericks" },
  { fullname: "Denver Nuggets", nickname: "nuggets" },
  { fullname: "Detroit Pistons", nickname: "pistons" },
  { fullname: "Golden State Warriors", nickname: "warriors" },
  { fullname: "Houston Rockets", nickname: "rockets" },
  { fullname: "Indiana Pacers", nickname: "pacers" },
  { fullname: "LA Clippers", nickname: "clippers" },
  { fullname: "Los Angeles Lakers", nickname: "lakers" },
  { fullname: "Memphis Grizzlies", nickname: "grizzlies" },
  { fullname: "Miami Heat", nickname: "heat" },
  { fullname: "Milwaukee Bucks", nickname: "bucks" },
  { fullname: "Minnesota Timberwolves", nickname: "timberwolves" },
  { fullname: "New Orleans Pelicans", nickname: "pelicans" },
  { fullname: "New York Knicks", nickname: "knicks" },
  { fullname: "Oklahoma City Thunder", nickname: "thunder" },
  { fullname: "Orlando Magic", nickname: "magic" },
  { fullname: "Philadelphia 76ers", nickname: "76ers" },
  { fullname: "Phoenix Suns", nickname: "suns" },
  { fullname: "Portland Trail Blazers", nickname: "trail blazers" },
  { fullname: "Sacramento Kings", nickname: "kings" },
  { fullname: "San Antonio Spurs", nickname: "spurs" },
  { fullname: "Toronto Raptors", nickname: "raptors" },
  { fullname: "Utah Jazz", nickname: "jazz" },
  { fullname: "Washington Wizards", nickname: "wizards" },
];
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Team = () => {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState([]);
  const [teamStats, setTeamStats] = useState([]);
  const [teamRank, setTeamRank] = useState([]);
  const classes = useStyles();

  const fetchItems = async (team) => {
    // this one gives the roster of the team

    const data = await fetch(
      `https://data.nba.net/json/cms/noseason/team/${team}/roster.json`
    );
    const items = await data.json();
    console.log(items.sports_content.roster.players.player);
    setItems(items.sports_content.roster.players.player);
  };

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
    const entries3 = Object.entries(statsics);
    setStats(entries3);
  };

  const fetchItemsTeamStats = async (team) => {
    // this one gives the stats and rankings of the team

    const data = await fetch(
      `https://data.nba.net/json/cms/2019/statistics/${team}/regseason_stats_and_rankings.json`
    );
    const itemsteam = await data.json();
    const newteamstats = itemsteam.sports_content.team.averages;
    const newteamrank = itemsteam.sports_content.team.rankings;
    const entries = Object.entries(newteamstats);
    const entries2 = Object.entries(newteamrank);
    console.log("entries2 is,", entries2);
    setTeamStats(entries);
    setTeamRank(entries2);
  };

  const selectTeam = (e) => {
    e.preventDefault();
    var team = e.target.value;
    console.log(team);
    fetchItemsTeamStats(team);
    fetchItems(team);
  };

  const selectPlayer = (e) => {
    e.preventDefault();
    var str = e.target.value;
    var res = str.split(" ");
    const first = res[0].toLowerCase();
    const last = res[1].toLowerCase();
    console.log(first + " " + last + "!!");
    fetchItemsPlayers(first, last);
  };

  return (
    <div className="team">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Choose Team</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={selectTeam}
        >
          {teams_array.map((item) => (
            <MenuItem value={item.nickname}>{item.fullname} </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ShowData teamStats={teamStats} />
      <ShowData teamStats={teamRank} />

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Choose Player</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={selectPlayer}
        >
          {items.map((item) => (
            <MenuItem value={item.first_name + " " + item.last_name}>
              {item.first_name} {item.last_name}{" "}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ShowData teamStats={stats} />
    </div>
  );
};

export default Team;
