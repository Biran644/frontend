import * as React from "react";
import { makeStyles, useId, Input, Label } from "@fluentui/react-components";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        rowGap: "5px",
        maxWidth: "300px",
        color: "white",
    },
    label: {
        color: "white",
    },
});



export const InputField = ({fieldName, fieldPlaceholder}) => {
    const inputId = useId("input-with-placeholder");
    const styles = useStyles();

    return (
        <div className="ml-5">
            <div className={styles.root}>
                <Label htmlFor={inputId} className={styles.label}>{fieldName}</Label>
                <Input placeholder={fieldPlaceholder} id={inputId}/>
            </div>
        </div>
    );
};