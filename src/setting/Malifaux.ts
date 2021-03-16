export default class Malifaux {
  protected color = "E0CAA1";
  protected prefix = "噩夢鎮";
  protected rules = [{ name: "規則", value: "https://t.ly/74mf" }];

  getRules = () => {
    const content = {
      embed: {
        title: this.prefix,
        color: this.color,
        fields: this.rules,
      },
    };
    return content;
  };
}
