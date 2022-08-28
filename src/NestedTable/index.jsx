import React, { memo } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const checkType = (data) => {
  if (typeof data === "object" && !Array.isArray(data) && data !== null) {
    return "object";
  }
  if (Array.isArray(data) && data !== null) {
    return "array";
  }
  return "string";
};

function BasicTable({ data, parent = "array" }) {
  if (!data) {
    return <TableCell>N/A</TableCell>;
  }

  const dataType = checkType(data);

  if (dataType === "string") {
    return data;
  }

  const renderRows = () => {
    if (dataType === "array") {
      const head = [];
      Object.keys(data[0]).forEach((key) => head.push(key));

      return (
        <TableContainer>
          <Table
            sx={{
              width: "fit-content",
              border: "1px solid rgba(224, 224, 224, 1)",
            }}
            aria-label="simple table"
            component={Paper}
          >
            <TableHead>
              <TableRow>
                {head.map((elem) => (
                  <TableCell key={elem}>{elem}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, r_index) => {
                return r_index === 0 ? (
                  <BasicTable
                    key={`row-${r_index}`}
                    data={row}
                    parent="array"
                  />
                ) : (
                  <TableRow>
                    <BasicTable
                      key={`row-${r_index}`}
                      data={row}
                      parent="array"
                    />
                  </TableRow>
                );
              })}

              {/* {row.map((col, c_index) => {
                    return (
                      <TableCell key={`col_${c_index}`}>
                        <BasicTable
                          key={`col-${c_index}`}
                          data={col}
                          parent="array"
                        />
                      </TableCell>
                    );
                  })} */}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
    if (dataType === "object") {
      const obHead = Object.keys(data);
      if (parent !== "array") {
        return (
          <>
            <TableHead>
              <TableRow>
                {obHead.map((elem) => (
                  <TableCell key={elem}>{elem}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                {obHead.map((val, index) => {
                  return (
                    <TableCell key={val}>
                      <BasicTable
                        key={`sds-${index}`}
                        data={data[val]}
                        parent="object"
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </>
        );
      } else {
        return obHead.map((val, index) => {
          return (
            <TableCell key={val}>
              <BasicTable
                key={`sds-${index}`}
                data={data[val]}
                parent="object"
              />
            </TableCell>
          );
        });
      }
    }
    return null;
  };

  return renderRows();
}

// ===================== //

// const pass=[]

const index = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Please pass a value to render</div>;
  }
  return <BasicTable data={data} parent={checkType(data)} />;
};

export default memo(index);
