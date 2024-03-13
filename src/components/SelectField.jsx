import React from 'react';
import {
    makeStyles,
    Select,
    shorthands,
    tokens,
    useId,
} from "@fluentui/react-components";


const useStyles = makeStyles({
    base: {
        display: "flex",
        flexDirection: "column",
    },

    field: {
        display: "grid",
        gridRowGap: tokens.spacingVerticalXXS,
        marginTop: tokens.spacingVerticalMNudge,
        ...shorthands.padding(
            tokens.spacingVerticalMNudge,
            tokens.spacingHorizontalMNudge
        ),
    },
    label: {
        color: "white",
    },
});


const SelectField = ({label}) => {

    const styles = useStyles();
    const selectId = useId();

    return (
        <div className={styles.base}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor={`${selectId}-outline`}>{label}</label>
                <Select id={`${selectId}-outline`} appearance="outline">
                    <option>Red</option>
                    <option>Green</option>
                    <option>Blue</option>
                </Select>
            </div>
        </div>
    );
};

export default SelectField;