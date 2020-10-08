import React from "react";
import { DataGrid, ColDef } from "@material-ui/data-grid";

const ShowData = ({ teamStats }) => {
  console.log("teamStats in show data", teamStats);

  const columns: ColDef[] = [
    { field: "id", hide: true },
    {
      field: "STAT",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell2",
      headerAlign: "center",
      width: 150,
    },
    {
      field: "AVG",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      headerAlign: "center",
      width: 100,
    },
  ];

  const rows = teamStats.map((item) => ({
    id: Math.random() * 1000,
    STAT: item[0],
    AVG: item[1],
  }));

  return (
    <div style={{ height: 600, width: "25%" }}>
      {teamStats.length < 1 ? (
        ""
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={18}
          hideFooter={true}

          // checkboxSelection
        />
      )}
    </div>
  );
};

export default ShowData;
