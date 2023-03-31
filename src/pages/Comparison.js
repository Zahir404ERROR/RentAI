import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button } from '@mui/material';
import { Card, CardContent, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

function Comparison() {
  // Set up the state variables
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [comparisonResultURL1, setComparisonResultURL1] = useState('');
  const [comparisonAddressURL1, setcomparisonAddressURL1] = useState('');
  const [comparisonCleanAddressURL1, setcomparisonCleanAddressURL1] = useState('');
  const [comparisonRoomsURL1, setcomparisonRoomsURL1] = useState('');
  const [comparisonHouseTypeURL1, setcomparisonHouseTypeURL1] = useState('');
  const [comparisonBathroomsURL1, setcomparisonBathroomsURL1] = useState('');
  const [comparisonDescriptionURL1, setcomparisonDescriptionURL1] = useState('');
  const [comparisonTransportCostURL1, setcomparisonTransportCostURL1] = useState('');
  const [comparisonMTransportCostURL1, setcomparisonMTransportCostURL1] = useState('');
  const [comparisonATransportCostURL1, setcomparisonATransportCostURL1] = useState('');
  const [comparisonLatURL1, setcomparisonLatURL1] = useState('');
  const [comparisonLongURL1, setcomparisonLongURL1] = useState('');
  const [comparisonIMGURL1, setComparisonIMGURL1] = useState('');
  const [comparisonResultURL2, setComparisonResultURL2] = useState('');
  const [comparisonAddressURL2, setcomparisonAddressURL2] = useState('');
  const [comparisonCleanAddressURL2, setcomparisonCleanAddressURL2] = useState('');
  const [comparisonRoomsURL2, setcomparisonRoomsURL2] = useState('');
  const [comparisonHouseTypeURL2, setcomparisonHouseTypeURL2] = useState('');
  const [comparisonBathroomsURL2, setcomparisonBathroomsURL2] = useState('');
  const [comparisonDescriptionURL2, setcomparisonDescriptionURL2] = useState('');
  const [comparisonTransportCostURL2, setcomparisonTransportCostURL2] = useState('');
  const [comparisonMTransportCostURL2, setcomparisonMTransportCostURL2] = useState('');
  const [comparisonATransportCostURL2, setcomparisonATransportCostURL2] = useState('');
  const [comparisonLatURL2, setcomparisonLatURL2] = useState('');
  const [comparisonLongURL2, setcomparisonLongURL2] = useState('');
  const [comparisonIMGURL2, setComparisonIMGURL2] = useState('');
  
  // Handle input changes  
  const handleUrl1Change = (event) => {
    setUrl1(event.target.value);
  };

  const handleUrl2Change = (event) => {
    setUrl2(event.target.value);
  };

  // Handle submit button
  const handleCompareClick = async () => {
    try {
      // Send the data to the server
      const response = await axios.post('/compare', {
        url1: url1,
        url2: url2,
      });
      // Set the state variables
      setComparisonResultURL1(response.data.url1Price);
      setcomparisonAddressURL1(response.data.url1Address);
      setcomparisonCleanAddressURL1(response.data.url1CleanedAddress);
      setcomparisonRoomsURL1(response.data.url1Rooms);
      setcomparisonHouseTypeURL1(response.data.url1HouseType);
      setcomparisonBathroomsURL1(response.data.url1Bathrooms);
      setcomparisonDescriptionURL1(response.data.url1Description);
      setcomparisonTransportCostURL1(response.data.url1TransportCost);
      setcomparisonMTransportCostURL1(response.data.url1MTransportCost);
      setcomparisonATransportCostURL1(response.data.url1ATransportCost);
      setcomparisonLatURL1(response.data.url1Lat);
      setcomparisonLongURL1(response.data.url1Lng);
      setComparisonIMGURL1(response.data.url1Image);
      
      setComparisonResultURL2(response.data.url2Price);
      setcomparisonAddressURL2(response.data.url2Address);
      setcomparisonCleanAddressURL2(response.data.url2CleanedAddress);
      setcomparisonRoomsURL2(response.data.url2Rooms);
      setcomparisonHouseTypeURL2(response.data.url2HouseType);
      setcomparisonBathroomsURL2(response.data.url2Bathrooms);
      setcomparisonDescriptionURL2(response.data.url2Description);
      setcomparisonTransportCostURL2(response.data.url2TransportCost);
      setcomparisonMTransportCostURL2(response.data.url2MTransportCost);
      setcomparisonATransportCostURL2(response.data.url2ATransportCost);
      setcomparisonLatURL2(response.data.url2Lat);
      setcomparisonLongURL2(response.data.url2Lng);
      setComparisonIMGURL2(response.data.url2Image);
    } catch (error) {
      console.log(error);
      setComparisonResultURL1('An error occurred while comparing the URLs.');
    }
  };


  return (
    <Container sx={{ borderRadius: '10px', backgroundColor: "#f9f9f9" }}>
      <div style={{ display: 'flex' }}>
        <TextField
          label="URL 1"
          fullWidth
          margin="normal"
          value={url1}
          onChange={handleUrl1Change}
          style={{ flex: 1, backgroundColor: 'white', marginRight: '20px' }}
        />
        <TextField
          label="URL 2"
          fullWidth
          margin="normal"
          value={url2}
          onChange={handleUrl2Change}
          style={{ flex: 1, backgroundColor: 'white', marginLeft: '20px' }}
        />
        <Button variant="contained" style={{ marginLeft: '20px', marginTop: 'auto', marginBottom: 'auto', width: '15%', height: '4em' }} onClick={handleCompareClick}>
          Compare URLs
        </Button>
      </div>


      <Box sx={{ display: 'flex' }}>
        {comparisonResultURL1 && (

          <Box sx={{ flex: 1, marginRight: '1em' }}>
            <Card sx={{
              borderRadius: '10px',
              backgroundColor: 'white',
              padding: '16px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <CardContent>
                <img src={comparisonIMGURL1} style={{ display: 'block', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', width: '80%', height: 'auto', borderRadius: 20 }} alt="Comparison 1" />
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell><Typography variant="h5">Price:</Typography></TableCell>
                        <TableCell><Typography>{comparisonResultURL1}</Typography></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Address:</Typography></TableCell>
                        <TableCell><Typography>{comparisonAddressURL1}</Typography></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Cleaned Address:</Typography></TableCell>
                        <TableCell><Typography>{comparisonCleanAddressURL1}</Typography></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Rooms:</Typography></TableCell>
                        <TableCell><Typography>{comparisonRoomsURL1}</Typography></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Bathrooms:</Typography></TableCell>
                        <TableCell><Typography>{comparisonBathroomsURL1}</Typography></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Property Type:</Typography></TableCell>
                        <TableCell><Typography>{comparisonHouseTypeURL1}</Typography></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Transport Cost:</Typography></TableCell>
                        <TableCell>
                          <Typography>Single Fare - £{comparisonTransportCostURL1}</Typography>
                          <Typography>Monthly - £{comparisonMTransportCostURL1}</Typography>
                          <Typography>Annually - £{comparisonATransportCostURL1}</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Council Tax:</Typography></TableCell>
                        <TableCell><Typography>When sharing house with students you are not responsible to pay Council Tax </Typography></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Water Bill:</Typography></TableCell>
                        <TableCell><Typography>Confirm if house has a water meter installed if not you will be forced to pay clean and wastewater charges based on the rateable value of your property. </Typography></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Latitude:</Typography></TableCell>
                        <TableCell><Typography>{comparisonLatURL1}</Typography></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Longitude:</Typography></TableCell>
                        <TableCell><Typography>{comparisonLongURL1}</Typography></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Description:</Typography></TableCell>
                        <TableCell><Typography sx={{ marginRight: '20px', whiteSpace: 'pre-wrap' }} align="justify">{comparisonDescriptionURL1}</Typography></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>

        )}
        {comparisonResultURL2 && (
          <Box sx={{ flex: 1, marginLeft: '1em' }}>
            <Card sx={{
              borderRadius: '10px',
              backgroundColor: 'white',
              padding: '16px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <img src={comparisonIMGURL2} style={{ display: 'block', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', width: '80%', height: 'auto', borderRadius: 20 }} alt="Comparison 2" />
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell><Typography variant="h5">Price:</Typography></TableCell>
                      <TableCell><Typography>{comparisonResultURL2}</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Address:</Typography></TableCell>
                      <TableCell><Typography>{comparisonAddressURL2}</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Cleaned Address:</Typography></TableCell>
                      <TableCell><Typography>{comparisonCleanAddressURL2}</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Rooms:</Typography></TableCell>
                      <TableCell><Typography>{comparisonRoomsURL2}</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Bathrooms:</Typography></TableCell>
                      <TableCell><Typography>{comparisonBathroomsURL2}</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Property Type:</Typography></TableCell>
                      <TableCell><Typography>{comparisonHouseTypeURL2}</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Transport Cost:</Typography></TableCell>
                      <TableCell>
                        <Typography>Single Fare - £{comparisonTransportCostURL2}</Typography>
                        <Typography>Monthly - £{comparisonMTransportCostURL2}</Typography>
                        <Typography>Annually - £{comparisonATransportCostURL2}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Council Tax:</Typography></TableCell>
                        <TableCell><Typography>When sharing house with students you are not responsible to pay Council Tax </Typography></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Water Bill:</Typography></TableCell>
                        <TableCell><Typography>Confirm if house has a water meter installed if not you will be forced to pay clean and wastewater charges based on the rateable value of your property. </Typography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Latitude:</Typography></TableCell>
                      <TableCell><Typography>{comparisonLatURL2}</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Longitude:</Typography></TableCell>
                      <TableCell><Typography>{comparisonLongURL2}</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography variant="h5" sx={{ marginTop: '10px' }}>Description:</Typography></TableCell>
                      <TableCell><Typography sx={{ marginRight: '20px', whiteSpace: 'pre-wrap' }} align="justify">{comparisonDescriptionURL2}</Typography></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>

          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Comparison;
