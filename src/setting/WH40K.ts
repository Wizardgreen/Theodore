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
  protected coreStratagem = [
    {
      name: "指揮重擲 Command Re-Roll",
      cost: "1",
      des: `當你做出命中骰、造傷骰、傷害骰、保護骰、突進骰、衝鋒骰、靈能測試、反制巫術測試或你需要用擲骰決定攻擊次數的武器時，你就可以使用此策略，重作一次該擲骰或測試。`,
    },
    {
      name: "解決他們 Cut Them Down",
      cost: "1",
      des: `在敵人單位進行"撤退"時使用此"策略"，在任何模型移動前，為每個你與該敵方單位"接戰距離"內的模型擲一個 D6，每一個為 6 的結果使該敵方單位受到 1 致命傷害。`,
    },
    {
      name: "絕境逃生 Desperate Breakout",
      cost: "2",
      des: `在你的"移動階段"使用此策略，選擇一個你在接戰範圍內有敵軍且本回合還沒移動過的模型，為該單位中每個模型擲一個 D6，每一個為 1 的結果，移除該單位中的一個模型。假設該單位沒有因此被摧毀，即可忽視敵軍的存在、跨越敵軍進行"撤退"。如果該單位有任何模型結束撤退時，停在敵軍的接戰範圍內，該模型就會被視為摧毀。若單位倖存，那麼該單位在本回合無法做任何行為(像是施展靈能、射擊、宣告衝鋒、選擇近戰等行為)，就算該單位有任何規則能使其在撤退後行動，也會變成不行。`,
    },
    {
      name: "緊急逃脫 Emergency Disembarkation",
      cost: "1",
      des: `
        當一個你的"運輸"模型被摧毀時。在模型被從戰場上移除前，所有乘坐在內的模型可以放置在被摧毀模型的 6 吋內，取代原本被摧毀模型的 3 吋。這些逃脫的單位並不會受到被摧毀模型的"爆炸"能力(或類似) - 但你必須為每個剛設置在戰場上的模型投 D6 骰。
        取代一般"逃脫測試" - 每擲出一個 1 要自行選擇殺死一隻模型；使用此策略後的"逃脫測試"每個擲出的 1 或 2 要自行選擇殺死一隻模型。此外，"緊急逃脫"的模型並不能在他們從被摧毀"運輸"模型中逃脫的同一回合進行 "衝鋒" 或 "英勇介入"。`,
    },
    {
      name: "堅守射擊 Fire Overwatch",
      cost: "1",
      des: `在敵人宣告對你的一或多個單位進行"衝鋒"時可以使用此策略，一個被選擇為目標的單位可以在"衝鋒"前進行"堅守射擊"。`,
    },
    {
      name: "反擊 Counter-Offensive",
      cost: "2",
      des: `在一個敵方單位進行近戰攻擊完畢後可使用此策略，選擇一個你可以進行近戰攻擊的單位立即進行攻擊。`,
    },
    {
      name: "超常勇氣 Insane Bravery",
      cost: "2",
      des: `在你的一個單位需要進行"士氣測試"時可以使用此策略，這個"士氣測試"會自動通過(不須擲任何骰子)，你只能在一場戰鬥中使用此策略一次。`,
    },
  ];

  getCoreStratagem() {
    const content = {
      embed: {
        title: "核心策略",
        color: this.color,
        fields: this.coreStratagem.map(({ name, cost, des }) => {
          return {
            name: `${name} - ${cost}CP`,
            value: des,
          };
        }),
      },
    };
    return content;
  }
}
