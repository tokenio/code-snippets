import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import './App.css';

const { SANDBOX, PRODUCTION } = require('./env');
const { TokenClient } = require('@token-io/tpp');

export default class NewMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: false,
            form: {
                env: SANDBOX,
                alias: '',
                publicKeyLow: '',
                privateKeyLow: '',
                publicKeyStandard: '',
                privateKeyStandard: '',
                publicKeyPrivileged: '',
                privateKeyPrivileged: '',
            },
            memberId: '',
        };
    }

    isValid = () => {
        return Object.values(this.state.form).reduce((prev, curr) => prev && !!curr, true);
    };

    handleChange = (event) => {
        this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value,
            },
        }, () => this.setState({ isValid: this.isValid() }));
    };

    handleClick = async () => {
        const TokenTpp = new TokenClient({ env: this.state.form.env });

        const GLOBAL_ALIAS = {
            type: 'DOMAIN',
            value: this.state.form.alias,
        };

        // Will need 3 distinct keys
        await TokenTpp.ManualCryptoEngine.setKeys([
            {
                'publicKey': this.state.form.publicKeyLow,
                'privateKey': this.state.form.privateKeyLow,
                'level': 'LOW',
            },
            {
                'publicKey': this.state.form.publicKeyStandard,
                'privateKey': this.state.form.privateKeyStandard,
                'level': 'STANDARD',
            },
            {
                'publicKey': this.state.form.publicKeyPrivileged,
                'privateKey': this.state.form.privateKeyPrivileged,
                'level': 'PRIVILEGED',
            },
        ]);

        // Create a member with keys stored in memory
        const member = await TokenTpp.createMember(GLOBAL_ALIAS, TokenTpp.ManualCryptoEngine);

        this.setState({
            memberId: member.memberId(),
        });
    };

    render() {
        return (
            <div className={'GenerateKeys'}>
                <form>
                    <FormControl fullWidth>
                        <h2>Create New Member</h2>

                        <Grid item container xs={12}>
                            <Grid item xs={2} />
                            <Grid item container xs={8} spacing={4} justify={'center'}>
                                <Grid item xs={6}>
                                    <TextField label="Public Key Low"
                                               value={this.state.form.publicKeyLow}
                                               name="publicKeyLow"
                                               onChange={this.handleChange}
                                               fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Private Key Low"
                                               value={this.state.form.privateKeyLow}
                                               name="privateKeyLow"
                                               onChange={this.handleChange}
                                               fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Public Key Standard"
                                               value={this.state.form.publicKeyStandard}
                                               name="publicKeyStandard"
                                               onChange={this.handleChange}
                                               fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Private Key Standard"
                                               value={this.state.form.privateKeyStandard}
                                               name="privateKeyStandard"
                                               onChange={this.handleChange}
                                               fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Public Key Privileged"
                                               value={this.state.form.publicKeyPrivileged}
                                               name="publicKeyPrivileged"
                                               onChange={this.handleChange}
                                               fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Private Key Privileged"
                                               value={this.state.form.privateKeyPrivileged}
                                               name="privateKeyPrivileged"
                                               onChange={this.handleChange}
                                               fullWidth />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="env-select-label">Environment</InputLabel>
                                        <Select
                                            labelId="env-select-label"
                                            id="env-select"
                                            name="env"
                                            value={this.state.form.env}
                                            onChange={this.handleChange}>
                                            <MenuItem value={SANDBOX}>Sandbox</MenuItem>
                                            <MenuItem value={PRODUCTION}>Production</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField label="Alias" value={this.state.form.alias}
                                               name="alias"
                                               onChange={this.handleChange}
                                               fullWidth />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary"
                                            onClick={this.handleClick}
                                            disabled={!this.state.isValid}>Create</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </FormControl>
                </form>
                <Divider className={'divider'} />
                {this.state.memberId && (
                    <Grid container item xs={12} spacing={4} justify={'center'}>
                        <Grid item xs={12} lg={8}>
                            <Input id="memberId" value={this.state.memberId} fullWidth />
                            <FormHelperText id="memberId">Your new member Id.</FormHelperText>
                        </Grid>
                    </Grid>
                )}
            </div>
        );
    }
};
