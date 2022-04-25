import { Typography } from "@mui/material"

const variants = {
    mainHead: 'h2',
    subHead: 'h4',
    mainPara: 'body1',
    subPara: 'body2',
}

const styles = {
    mainHead: {
        fontSize: { xs: '30px', md: '39px' },//responsive font size
        lineHeight: '1.2',
        whiteSpace: 'pre-line',
        wordWrap: 'break-word',
        letterSpacing: 'normal',
        fontWeight: '700'
    },
    subHead: {
        fontSize: { xs: '18px', md: '22px' },//responsive font size
        lineHeight: '1.25',
        whiteSpace: 'pre-line',
        wordWrap: 'break-word',
        letterSpacing: 'normal',
        fontWeight: '400'
    },
    mainPara: {
        fontSize: { xs: '18px', md: '22px' },//responsive font size
        lineHeight: '1.5',
        fontWeight: '400',
        wordWrap: 'break-word',
        letterSpacing: 'normal'
    },
    subPara: {
        fontSize: { xs: '14px', md: '16px' },//responsive font size
        lineHeight: '1.5',
        fontWeight: '400',
        wordWrap: 'break-word',
        letterSpacing: 'normal'
    }
}

/**
 * This function is used to create a typography with the given props.
 * @param {String} textAlign To align text in the typography.
 * @param {String} variant The variant of the typography. NOTE: only mainHead, subHead, mainPara and subPara is available.
 * @param {JSX} children The text to be displayed on the typography.  
 * @returns It returns the typography with the given props.
 */
export const FxTypoGraphy = ({ textAlign, variant, children }) => {
    return (
        <Typography
            sx={styles[variant]}
            className={`fx-typo-graphy-${variant}`}
            textAlign={textAlign ? textAlign : 'left'}
            variant={variants[variant]}
            component="div"
            gutterBottom
        > {children}</Typography >
    )
} 