import { Button } from "@mui/material"

export const LoadMore = ({ isLoading, setIsLoading, setPagData, nextPage }) => {
    return (
        <Button
            variant="contained"
            disabled={isLoading}
            onClick={() => {
                setIsLoading(true)
                setPagData(data => ({ ...data, page: nextPage - 1 }))
            }}
        >Load more {isLoading && '. . .'} </Button>
    )
}