import React, {useState }from 'react';
import './App.css';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
const {Wit, log} = require('node-wit');

const client = new Wit({
    accessToken: 'FWAO7LFKNRQ567KDD2J2CLNOZJRCTCWX',
    logger: new log.Logger(log.DEBUG) // optional
});

const useStyles = makeStyles((theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
        root: {
            flexGrow: 1,
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '60ch',
            },
        },
    }),
);

const initState = {
    utterance: '',
    answer: ''
}

function App() {
    const classes = useStyles();
    const [state, setState] = useState(initState);

    const handleChange = (e) => setState({ utterance: e.target.value});

    const handleButton = (e) => {
            e.preventDefault()
            console.log(state.utterance);
            //alert(JSON.stringify(state.utterance));

        client.message(JSON.stringify(state.utterance), {})
            .then((data) => {
                setState({answer: JSON.stringify(data)})
               // setState({utterance: ''})
            })
            .catch(console.error);

        };

    return (
        <div className="App">
            <h1>Montgomery Now - Effective Information for your Now needs.</h1>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                        id="WitAIUtteranceText"
                        label="Tell What your Now need is ?"
                        rowsMax={4}
                        value={state.utterance || ""}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button className={classes.button} variant="contained"
                                color="secondary"
                                endIcon={<Icon>send</Icon>}
                        onClick={handleButton}>Ask Now !</Button>;
                    </Grid>
                    <Grid item xs={12}>
                       Answer {state.answer}
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default App;
