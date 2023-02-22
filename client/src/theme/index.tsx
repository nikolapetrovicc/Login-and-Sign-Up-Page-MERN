import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
    h5: {
      fontStyle: "normal",
      fontSize: "25px",
      lineHeight: "34px",
    },

    h6: {
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "22px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1.1rem",
          backgroundColor: "#475BE8",
          color: "#e8e8e8",
          padding: "0.5rem 1.3rem",
          borderRadius: "0.6rem",
          "&:hover": {
            backgroundColor: "#1029ea",
            color: "#e8e8e8",
            fontWeight: "400",
            textTransform: "none",
          },
        },
        contained: {
          backgroundColor: "#e8e8e8",
          color: "#475BE8",
          padding: "0.5rem 1.3rem",
          borderRadius: "0.6rem",
          "&:hover": {
            backgroundColor: "#f5f5f5",
            color: "#475BE8",
            fontWeight: "400",
            textTransform: "none",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "10.5px 14px 10.5px 12px",
        },
        notchedOutline: {
          borderColor: "#475BE8",
        },
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#475BE8",
          },
          "&.Mui-focused": {
            boxShadow: `0 0 0 2px ("#475BE8", 0.2)`,
            "& .MuiOutlinedInput-notchedOutline": {
              border: `2px solid #475BE8`,
            },
          },
          "&.Mui-error": {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F45252",
            },
            "&.Mui-focused": {
              boxShadow: `0 0 0 2px ("#F45252", 0.2)`,
              "& .MuiOutlinedInput-notchedOutline": {
                border: `2px solid #F45252`,
              },
            },
          },
        },
        inputSizeSmall: {
          padding: "7.5px 8px 7.5px 12px",
        },
        inputMultiline: {
          padding: 0,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#475BE8",
        },
      },
    },
  },
});
