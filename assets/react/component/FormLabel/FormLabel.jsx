import React from "react";
import PropTypes from "prop-types";
import { makeStyles, FormLabel as Label } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    label: {
        marginBottom: theme.spacing(1),
        color: "black",
        "&.Mui-focused": {
            color: "black"
        }
    }
}));

const FormLabel = ({ label }) => {
    const classes = useStyles();

    return (
        <Label classes={{ root: classes.label, focused: classes.focused }}>
            <h5>{label}</h5>
        </Label>
    );
};

FormLabel.propTypes = {
    label: PropTypes.string
};

export default FormLabel;
