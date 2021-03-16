import Discord, { Channel, TextChannel } from "discord.js";
// import { crawler } from "./crawler";
import AOS from "./setting/AOS";
import WH40K from "./setting/WH40K";
import INF from "./setting/INF";
import Malifaux from "./setting/Malifaux";
import WarMachine from "./setting/WarMachine";
import { PollOpts, PollOptsString, Game, Rule } from "./enum";
import { getSheet } from "./api";

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

  client.on("message", async (msg) => {
    if (!msg.guild || !msg.member) return; // 不是公會、不是會員就不反應
    if (msg.author.bot) return; // 是 Bot 就不反應
    if (isTextCh(msg.channel) === false) return; // 不是文字訊息就不反應
    if (msg.content.substring(0, prefix.length) !== prefix) return; // 沒有前綴詞就不反應

    const authorID = msg.author.id;
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
          break;
        case Rule.stratagem:
          content = wh40k.getCoreStratagem();
          break;
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
    if (firstCMD === Game.Malifaux) {
      const ruleType = otherCmd.join("");
      const inf = new Malifaux();
      let content = {};
      switch (ruleType) {
        case Rule.all:
          content = inf.getRules();
      }
      msg.channel.send(content);
      return;
    }
    if (firstCMD === Game.WarMachine) {
      const ruleType = otherCmd.join("");
      const inf = new WarMachine();
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
      const rawString = otherCmd.join(" ");

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

    if (firstCMD === "新品預購") {
      if (authorID !== Greene) {
        msg.reply("只有 Greene 才能發佈新品預購喔");
        return;
      }

      const rawString = otherCmd.join(" ");

      if (rawString.startsWith("[") === false) return;
      if (rawString.endsWith("]") === false) return;

      const preFormat = rawString.slice(1, -1).split(",");
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
      embed
        .setTitle("來啦！新品預購！")
        .setDescription(
          `
          【注意】
          這是為了讓新品能夠準時在發售日送到指揮官手上的超前部署，我們沒辦法在這個時間點公布商品的價格。所以很介意價格的指揮官，建議等到本週末 GW 在官網公布後再與小丘訂購，可是這樣就會沒辦法在第一時間獲得商品。還請各位指揮官慎重考慮。

          ＊發售時間為下週六＊
          ＊官網限定與 FW 仍沒辦法享有折扣＊
        `
        )
        .setColor("#0099ff")
        .addField("連結", "https://discord.js.org/")
        .addField("選項", content)
        .setFooter(`###今天 ${new Date().getDate()} 號，下午兩點半結單###`);

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
      return;
    }

    if (firstCMD.includes("我")) {
      msg.channel.send(`我不會「${firstCMD.replace("我", "你")}」`);
      return;
    }

    if (firstCMD == "GASAPI測試") {
      const startTime = new Date().getTime();
      msg.reply(`測試開始`);
      await getSheet()
        .then((res) =>
          msg.reply(`測試成功，回傳結果: ${JSON.stringify(res.data)}`)
        )
        .catch((error) => msg.reply(`測試失敗，錯誤訊息: ${error}`));
      const endTime = new Date().getTime();
      msg.reply(`測試結束，間隔${endTime - startTime}毫秒`);
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
