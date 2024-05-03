import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(UserID, Location) {
  return { UserID, Location };
}

const rows = [
  createData(2283842928, '1013 W 5th st'),
  createData(2735498338, '1283 S 4th st'),
  createData(7283294094, '3884 N 9th st'),
  createData(2283842928, '1013 W 5th st'),
 
];

export default function TableCard() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '20%', color:'blue' }}>UserID</TableCell>
            <TableCell style={{ width: '20%', color:'blue'  }} align="right">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.UserID}>
              <TableCell component="th" scope="row"   >
                {row.UserID}
             
              </TableCell>
              <TableCell align="right" >{row.Location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
