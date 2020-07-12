import React from "react";
import { Link, useHistory } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { firebase } from "../../../firebase.js";

const AdminNav = () => {
    const history = useHistory();
    const links = [
        {
            title: "Matches",
            linkTo: "/admin-matches",
        },
        {
            title: "Add Match",
            linkTo: "/admin-matches/edit-match",
        },
        {
            title: "Players",
            linkTo: "/admin-players",
        },
        {
            title: "Add Player",
            linkTo: "/admin-players/add-players",
        },
    ];

    const style = {
        color: "#ffffff",
        fontWeight: "300",
        borderBottom: "1px solid #353535",
    };

    const renderItems = () =>
        links.map((link) => (
            <Link key={link.title} to={link.linkTo}>
                <ListItem style={style}>{link.title}</ListItem>
            </Link>
        ));

    const logout = () => {
        firebase
            .auth()
            .signOut()
            .then(
                () => {
                    console.log("Log out successfull !");
                    history.push("/sign-in");
                },
                (err) => {
                    console.log("Error log out");
                }
            );
    };

    return (
        <div>
            {renderItems()}
            <ListItem button style={style} onClick={() => logout()}>
                Log out
            </ListItem>
        </div>
    );
};

export default AdminNav;
