import React, { Component } from "react";
import PlayerCard from "../ui/playerCard";
import Fade from "react-reveal/Fade";

import Stripes from "../../Resources/images/stripes.png";
import { firebasePlayers, firebase } from "../../firebase";
import { firebaseLooper, reverseArray } from "../ui/misc";
import { Promise } from "core-js";

class TheTeam extends Component {
    state = {
        loading: true,
        player: [],
    };

    componentDidMount() {
        firebasePlayers.once("value").then((snapshot) => {
            const players = firebaseLooper(snapshot);
            const promises = [];
            for (let key in players) {
                // console.log(key);
                promises.push(
                    new Promise((resolve, reject) => {
                        firebase
                            .storage()
                            .ref("players")
                            .child(players[key].image)
                            .getDownloadURL()
                            .then((url) => {
                                players[key].url = url;
                                resolve();
                            });
                    })
                );
                Promise.all(promises).then(() => {
                    this.setState({
                        loading: false,
                        players,
                    });
                });
            }
            this.setState({
                players: reverseArray(players),
            });
        });
    }

    showplayersByCategory = (category) =>
        this.state.players
            ? this.state.players.map((player, i) => {
                  return player.position === category ? (
                      <Fade left key={i}>
                          <div className="item">
                              <PlayerCard
                                  number={player.number}
                                  name={player.name}
                                  lastname={player.lastname}
                                  bck={player.url}
                              />
                          </div>
                      </Fade>
                  ) : null;
              })
            : null;

    render() {
        // console.log(this.state.players);
        return (
            <div
                className="the_team_container"
                style={{ background: `url(${Stripes})` }}
            >
                {!this.state.loading ? (
                    <div>
                        <div className="team_category_wrapper">
                            <div className="title">Keeper</div>
                            <div className="team_cards">
                                {this.showplayersByCategory("Keeper")}
                            </div>
                            <div className="title">Defence</div>
                            <div className="team_cards">
                                {this.showplayersByCategory("Defence")}
                            </div>
                            <div className="title">Midfield</div>
                            <div className="team_cards">
                                {this.showplayersByCategory("Midfield")}
                            </div>
                            <div className="title">Striker</div>
                            <div className="team_cards">
                                {this.showplayersByCategory("Striker")}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default TheTeam;
