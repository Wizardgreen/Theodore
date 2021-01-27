import Discord, { Channel, TextChannel } from "discord.js";
import { crawler } from "./crawler";
import AOS from "./setting/AOS";
import WH40K from "./setting/WH40K";

const url =
  "https://www.warhammer-community.com/2021/01/24/sunday-preview-angels-of-darkness/";

const ChannelInfo = {
  wh40k: { id: "799862187015143424" },
  aos: { id: "799881172041072651" },
  test: { id: "802007033493979157" },
};

const prefix = "希爾多 ";

export const awakeTheodore = (key: string) => {
  const client = new Discord.Client();
  const Greene = "219673807202287616";
  const isTextCh = (ch: Channel) => ch.type === "text";

  client.on("ready", () => {
    console.log(`登入成功 ${client.user?.tag}`);
    // (client.channels.cache.find(
    //   ({ id }) => id === ChannelInfo.test.id
    // ) as TextChannel).send("就跟暗黑天使一樣，沒有秘密。");
    // crawler(url);
  });

  const rule = {
    global: "通用規則",
    faction: "陣營規則",
    all: "規則",
  };

  const game = {
    aos: "aos",
    AOS: "AOS",
    wh40k: "40k",
    WH40K: "40K",
  };

  client.on("message", (msg) => {
    if (!msg.guild || !msg.member) return; // 不是公會、不是會員就不反應
    if (msg.member?.user.bot) return; // 是 Bot 就不反應
    if (msg.content.substring(0, prefix.length) !== prefix) return; // 沒有前綴詞就不反應

    const memberID = msg.member?.id;
    const chID = msg.channel.id;
    const cmd = msg.content.substring(prefix.length).split(" ");

    if (isTextCh(msg.channel)) {
      if (cmd[0] === game.aos || cmd[0] === game.AOS) {
        const aos = new AOS();
        let content = {};
        switch (cmd[1]) {
          case rule.faction:
            content = aos.getFactionRules();
            break;
          case rule.global:
            content = aos.getGlobalRules();
            break;
          case rule.all:
            content = aos.getAllRules();
        }
        msg.channel.send(content);
        return;
      }

      if (cmd[0] === game.wh40k || cmd[0] === game.WH40K) {
        const wh40k = new WH40K();
        let content = {};
        switch (cmd[1]) {
          case rule.faction:
            content = wh40k.getFactionRules();
            break;
          case rule.global:
            content = wh40k.getGlobalRules();
            break;
          case rule.all:
            content = wh40k.getAllRules();
        }
        msg.channel.send(content);
        return;
      }
    }

    if (memberID === Greene) {
      switch (cmd[0]) {
        case "給我這個頻道的資料":
          msg.channel.send(`頻道編號：${chID}`);
          break;
        case "我是誰?":
          const id = msg.member?.id;
          msg.reply(id || "不知道");
          break;
        case "你的職責是什麼？":
          msg.reply("剷除腐敗的政權，茁壯星之子的血統！");
          break;
        default:
          break;
      }
    }
  });

  client.login(key);
};
