import Discord, { Channel } from "discord.js";
import auth from "./auth.json";
const client = new Discord.Client();
const meID = "219673807202287616";
const testChID = "802007033493979157";
const isTextCh = (ch: Channel) => ch.type === "text";

client.login(auth.key);

client.on("ready", () => {
  console.log(`登入成功 ${client.user?.tag}`);
});

// const textChannels = client.channels.cache.array()[0];
// console.log(textChannels);
client.on("message", (msg) => {
  const memberID = msg.member?.id;
  const chID = msg.channel.id;
  if (memberID === meID && chID === testChID) {
    if (isTextCh(msg.channel)) {
      msg.channel.send("完成");
    }
  }
});

// client.on("message", (msg) => {
//   if (msg.content === "希爾多，你的職責是什麼？") {
//     msg.reply("剷除腐敗的政權，茁壯星之子的血統！");
//   }
// });

// if (msg.content === "希爾多，我是誰?") {
//   const id = msg.member?.id;
//   msg.reply(id || "不知道");
// }
