export const sharedStyles = (theme) => ({
  "& .MuiInputBase-root": {color: theme.palette.text.primary},
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.text.primary,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.text.primary,
  },
  "& .MuiInputLabel-root": {color: theme.palette.text.primary},
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.text.primary,
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.text.primary,
  },
});
