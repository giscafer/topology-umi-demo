const { exec, echo } = require("shelljs");
require("./copy-cname");
require("./spa-gh-pages");

exec("surge dist umi.leekhub.com");

echo("Docs deployed!!");
