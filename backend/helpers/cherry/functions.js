const axios = require("axios");

exports.delay = time => new Promise(resolve => setTimeout(resolve, time));

const doubleDigits = n =>
  n.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

exports.getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = doubleDigits(date.getMonth() + 1);
  const day = doubleDigits(date.getDate());
  return `${year}-${month}-${day}`;
};

exports.getToken = async () => {
  if (fs.existsSync("./token.json")) {
    const { token, expires } = JSON.parse(fs.readFileSync("./token.json"));
    if (token && new Date(expires).getTime() > Date.now()) {
      return token;
    }
  }
  const res = await axios.post("https://back.digibox.team/users/login", {
    username: "yinon",
    password: "1q2w3e4r5t123123"
  });
  const { token } = res.data;
  const data = { token, expires: new Date(Date.now() + 3600000) };
  fs.writeFileSync("./token.json", JSON.stringify(data));
  return token;
};

exports.encodeKey = key => Buffer.from(key + ":").toString("base64");
