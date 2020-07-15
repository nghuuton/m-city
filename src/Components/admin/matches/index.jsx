import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../Hoc/AdminLayout";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import { firebaseMatches } from "../../../firebase";
import { firebaseLooper, reverseArray } from "../../ui/misc";

class AdminMatches extends Component {
    state = {
        isloading: true,
        matches: [],
    };

    componentDidMount() {
        firebaseMatches
            .once("value")
            .then((snapshot) => {
                const matches = firebaseLooper(snapshot);
                this.setState({
                    isloading: false,
                    matches: reverseArray(matches),
                });
            })
            .catch((err) => {});
    }

    render() {
        const { isloading, matches } = this.state;
        return (
            <AdminLayout>
                <div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Matche</TableCell>
                                    <TableCell>Result</TableCell>
                                    <TableCell>Final</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {matches
                                    ? matches.map((match, i) => (
                                          <TableRow key={i}>
                                              <TableCell>
                                                  {match.date}
                                              </TableCell>
                                              <TableCell>
                                                  <Link
                                                      to={`/admin-matches/edit-match/${match.id}`}
                                                  >
                                                      {match.away}
                                                      <strong> - </strong>
                                                      {match.local}
                                                  </Link>
                                              </TableCell>
                                              <TableCell>
                                                  {match.resultAway}
                                                  <strong> - </strong>
                                                  {match.resultLocal}
                                              </TableCell>
                                              <TableCell>
                                                  {match.final === "Yes" ? (
                                                      <span className="matches_tag_red">
                                                          Final
                                                      </span>
                                                  ) : (
                                                      <span className="matches_tag_green">
                                                          Not played yet
                                                      </span>
                                                  )}
                                              </TableCell>
                                          </TableRow>
                                      ))
                                    : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="admin_progress">
                        {isloading ? (
                            <CircularProgress
                                thickness={7}
                                style={{ color: "#98c5e9" }}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AdminMatches;
