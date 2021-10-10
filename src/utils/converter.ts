// Heavily inspired from https://github.com/Microsoft/TypeScript/issues/1897#issuecomment-338650717
type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap {
  [key: string]: AnyJson;
}
interface JsonArray extends Array<AnyJson> {}

function tsTypeToDartType(tsType: string): string {
  switch (tsType) {
    case "string":
      return "String";
    case "boolean":
      return "bool";
    case "number":
      return "double";
    default:
      return "unknown";
  }
}

export function convert2Dart(
  rawInput: string,
  className: string = "Generated"
): string {
  const jsonObj: AnyJson = JSON.parse(rawInput);
  let elements = Array<{ variable: string; type: string }>();
  Object.keys(jsonObj).forEach((key, i) => {
    const elem = { variable: key, type: tsTypeToDartType(typeof jsonObj[key]) };
    elements.push(elem);
  });

  return `class ${className} {
${elements.map((e) => `  final ${e.type} ${e.variable};`).join("\n")}
  
  const ${className}({
${elements.map((e) => `    required this.${e.variable};`).join("\n")}
  });

  factory ${className}.fromJson(Map<String, dynamic> json) {
    return ${className}(
${elements
  .map((e) => `      ${e.variable}: json['${e.variable}'] as ${e.type},`)
  .join("\n")}
    );
  }

  Map<String, dynamic> toJson() {
    return {
${elements.map((e) => `      '${e.variable}': this.${e.variable},`).join("\n")}
    };
  }
}`;
}
