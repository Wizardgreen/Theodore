export default class WarMachine {
  protected color = "E0CAA1";
  protected prefix = "戰爭機甲";
  protected rules = [{ name: "規則", value: "https://t.ly/kVYb" }];

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
