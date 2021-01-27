import Action from "./Action";
export default class AOS extends Action {
  protected color = "E0CAA1";
  protected prefix = "席格瑪紀元";
  protected globalRules = [
    { name: "官方中文核心規則", value: "https://t.ly/0FtU", inline: true },
    { name: "中文核心規則整理", value: "https://t.ly/BT2M", inline: true },
    { name: "無盡法術規則整理", value: "https://t.ly/LMHk", inline: true },
    { name: "戰鬥界域規則整理", value: "https://t.ly/kV6F", inline: true },
    { name: "模型底盤大小", value: "https://is.gd/SaZ3y4", inline: true },
    { name: "競技模式", value: "https://t.ly/k14H", inline: true },
  ];
  protected factionRules = [
    { name: "秩序", value: "https://t.ly/as4z", inline: true },
    { name: "渾沌", value: "https://t.ly/ekVB", inline: true },
    { name: "\u200B", value: "\u200B", inline: true },
    { name: "死亡", value: "https://t.ly/BEgg", inline: true },
    { name: "毀滅", value: "https://t.ly/uPQK", inline: true },
    { name: "\u200B", value: "\u200B", inline: true },
  ];
}
