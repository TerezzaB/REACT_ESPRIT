import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '& td, & th': {
    border: 'none',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#F9F9F9',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
}));

export default function DataTable({ data }) {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Extract column headers dynamically from the first row of data
  const columns = Object.keys(data[0]);

  return (
    <TableContainer component="div" sx={{ borderRadius: '10px', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#F9F9F9' }}>
          <StyledTableRow>
            {columns.map((column, index) => (
              <StyledTableCell key={index}>{column}</StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>
                  {Array.isArray(row[column]) ? (
                    row[column].map((item, itemIndex) => (
                      <div key={itemIndex}>{JSON.stringify(item)}</div>
                    ))
                  ) : (
                    row[column]
                  )}
                </TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
