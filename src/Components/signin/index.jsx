import React, { Component } from "react";
import FormField from "../ui/formField";
import { validate } from "../ui/misc";

class SignIn extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            email: {
                element: "input",
                value: "",
                config: {
                    name: "email_input",
                    type: "email",
                    placeholder: "Enter your email",
                    autoComplete: "off",
                },
                validation: {
                    required: true,
                    email: true,
                },
                valid: false,
                validationMessage: "",
            },
            password: {
                element: "input",
                value: "",
                config: {
                    name: "password_input",
                    type: "password",
                    placeholder: "Enter your password",
                    autoComplete: "off",
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: "",
            },
        },
    };

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
            console.log(dataToSubmit);
            // this.ressetFormSuccess();
        } else {
            this.setState({
                formError: true,
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="signin_wrapper" style={{ margin: "100px" }}>
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <h2>Please login</h2>
                        <FormField
                            id={"email"}
                            formdata={this.state.formdata.email}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={"password"}
                            formdata={this.state.formdata.password}
                            change={(element) => this.updateForm(element)}
                        />
                        <button onClick={(event) => this.submitForm(event)}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignIn;
