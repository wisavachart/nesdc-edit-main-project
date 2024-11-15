import React, {useState} from "react";
import PropTypes from "prop-types";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
} from "@mui/material";
import {useWatch, useController, Controller} from "react-hook-form";
import FormLabel from "../FormLabel/FormLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const CheckboxGroup = ({
                           register,
                           question,
                           config,
                           control,
                           label,
                           name,
                           options,
                           row,
                           ...rest
                       }) => {
    const {
        field: { ref, value, onChange, ...inputProps },
        formState: { errors }
    } = useController({
        name,
        control,
        defaultValue: []
    });

    const checkboxIds = useWatch({ control, name: name }) || [];
    const [val,setVal]= useState([])
    const handleChange = (value) => {
        const newArray = [...checkboxIds];
        const item = value;

        //Ensure array isnt empty
        if (newArray.length > 0) {
            //Attempt to find an item in array with matching id
            const index = newArray.findIndex((x) => x === item);

            // If theres no match add item to the array
            if (index === -1) {
                newArray.push(item);
            } else {
                //If there is a match and the value is empty, remove the item from the array
                newArray.splice(index, 1);
            }
        } else {
            //If the array is empty, add the item to the array
            newArray.push(item);
        }

        //Overwrite existing array with newArray}
        onChange(newArray);
        setVal(newArray);
    };

    return (
        <div>
            <FormControl className={rest?.className}>
                {label && <FormLabel label={label} />}
                <FormGroup row={row}>
                    {options.map((option) => (
                        <>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={value?.some(
                                            (checked) => checked === option[config.value]
                                        )}
                                        {...inputProps}
                                        inputRef={ref}
                                        onChange={() => handleChange(option[config.value])}
                                        disabled={rest?.disabled}
                                    />
                                }
                                label={<p className="body2">{option[config.label]}</p>}
                                key={option[config.value]}
                            />
                            {option.choiceInfo ? option.choiceInfo.map((ci, i) => (
                                <>
                                    <Controller
                                        control={control}
                                        defaultValue={ci.choiceInfoId}
                                        {...register(`questions.` + question.questionId+ `.informationResults.`+option[config.value]+'.'+ci.choiceInfoId+`.choiceInformationId`)}
                                        render={({field: {onChange, value}}) => {
                                            return (
                                                <TextField
                                                    style={{display:'none'}}
                                                    size="small"
                                                    type="text"
                                                    fullWidth
                                                    onChange={onChange}
                                                    value={ci.choiceInfoId}
                                                />
                                            );
                                        }}
                                    />
                                <Controller
                                    rules={{required: config.choiceId==val && ci.choiceInfoRequired}}
                                    control={control}
                                    {...register(`questions.` + question.questionId+ `.informationResults.`+option[config.value]+'.'+ci.choiceInfoId+`.description`)}
                                    render={({field: {onChange, value}}) => {
                                        return (
                                            <TextField
                                                sx={{my:"5px"}}
                                                size="small"
                                                type="text"
                                                fullWidth
                                                label={ci.choiceInfoDescription}
                                                onChange={onChange}
                                                value={value}
                                                required={Boolean(val.includes(option[config.value])&&ci.choiceInfoRequired)}
                                            />
                                        );
                                    }}
                                />
                                    </>
                            )):null}
                        </>
                    ))}
                </FormGroup>
            </FormControl>
        </div>
    );
};

CheckboxGroup.propTypes = {
    control: PropTypes.object.isRequired,
    label: PropTypes.string,
    labelPlacement: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    row: PropTypes.bool,
    setValue: PropTypes.func.isRequired,
    config: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })
};

CheckboxGroup.defaultProps = {
    config: {
        label: "label",
        value: "value"
    }
};

export default CheckboxGroup;
