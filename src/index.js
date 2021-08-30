const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

require('colors');

const app = express();
app.use(bodyParser.json());


app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    switch (type){
        case "CommentCreated": {
            console.log(`Received event: type: ${req.body.type} data: ${JSON.stringify(req.body.data)}`.bgYellow.black);
            try {
                console.log(`Echo event: type: "CommentModerated" data: ${JSON.stringify(data)}`.bgYellow.black);
                const status = data.content.includes('orange') ? "rejected" : "approved"
                await axios.post("http://localhost:4005/events", {
                    type: "CommentModerated",
                    data: {
                        ...data,
                        status
                    }
                })
            } catch (e) {
                console.error(`${e.message}`.bgRed.black);
            }
            break;
        }
    }
    res.send({});
})

app.listen(4003, () => {
    console.info("\n" +
        "███    ███  ██████  ██████  ███████ ██████   █████  ████████ ██  ██████  ███    ██       ███████ ███████ ██████  ██    ██ ██  ██████ ███████ \n" +
        "████  ████ ██    ██ ██   ██ ██      ██   ██ ██   ██    ██    ██ ██    ██ ████   ██       ██      ██      ██   ██ ██    ██ ██ ██      ██      \n" +
        "██ ████ ██ ██    ██ ██   ██ █████   ██████  ███████    ██    ██ ██    ██ ██ ██  ██ █████ ███████ █████   ██████  ██    ██ ██ ██      █████   \n" +
        "██  ██  ██ ██    ██ ██   ██ ██      ██   ██ ██   ██    ██    ██ ██    ██ ██  ██ ██            ██ ██      ██   ██  ██  ██  ██ ██      ██      \n" +
        "██      ██  ██████  ██████  ███████ ██   ██ ██   ██    ██    ██  ██████  ██   ████       ███████ ███████ ██   ██   ████   ██  ██████ ███████ \n" +
        "                                                                                                                                             \n" +
        "                                                                                                                                             \n");
    console.info('Listening on 4003'.bgGreen.black);
})