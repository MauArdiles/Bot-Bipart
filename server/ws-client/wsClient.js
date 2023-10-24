const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

class Cliente extends Client {
  constructor() {
    super({
      puppeteer: {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--unhandled-rejections=strict",
          "--enable-gpu",
        ],
        ignoreDefaultArgs: ["--disable-extensions"],
      },
      authStrategy: new LocalAuth({
        clientId: "bipart",
      }),
    });

    this.initialize();

    this.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
      //console.log("QR RECEIVED", qr);
    });

    this.on("ready", () => {
      this.status = true;
      console.log("Login Exitoso");
    });

    this.on("auth_failure", () => {
      this.status = false;
      console.log("Login Fallido");
    });
  }
}

module.exports = Cliente;
