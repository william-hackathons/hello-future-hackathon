'use client'

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



function createData(id, date, phenotype, litres, topic_id, state, history) {
  return {
    id,
    date,
    phenotype,
    litres,
    topic_id,
    state,
    history: history,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="left">{row.phenotype}</TableCell>
        <TableCell align="left">{row.litres}</TableCell>
        <TableCell align="left">{row.topic_id}</TableCell>
        <TableCell align="left">{row.state}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ marginLeft:5, marginBottom:1}}>
              <Typography variant="h6" gutterBottom component="div">
                FSM State History @ HCS TopicId: {row.topic_id}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">State Change</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow hover key={historyRow.date}>
                      <TableCell align="right">{historyRow.transition}</TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData(1, '2024-01-05', 'O-', 5, '0.0.xxxxxxx', 'Collected', [
      {
        date: '2024-01-05',
        transition: 'toCollected',
      },
    ]),
  createData(2, '2024-01-05', 'A-', 5, '0.0.xxxxxxx', 'Analyzed', [
      {
        date: '2024-01-05',
        transition: 'toCollected',
      },
      {
        date: '2024-01-06',
        transition: 'toAnalyzed',
      },
    ]),
  createData(3, '2024-01-05', 'B-', 5, '0.0.xxxxxxx', 'Processed', [
      {
        date: '2024-01-05',
        transition: 'toCollected',
      },
      {
        date: '2024-01-06',
        transition: 'toAnalyzed',
      },
      {
        date: '2024-01-07',
        transition: 'toProcessed',
      },
    ]),
  createData(4, '2024-01-05', 'AB-', 5, '0.0.xxxxxxx', 'Stored', [
      {
        date: '2024-01-05',
        transition: 'toCollected',
      },
      {
        date: '2024-01-06',
        transition: 'toAnalyzed',
      },
      {
        date: '2024-01-07',
        transition: 'toProcessed',
      },
      {
        date: '2024-01-08',
        transition: 'toStored',
      },
    ]),
  createData(5, '2024-01-05', 'O+', 5, '0.0.xxxxxxx', 'Delivered', [
      {
        date: '2024-01-05',
        transition: 'toCollected',
      },
      {
        date: '2024-01-06',
        transition: 'toAnalyzed',
      },
      {
        date: '2024-01-07',
        transition: 'toProcessed',
      },
      {
        date: '2024-01-08',
        transition: 'toStored',
      },
      {
        date: '2024-01-09',
        transition: 'toDelivered',
      },
    ]),
  createData(6, '2024-01-05', 'A+', 5, '0.0.xxxxxxx', 'Utilized', [
      {
        date: '2024-01-05',
        transition: 'toCollected',
      },
      {
        date: '2024-01-06',
        transition: 'toAnalyzed',
      },
      {
        date: '2024-01-07',
        transition: 'toProcessed',
      },
      {
        date: '2024-01-08',
        transition: 'toStored',
      },
      {
        date: '2024-01-09',
        transition: 'toDelivered',
      },
      {
        date: '2024-01-10',
        transition: 'toUtilized',
      },
    ]),
  createData(7, '2024-01-05', 'B+', 5, '0.0.xxxxxxx', 'Disposed', [
      {
        date: '2024-01-05',
        transition: 'toCollected',
      },
      {
        date: '2024-01-06',
        transition: 'toAnalyzed',
      },
      {
        date: '2024-01-07',
        transition: 'toProcessed',
      },
      {
        date: '2024-01-08',
        transition: 'toStored',
      },
      {
        date: '2024-01-09',
        transition: 'toDelivered',
      },
      {
        date: '2024-01-10',
        transition: 'toUtilized',
      },
      {
        date: '2024-01-11',
        transition: 'toDisposed',
      },
    ]),
  createData(8, '2024-01-05', 'AB+', 5, '0.0.xxxxxxx', 'Disposed', [
      {
        date: '2024-01-05',
        transition: 'toCollected',
      },
      {
        date: '2024-01-06',
        transition: 'toAnalyzed',
      },
      {
        date: '2024-01-07',
        transition: 'toProcessed',
      },
      {
        date: '2024-01-08',
        transition: 'toStored',
      },
      {
        date: '2024-01-09',
        transition: 'toDelivered',
      },
      {
        date: '2024-01-10',
        transition: 'toUtilized',
      },
      {
        date: '2024-01-11',
        transition: 'toDisposed',
      },
    ]),
];

export default function CollapsibleTable() {
  return (
    <Box sx={{width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <br/>
        <Typography variant="h5" component="div" sx={{marginLeft: 2}}>
          Minted NFT-FSMs @ HTS TokenId: 0.0.4697795
        </Typography>

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="left">Phenotype</TableCell>
                <TableCell align="left">Litres Collected</TableCell>
                <TableCell align="left">TopicId</TableCell>
                <TableCell align="left">State</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
