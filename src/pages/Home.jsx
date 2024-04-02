import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import MessageIcon from '@mui/icons-material/Message';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { ChartBar } from '../components/ChartBar'; // Adjust with your actual import path
import TableCard from '../components/TableCard'; // Adjust with your actual import path

const sidebarWidth = 270;

// Define custom colors
const colors = {
  lightGrey: '#F9F7F7',
  lightBlue: '#DBE2EF',
  mediumBlue: '#3F72AF',
  darkBlue: '#112D4E',
};

export default function Home() {
  return (
    <Box component="main" sx={{
      flexGrow: 1,
      p: 3,
      ml: `${sidebarWidth}px`,
      width: `calc(100% - ${sidebarWidth}px)`,
      overflow: 'hidden',
      backgroundColor: colors.lightGrey, // Use light grey as the background color
    }}>
      <Grid container spacing={3}>

        {/* Dynamic way to generate the cards with icons and colors */}
        {[
          { title: "Messages with high priority", count: 20, icon: <PriorityHighOutlinedIcon sx={{ color: colors.darkBlue }} />, iconColor: colors.darkBlue },
          { title: "Messages with mid priority", count: 30, icon: <PriorityHighOutlinedIcon sx={{ color: colors.mediumBlue }} />, iconColor: colors.mediumBlue },
          { title: "Messages with low priority", count: 14, icon: <PriorityHighOutlinedIcon sx={{ color: colors.lightBlue }} />, iconColor: colors.lightBlue },
          { title: "Total conversations", count: 40, icon: <MessageIcon sx={{ color: colors.darkBlue }} />, iconColor: colors.darkBlue },
          { title: "Growth Rate", count: "$10,000", icon: <TrendingUpIcon sx={{ color: colors.mediumBlue }} />, iconColor: colors.mediumBlue },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h4">{item.count}</Typography>
                  {React.cloneElement(item.icon, { sx: { fontSize: 40, color: item.iconColor }})}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Chart and Table Section */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%', width: '100%' }}>
            <CardContent>
              <ChartBar />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', width: '100%' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Confirmed orders:
              </Typography>
              <TableCard />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}




