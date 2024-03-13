import React from 'react';
import { makeStyles, Button } from "@fluentui/react-components";


const ButtonField = ({icon, label, onClick}) => {

    return (
        <Button appearance="primary" icon={icon} onClick={onClick}>
            {label}
        </Button>
    );
};

export default ButtonField;