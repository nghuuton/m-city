import React from "react";

const FormField = ({ formdata, id, change }) => {
    const renderTemplate = () => {
        let formTemplate = null;
        switch (formdata.element) {
            case "input":
                formTemplate = (
                    <input
                        {...formdata.config}
                        value={formdata.value}
                        onChange={(event) => change({ event, id })}
                    />
                );
                break;

            default:
                formTemplate = null;
                break;
        }
        return formTemplate;
    };
    return <div>{renderTemplate()}</div>;
};

export default FormField;
