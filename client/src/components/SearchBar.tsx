import { TextField } from "@mui/material";

interface Props {
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ onSearch }: Props) => {
    return (
        <TextField
            label="Search Blogs"
            variant="outlined"
            sx={{ flexGrow: 1, marginRight: '20px' }}
            onChange={onSearch}
        />
    );
};


export default SearchBar