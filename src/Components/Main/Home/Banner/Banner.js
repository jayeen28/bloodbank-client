import { Button, Grid } from '@mui/material';
import React from 'react';
import BannerImg from '../../../../Assets/banner-photo.png';
import './Banner.css';

const Banner = () => {
    return (
        <section className='banner-section'>
            <Grid container spacing={5} sx={{ flexDirection: { xs: "column-reverse", sm: "row" } }}>
                <Grid item xs={12} sm={6}>
                    <div className='banner-left'>
                        <div className='banner-left-content'>
                            <h1>Give blood and open doors for happiness in your life today</h1>
                            <Button variant="contained" color="primary">
                                Donate Now
                            </Button>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className='banner-right'>
                        <div className='banner-photo-wrapper'>
                            <img src={BannerImg} alt="bannerPhoto" style={{ width: '100%' }} />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </section>
    );
}

export default Banner;