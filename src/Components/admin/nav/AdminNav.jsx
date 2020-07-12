import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { firebase } from "../../../firebase.js";

const AdminNav = () => {
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
            <Link key={link.title} to={link.linkTo} style={style}>
                <ListItem>{link.title}</ListItem>
            </Link>
        ));

    const logout = () => {
        firebase
            .auth()
            .signOut()
            .then(
                () => console.log("Log out successfull !"),
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
