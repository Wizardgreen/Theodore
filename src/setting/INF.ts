export default class INF {
  protected color = "E0CAA1";
  protected prefix = "無限戰爭";
  protected rules = [{ name: "規則集", value: "https://t.ly/UnZC" }];

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
