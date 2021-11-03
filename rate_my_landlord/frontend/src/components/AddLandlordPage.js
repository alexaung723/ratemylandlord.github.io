import React, { Component } from 'react';
import { Button, Grid, FormHelperText, FormControl, TextField, Typography, Snackbar } from '@material-ui/core';
import { Link } from "react-router-dom";

export default class AddLandlordPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            showSuccessToast: false,
            successToastMessage: "",
            showFailureToast: false,
        };
    }

    handleFirstNameChange = (e) => {
        this.setState({
            firstName: e.target.value,
        });
    }

    handleLastNameChange = (e) => {
        this.setState({
            lastName: e.target.value,
        });
    }

    handleSubmit = () => {
        const { firstName, lastName } = this.state;
        if (firstName === "" || lastName === "") {
            this.setState({
                showFailureToast: true,
            })
        } else {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                })
            };
            fetch("api/create-landlord", requestOptions)
                .then((response) => response.json())
                .then((data) => this.showSuccessToast(data));
        }
    }

    showSuccessToast = (data) => {
        const { firstName, lastName } = this.state;
        this.setState({
            showSuccessToast: true,
            successToastMessage: "Successfully submitted landlord " + firstName + " " + lastName,
        })
    }

    hideSuccessToast = () => {
        this.setState({
            showSuccessToast: false,
        })
    }
    hideFailureToast = () => {
        this.setState({
            showFailureToast: false,
        })
    }

    render() {
        return (
            <React.Fragment>
                <Snackbar open={this.state.showSuccessToast} autoHideDuration={6000} 
                    message={this.state.successToastMessage} onClose={this.hideSuccessToast}/>
                <Snackbar open={this.state.showFailureToast} autoHideDuration={6000} 
                    message="Unable to submit new landlord. Please make sure you have filled out all required fields."
                    onClose={this.hideFailureToast}></Snackbar>
                <Grid container spacing={1}>
                    <Grid item xs={12} align="center">
                        <Typography component='h4' variant="h4">
                            Add New Landlord
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField required type="string" inputProps={{style: {textAlign: "center"}}} onChange={this.handleFirstNameChange} />
                            <FormHelperText>
                                <div align="center">First Name</div>
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField required type="string" inputProps={{style: {textAlign: "center"}}} onChange={this.handleLastNameChange} />
                            <FormHelperText>
                                <div align="center">Last Name</div>
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button color="primary" variant="contained" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button color="secondary" variant="contained" to="/" component={Link}>
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}