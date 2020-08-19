import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { Component } from 'react';
import './App.css';
import GenerateKeys from './Keys';
import NewMember from './NewMember';
import SignPayload from './SignPayload';
import VerifySignature from './VerifySignature';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { tabIndex: 0 };
    }

    handleChange = (event, newValue) => {
        this.setState({ tabIndex: newValue });
    };

    render() {
        return (
            <div className={'App'}>
                <AppBar position="static" color={'default'}>
                    <Tabs value={this.state.tabIndex} onChange={this.handleChange}
                          aria-label="tabs">
                        <Tab label="Generate Keys" id={0} />
                        <Tab label="Create New Member" id={1} />
                        <Tab label="Sign Payload" id={2} />
                        <Tab label="Verify Signature" id={3} />
                    </Tabs>
                </AppBar>
                <div hidden={this.state.tabIndex !== 0}>
                    <GenerateKeys />
                </div>
                <div hidden={this.state.tabIndex !== 1}>
                    <NewMember />
                </div>
                <div hidden={this.state.tabIndex !== 2}>
                    <SignPayload />
                </div>
                <div hidden={this.state.tabIndex !== 3}>
                    <VerifySignature />
                </div>
            </div>
        );
    }
};
