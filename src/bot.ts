import Discord, { Channel, TextChannel } from "discord.js";
// import { crawler } from "./crawler";
import AOS from "./setting/AOS";
import WH40K from "./setting/WH40K";
import INF from "./setting/INF";
import { PollOpts, PollOptsString, Game, Rule } from "./enum";

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
    // ) as TextChannel).send("0");
  });
  // crawler(url);

  client.on("message", (msg) => {
    if (!msg.guild || !msg.member) return; // 不是公會、不是會員就不反應
    if (msg.member?.user.bot) return; // 是 Bot 就不反應
    if (isTextCh(msg.channel) === false) return; // 不是文字訊息就不反應
    if (msg.content.substring(0, prefix.length) !== prefix) return; // 沒有前綴詞就不反應

    const memberID = msg.member?.id;
    const chID = msg.channel.id;
    const [firstCMD, ...otherCmd] = msg.content
      .substring(prefix.length)
      .split(" ");

    if (firstCMD === Game.aos || firstCMD === Game.AOS) {
      const ruleType = otherCmd.join("");
      const aos = new AOS();
      let content = {};
      switch (ruleType) {
        case Rule.faction:
          content = aos.getFactionRules();
          break;
        case Rule.global:
          content = aos.getGlobalRules();
          break;
        case Rule.all:
          content = aos.getAllRules();
      }
      msg.channel.send(content);
      return;
    }

    if (firstCMD === Game.wh40k || firstCMD === Game.WH40K) {
      const ruleType = otherCmd.join("");
      const wh40k = new WH40K();
      let content = {};
      switch (ruleType) {
        case Rule.faction:
          content = wh40k.getFactionRules();
          break;
        case Rule.global:
          content = wh40k.getGlobalRules();
          break;
        case Rule.all:
          content = wh40k.getAllRules();
      }
      msg.channel.send(content);
      return;
    }

    if (firstCMD === Game.inf || firstCMD === Game.INF) {
      const ruleType = otherCmd.join("");
      const inf = new INF();
      let content = {};
      switch (ruleType) {
        case Rule.all:
          content = inf.getRules();
      }
      msg.channel.send(content);
      return;
    }

    if (firstCMD === "指令") {
      msg.channel.send({
        embed: {
          title: "指令集",
          fields: [
            {
              name: "遊戲規則",
              value: `
              指令:[遊戲名稱] [規則/陣營規則/通用規則]
              範例:"AOS 陣營規則"
              `,
            },
            {
              name: "發起投票",
              value: `
              指令:投票 [選項A,選項B,...目前最多支援26個選項]
              `,
            },
          ],
        },
      });
      return;
    }

    if (firstCMD === "投票" && otherCmd) {
      const rawString = otherCmd.join("");

      if (rawString[0] !== "[") return;
      if (rawString[rawString.length - 1] !== "]") return;

      const preFormat = rawString.slice(1, rawString.length - 1).split(",");
      const options = Array.from(new Set(preFormat)).filter(
        (opt) => opt !== "" && opt !== ","
      );

      if (options.length < 2 || options.length > 26) return;

      const getUppercase = (idx: number) =>
        String.fromCharCode(65 + idx) as PollOptsString;

      const content = options.map((option, idx) => {
        return `${PollOpts[getUppercase(idx)]} - ${option}`;
      });

      const embed = new Discord.MessageEmbed();
      embed.setTitle("發起投票").addField("選項", content);

      msg.channel
        .send(embed)
        .then((embedMsg) => {
          content.forEach((_, idx) => {
            embedMsg.react(PollOpts[getUppercase(idx)]);
          });
        })
        .catch(console.error);
      return;
    }

    if (firstCMD === "新品預購" && otherCmd) {
      if (memberID !== Greene) {
        msg.reply("只有 Greene 才能發佈新品預購喔");
        return;
      }

      const rawString = otherCmd.join("");

      if (rawString[0] !== "[") return;
      if (rawString[rawString.length - 1] !== "]") return;

      const preFormat = rawString.slice(1, rawString.length - 1).split(",");
      const options = Array.from(new Set(preFormat)).filter(
        (opt) => opt !== "" && opt !== ","
      );

      if (options.length < 2 || options.length > 26) return;

      const getUppercase = (idx: number) =>
        String.fromCharCode(65 + idx) as PollOptsString;

      const content = options.map((option, idx) => {
        return `${PollOpts[getUppercase(idx)]} - ${option}`;
      });

      const embed = new Discord.MessageEmbed();
      embed.setTitle("來啦！是新品預購！").addField("選項", content);

      msg.channel
        .send(embed)
        .then((embedMsg) => {
          msg.delete(); // 刪除發出命令的訊息 保持畫面乾淨
          content.forEach((_, idx) => {
            embedMsg.react(PollOpts[getUppercase(idx)]);
          });
        })
        .catch(console.error);
      return;
    }

    if (firstCMD === "還不快歡呼") {
      msg.channel.send("Yeeeeeeah!");
    }

    if (firstCMD.includes("我")) {
      msg.channel.send(`我不會「${firstCMD.replace("我", "你")}」`);
      return;
    }
    msg.channel.send(`我不會「${firstCMD}」`);

    // switch (firstCMD) {
    //   case "給我這個頻道的資料":
    //     msg.channel.send(`頻道編號：${chID}`);
    //     break;
    //   case "我是誰?":
    //     const id = msg.member?.id;
    //     msg.reply(id || "不知道");
    //     break;
    //   case "你的職責是什麼？":
    //     msg.reply("剷除腐敗的政權，茁壯星之子的血統！");
    //     break;
    //   default:
    //     break;
    // }
    // }
  });

  client.on("messageReactionAdd", (react) => {
    const reactionCount = react.count;
    if (reactionCount === 1) return; // 第一個是希爾多的, 不用反應

    const identifier = react.emoji.id || react.emoji.name;
    const userNameList = react.users.cache
      .array()
      .map(({ username }) => username)
      .join(",");
  });

  client.login(key);
};
