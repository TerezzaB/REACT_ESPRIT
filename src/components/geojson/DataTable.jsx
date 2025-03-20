import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import geojson from '../../assets/geojson.json';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F9F9F9',
  },
}));

export default function DataTable() {
  const podneTypy = geojson.podne_typy.podne_typy;

  return (
    <TableContainer component="div">
      <Table>
        <TableHead sx={{ backgroundColor: '#F9F9F9' }}>
          <StyledTableRow>
            <TableCell>Podny Typ</TableCell>
            <TableCell>Kód</TableCell>
            <TableCell>Area (km²)</TableCell>
            <TableCell>Percento</TableCell>
            <TableCell>Podny Subtyp</TableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {podneTypy.map((typ, index) => (
            <StyledTableRow key={index}>
              <TableCell>{typ.podny_typ}</TableCell>
              <TableCell>{typ.podny_typ_kod}</TableCell>
              <TableCell>{typ.areakm2}</TableCell>
              <TableCell>{typ.percento}</TableCell>
              <TableCell>
                {typ.podne_subtypy.map((subtyp, subIndex) => (
                  <div key={subIndex}>
                    {subtyp.podny_subtyp} ({subtyp.podny_subtyp_kod})
                  </div>
                ))}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
