import { Button } from "@mui/material";

const TstButton = ({ size, variant, children, onClick }) => {
    return (
        <Button size={size} variant={variant} color="primary" onClick={() => onClick && onClick()}>
            {children}
        </Button>);
}

export default TstButton;