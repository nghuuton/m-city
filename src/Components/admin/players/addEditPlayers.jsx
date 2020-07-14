import React, { Component } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";

import FormField from "../../ui/formField";
import { validate } from "../../ui/misc";

import { firebaseLooper } from "../../ui/misc";
import { firebaseDB, firebaseTeam, firebaseMatches } from "../../../firebase";
import Fileuploader from "../../ui/fileUploader";

class AddEditPlayers extends Component {
    state = {
        playerID: "",
        formType: "",
        formError: false,
        formSuccess: "",
        defaultImg: "",
        teams: [],
        formdata: {
            name: {
                element: "input",
                value: "",
                config: {
                    label: "Player name",
                    name: "name_input",
                    type: "name",
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: "",
                showLabel: true,
            },
            lastname: {
                element: "input",
                value: "",
                config: {
                    label: "Player Last Name",
                    name: "lastname_input",
                    type: "lastname",
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: "",
                showLabel: true,
            },
            number: {
                element: "input",
                value: "",
                config: {
                    label: "Player number",
                    name: "number_input",
                    type: "number",
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: "",
                showLabel: true,
            },
            position: {
                element: "select",
                value: "",
                config: {
                    label: "Select a position",
                    name: "select_position",
                    type: "select",
                    options: [
                        { key: "Keeper", value: "Keeper" },
                        { key: "Defence", value: "Defence" },
                        { key: "Midfield", value: "Midfield" },
                        { key: "Striker", value: "Striker" },
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: "",
                showLabel: true,
            },
            image: {
                element: "image",
                value: "",
                validation: {
                    rqeuired: true,
                },
                valid: true,
            },
        },
    };

    componentDidMount() {
        const playerId = this.props.match.params.id;
        if (!playerId) {
            this.setState({
                formType: "Add Players",
            });
        } else {
        }
    }

    updateForm(element) {
        // console.log(element);
        const newFormdata = { ...this.state.formdata };
        const newElement = { ...newFormdata[element.id] };
        newElement.value = element.event.target.value;

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormdata[element.id] = newElement;

        // console.log(newFormdata);

        this.setState({
            formError: false,
            formdata: newFormdata,
        });
    }

    submitForm(event) {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsvalid = true;
        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsvalid = this.state.formdata[key].valid && formIsvalid;
        }
        if (formIsvalid) {
        } else {
            this.setState({
                formError: true,
            });
        }
    }

    resetImage = () => {};

    render() {
        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>{this.state.formType}</h2>
                    <div>
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <FormField
                                id={"name"}
                                formdata={this.state.formdata.name}
                                change={(element) => this.updateForm(element)}
                            />
                            <Fileuploader
                                dir="players"
                                tag={"Player image"}
                                defaultImg={this.state.defaultImg}
                                deafaultImgName={
                                    this.state.formdata.image.value
                                }
                                resetImage={() => this.resetImage()}
                                filename={(filename) =>
                                    this.storeFilename(filename)
                                }
                            />
                            <FormField
                                id={"lastname"}
                                formdata={this.state.formdata.lastname}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={"number"}
                                formdata={this.state.formdata.number}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={"position"}
                                formdata={this.state.formdata.position}
                                change={(element) => this.updateForm(element)}
                            />
                            {this.state.formError ? (
                                <div className="error_label">
                                    Something is wrong.
                                </div>
                            ) : (
                                ""
                            )}
                            <div className="admin_submit">
                                <button
                                    onClick={(event) => this.submitForm(event)}
                                >
                                    {this.state.formType}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AddEditPlayers;
