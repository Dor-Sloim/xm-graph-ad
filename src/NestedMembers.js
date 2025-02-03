import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



const GroupRow = ({ props }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {props.member.members.users.length || props.member.members.groups.length ?
              open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> : null}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.member.name}
        </TableCell>
        <TableCell align="right">{props.member.id}</TableCell>
        <TableCell align="right">{props.member.type}</TableCell>
        <TableCell align="right">{props.member.members.users.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell >
        </TableCell>
        <TableCell colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell align="right"><b>Id</b></TableCell>
              <TableCell align="right"><b>Type</b></TableCell>
              <TableCell align="right"><b>Direct Members</b></TableCell>
            </TableRow>
          </TableHead>
            <Rows props={{members : props.member.members}} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const Rows = ({ props }) => {
  if (!props.members) return null;
  console.log("row props: ", props)

  return(<>
          {props.members.users.map((m) => (
            <TableRow
              key={m.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"></TableCell>
              <TableCell component="th" scope="row">{m.name}</TableCell>
              <TableCell align="right">{m.id}</TableCell>
              <TableCell align="right">{m.type}</TableCell>
              <TableCell align="right">1</TableCell>
            </TableRow>
          ))}
          {props.members.groups.map((m) => (
            <GroupRow props={{member : m}} />
          ))}
        </>
  )
}

const NestedMembers = ({ props }) => {
  if (!props) return null;
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
      <h3>Members of {props.selectedNode.name}</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell align="right"><b>Id</b></TableCell>
              <TableCell align="right"><b>Type</b></TableCell>
              <TableCell align="right"><b>Direct Members</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Rows props={props} />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default NestedMembers;
