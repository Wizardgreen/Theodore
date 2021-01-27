import Action from "./Action";

export default class WH40k extends Action {
  protected color = "5A7D91";
  protected prefix = "40K";
  protected globalRules = [
    { name: "簡易核心規則(上)", value: "https://t.ly/FCmC", inline: true },
    { name: "簡易核心規則(下)", value: "https://t.ly/TW3B", inline: true },
    { name: "\u200B", value: "\u200B", inline: true },
    { name: "官方中文核心規則", value: "https://t.ly/NMsB", inline: true },
    { name: "官方英文核心規則", value: "https://is.gd/UlGefN", inline: true },
    { name: "\u200B", value: "\u200B", inline: true },
  ];
  protected factionRules = [
    { name: "帝國", value: "https://t.ly/CyMV", inline: true },
    { name: "渾沌", value: "https://t.ly/E5Be", inline: true },
    { name: "異星人", value: "https://t.ly/qXXG", inline: true },
  ];
}
