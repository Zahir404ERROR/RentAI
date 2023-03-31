import { Card, CardContent, CardActions, Button } from "@mui/material";

const Banners = () => {
  const bannerData = [
    { title: "Rent Map", description: "Unlock the London city's rental secrets with our rent map - your ultimate guide to finding the perfect place to call home in London! Discover the hottest neighborhoods and best deals with ease. Try it today and take the first step towards your next adventure!", url: "/feature1" },
    { title: "Rent Comparison", description: "Rent comparison feature allows users to compare the cost and transportation details of two house URLs, providing a comprehensive analysis of which location offers the most convenient and affordable living options.", url: "/feature2" },
    { title: "About", description: "Lorem ipsum dolor sit amet.", url: "#" },
    { title: "Contact Us", description: "Lorem ipsum dolor sit amet.", url: "#" },
  ];

  return (
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        backgroundColor: "#E6F0FF",
        justifyContent: "center", 
        padding: "2% 20%",
        gap: "20px",
      }}
    >
      {bannerData.map((banner, index) => (
        <Card key={index} sx={{ maxWidth: 300 }}>
          <CardContent>
            <h2>{banner.title}</h2>
            <br />
            <p align="justify">{banner.description}</p>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button size="small" href={banner.url}>
              Check it out
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default Banners;
