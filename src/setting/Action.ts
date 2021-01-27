interface Field {
  name: string;
  value: string;
  inline?: boolean;
}

enum TitleTypes {
  faction = "faction",
  global = "global",
  all = "all",
}
interface TitleMap {
  faction: string;
  global: string;
  all: string;
  [key: string]: string;
}

export default abstract class Action {
  protected abstract color: string;
  protected abstract prefix: string;
  protected abstract globalRules: Field[];
  protected abstract factionRules: Field[];
  private titleMap: TitleMap = {
    faction: "陣營規則",
    global: "通用規則",
    all: "全部規則",
  };

  private getTitle(key: TitleTypes): string {
    return `${this.prefix} ${this.titleMap[key]}`;
  }

  getFactionRules() {
    const content = {
      embed: {
        title: this.getTitle(TitleTypes.faction),
        color: this.color,
        fields: this.factionRules,
      },
    };
    return content;
  }

  getGlobalRules() {
    const content = {
      embed: {
        title: this.getTitle(TitleTypes.global),
        color: this.color,
        fields: this.globalRules,
      },
    };
    return content;
  }

  getAllRules() {
    const content = {
      embed: {
        title: this.getTitle(TitleTypes.all),
        color: this.color,
        fields: [
          { name: "\u200B", value: this.titleMap.global },
          ...this.globalRules,
          { name: "\u200B", value: this.titleMap.faction },
          ...this.factionRules,
        ],
      },
    };
    return content;
  }
}
