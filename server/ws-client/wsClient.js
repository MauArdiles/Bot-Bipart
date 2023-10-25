const { Client, LocalAuth } = require("whatsapp-web.js");
//const qrcode = require("qrcode-terminal");

class Cliente extends Client {
  constructor() {
    super({
      puppeteer: {
        headless: false,
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
      //qrcode.generate(qr, { small: true });
      console.log("QR RECIBIDO", qr);
    });

    this.on("ready", () => {
      this.status = true;
      console.log("LOGIN EXITOSO");
    });

    this.on("auth_failure", () => {
      this.status = false;
      console.log("ERROR EN EL LOGIN");
    });
  }
}

module.exports = Cliente;
