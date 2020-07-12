import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import FormField from "../../ui/formField";
import { validate } from "../../ui/misc";
import { firebasePromotions } from "../../../firebase";

class Enroll extends Component {
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
        },
    };

    // componentDidMount() {
    //     firebasePromotions
    //         .orderByChild("email")
    //         .equalTo("nghuuton@gmail.com")
    //         .once("value")
    //         .then((snapshot) => {
    //             console.log(snapshot.val());
    //         });
    // }

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

    ressetFormSuccess(type) {
        const newFormdata = { ...this.state.formdata };
        for (let key in this.state.formdata) {
            newFormdata[key].value = "";
            newFormdata[key].valid = false;
            newFormdata[key].validationMessage = "";
        }
        this.setState({
            formError: false,
            formdata: newFormdata,
            formSuccess: type ? "Congratulations" : "Already on the database",
        });
        this.successMessage();
    }

    successMessage() {
        setTimeout(() => {
            this.setState({
                formSuccess: "",
            });
        }, 2000);
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
            firebasePromotions
                .orderByChild("email")
                .equalTo(dataToSubmit.email)
                .once("value")
                .then((snapshot) => {
                    // console.log(snapshot.val());
                    if (snapshot.val() === null) {
                        firebasePromotions.push(dataToSubmit);
                        this.ressetFormSuccess(true);
                    } else {
                        this.ressetFormSuccess(false);
                    }
                });
            // this.ressetFormSuccess();
        } else {
            this.setState({
                formError: true,
            });
        }
    }
    render() {
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <div className="enroll_title">Enter your email</div>
                        <div className="enroll_input">
                            <FormField
                                id={"email"}
                                formdata={this.state.formdata.email}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        {this.state.formError ? (
                            <div className="error_label">
                                Something is wrong, try again.
                            </div>
                        ) : null}
                        <div className="success_label">
                            {this.state.formSuccess}
                        </div>
                        <button onClick={(event) => this.submitForm(event)}>
                            Enroll
                        </button>
                        <div className="enroll_discl">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ratione explicabo ad sequi a consequuntur
                            eaque?
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}

export default Enroll;
