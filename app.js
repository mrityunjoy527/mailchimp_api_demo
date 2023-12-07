import express from "express";
import bodyParser from "body-parser";
import path from "path";
import https from "https";

const __dirname = path.resolve();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us13.api.mailchimp.com/3.0/lists/36c323b457";
  const options = {
    method: "POST",
    auth: "mrityunjoy:6572649024875ee01b875c6b7a32984-us13",
  };
  const request = https.request(url, options, function (response) {
    if(response.statusCode == 200) {
        res.sendFile(__dirname+'/success.html');
    }else {
        res.sendFile(__dirname+'/fail.html');
    }
    // response.on("data", function (data) {
    //   console.log(JSON.parse(data));
    // });
  });
  request.write(jsonData);
  request.end();
});

app.get('/failed', function(req, res) {
    res.redirect('/');
})

app.listen(8000, function () {
  console.log("Server running at port 8000");
});
