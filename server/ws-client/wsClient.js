const { Client, LocalAuth } = require("whatsapp-web.js");
const qr = require("qrcode");

class Cliente extends Client {
  constructor() {
    super({
      puppeteer: {
        //executablePath: "/usr/bin/google-chrome-stable", solo para docker
        headless: "new",
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--unhandled-rejections=strict",
          "--enable-gpu",
        ],
        //ignoreDefaultArgs: ["--disable-extensions"],
      },
      authStrategy: new LocalAuth({
        clientId: "bipart",
      }),
    });

    // this.initialize();

    // this.on("qr", (qr) => {
    //   console.log("QR CREADO");
    //   this.generateQR(qr);
    // });

    // this.on("ready", () => {
    //   this.status = true;
    //   console.log("LOGIN EXITOSO");
    // });

    // this.on("auth_failure", () => {
    //   this.status = false;
    //   console.log("ERROR EN EL LOGIN");
    // });
  }
}

module.exports = Cliente;
