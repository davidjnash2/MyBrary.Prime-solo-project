import React from 'react';
import './AboutPage.css';
import { Grid, Container, Typography, Box } from '@mui/material';


// about page for my info and info about project build
// more mui grid to get used to, and tried to use mui to style
// pretty much every element of this view
function AboutPage() {
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{
              mt: 10,
              fontFamily: "Rockwell Extra Bold, Rockwell Bold, monospace",
              fontSize: "4rem",
              textAlign: "center",
            }}
              variant="h2"
            >Dave Nash
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ mt: 2 }}>
              <img src="Images/IMG_6499.jpeg" className="me-image" />
            </Box>
          </Grid>
          <Grid item xs={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                marginBottom: 0,
                marginTop: 2,
                textAlign: "left",
                fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                fontSize: "1.75rem",
                color: "white",
              }}
            >
              Follow me on LinkedIn!
            </Typography>
            <Box sx={{ mt: 2, mb: 0, }}>
              <img src="/Images/LinkedInQR.png" className="linkedin-qr-image" />
            </Box>
          </Grid>
          <Grid item xs={4}
           sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: "center",
          }}>
            <Typography sx={{
              mt: 0,
              fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
              fontSize: "2rem",
              textAlign: "center",
            }}
              variant="h2"
            >
              Technologies used:
            </Typography>
            <ul>
              <li>
                <Typography
                  variant="p"
                  sx={{
                    marginBottom: 0,
                    marginTop: 2,
                    textAlign: "left",
                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  Google Books API
                </Typography>
              </li>
              <li>
                <Typography
                  variant="p"
                  sx={{
                    marginBottom: 0,
                    marginTop: 2,
                    textAlign: "left",
                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  React
                </Typography>
              </li>
              <li>
                <Typography
                  variant="p"
                  sx={{
                    marginBottom: 0,
                    marginTop: 2,
                    textAlign: "left",
                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  React-Redux
                </Typography>
              </li>
              <li>
                <Typography
                  variant="p"
                  sx={{
                    marginBottom: 0,
                    marginTop: 2,
                    textAlign: "left",
                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  Material UI
                </Typography>
              </li>
              <li>
                <Typography
                  variant="p"
                  sx={{
                    marginBottom: 0,
                    marginTop: 2,
                    textAlign: "left",
                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  Node.js
                </Typography>
              </li>
              <li>
                <Typography
                  variant="p"
                  sx={{
                    marginBottom: 0,
                    marginTop: 2,
                    textAlign: "left",
                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  Express
                </Typography>
              </li >
              <li>
                <Typography
                  variant="p"
                  sx={{
                    marginBottom: 0,
                    marginTop: 2,
                    textAlign: "left",
                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  Passport
                </Typography>
              </li >
              <li>
                <Typography
                  variant="p"
                  sx={{
                    marginBottom: 0,
                    marginTop: 2,
                    textAlign: "left",
                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  JavaScript
                </Typography>
              </li >
              <li>
                <Typography
                  variant="p"
                  sx={{
                    marginBottom: 0,
                    marginTop: 2,
                    textAlign: "left",
                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  PostgreSQL
                </Typography>
              </li >
              <li>
                <Typography
                  variant="p"
                  sx={{
                    marginBottom: 0,
                    marginTop: 2,
                    textAlign: "left",
                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  VS Code Editor
                </Typography>
              </li >
              <li>
                <Typography
                  variant="p"
                  sx={{
                    marginBottom: 0,
                    marginTop: 2,
                    textAlign: "left",
                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  Axios
                </Typography>
              </li >
              <li>
                <Typography
                  variant="p"
                  sx={{
                    marginBottom: 0,
                    marginTop: 2,
                    textAlign: "left",
                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  CSS
                </Typography>
              </li >
              <li>
                <Typography
                  variant="p"
                  sx={{
                    marginBottom: 0,
                    marginTop: 2,
                    textAlign: "left",
                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  HTML
                </Typography>
              </li >
            </ul >
          </Grid >
        </Grid>
      </Container >
    </>
  );
}

export default AboutPage;
