import { Typography } from "@mui/material";

const TstHeading = ({ variant, children }) => {
    return (
        <Typography variant={variant} component="div" gutterBottom>
            {children}
        </Typography>
    );
}

export default TstHeading; 