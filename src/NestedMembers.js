import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const GroupRows = ({ props }) => {
  if (!props.members) return null;
  console.log("row props: ", props)

  return(
          <>
            {props.members.users.map((m) => (
              <TableRow
                key={m.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{m.name}</TableCell>
                <TableCell align="right">{m.id}</TableCell>
                <TableCell align="right">{m.type}</TableCell>
                <TableCell align="right">{props.members.path && props.members.path.map((x) => x.name).join(', ')}</TableCell>
                <TableCell align="right">1</TableCell>
              </TableRow>
            ))}
            {props.members.groups.map((m) => (
              <TableRow
                key={m.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{m.name}</TableCell>
                <TableCell align="right">{m.id}</TableCell>
                <TableCell align="right">{m.type}</TableCell>
                <TableCell align="right">{props.members.path && props.members.path.map((x) => x.name).join(', ')}</TableCell>
                <TableCell align="right">{m.members.users.length}</TableCell>
              </TableRow>
            ))}
            {props.members.groups.map((m) => (
              <GroupRows props={{ members : m.members}} />
            ))}
          </>
  )
}

const NestedMembers = ({ props }) => {
  if (!props) return null;
  console.log(props.members) 
  return (
    <div style={{
      position: 'absolute',
      right: '20px',
      top: '20px',
      background: 'rgba(0, 0, 0, 0.7)',
      color: '#fff',
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '300'
    }}>
      <h3>{props.selectedNode.name}</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell align="right"><b>Id</b></TableCell>
              <TableCell align="right"><b>Type</b></TableCell>
              <TableCell align="right"><b>Membership Path</b></TableCell>
              <TableCell align="right"><b>Member Count</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <GroupRows props={props} />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default NestedMembers;
