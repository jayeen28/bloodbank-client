import { Button } from "@mui/material"

/**
 * This function is used to create a button with the given props.
 * @param {Event} onClick The click event handler.
 * @param {JSX} children The text to be displayed on the button.
 * @param {String} variant The variant of the button. NOTE: only primary and secondary is available.
 * @returns It returns the button with the given props.
 */
export const FxButton = ({ type = 'button', onClick, children, color }) => {
    return (
        <Button
            type={type}
            variant="contained"
            sx={{
                color: '#303030',
                fontWeight: "700",
                letterSpacing: "0.063em",
                textDecoration: "none",
                paddingTop: "8px",
                paddingBottom: "8px"
            }}
            color={color ? color : 'primary'}
            onClick={() => onClick && onClick()}
        >{children}</Button>
    )
}