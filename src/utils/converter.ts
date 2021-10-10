// Heavily inspired from https://github.com/Microsoft/TypeScript/issues/1897#issuecomment-338650717
type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap {
  [key: string]: AnyJson;
}
interface JsonArray extends Array<AnyJson> {}

interface DartClass {
  name: string;
  variables: {
    name: string;
    type: string;
  }[];
}

function extractClasses(json: AnyJson, className: string): DartClass[] {
  let classes = Array<DartClass>();
  let newClass: DartClass = {
    name: className,
    variables: [],
  };
  Object.keys(json).forEach((key) => {
    let name: string, type: string;
    name = key;
    switch (typeof json[key]) {
      case "string":
        type = "String";
        break;
      case "boolean":
        type = "bool";
        break;
      case "number":
        if (<number>json[key] % 1 === 0) {
          type = "int";
          break;
        } else {
          type = "double";
          break;
        }
      default:
        // Case complex type
        const className = key.charAt(0).toUpperCase() + key.slice(1);
        type = key.charAt(0).toUpperCase() + key.slice(1);
        classes = [...extractClasses(json[key], className), ...classes];
        break;
    }
    newClass.variables.push({ name, type });
  });
  classes.push(newClass);
  return classes;
}

function writeClass(dClass: DartClass): string {
  return `class ${dClass.name} {
${dClass.variables.map((v) => `  final ${v.type} ${v.name};`).join("\n")}
            
  const ${dClass.name}({
${dClass.variables.map((v) => `    required this.${v.name};`).join("\n")}
  });
          
  factory ${dClass.name}.fromJson(Map<String, dynamic> json) {
    return ${dClass.name}(
${dClass.variables
  .map((v) => `      ${v.name}: json['${v.name}'] as ${v.type},`)
  .join("\n")}
    );
  }
          
  Map<String, dynamic> toJson() {
    return {
${dClass.variables.map((v) => `      '${v.name}': this.${v.name},`).join("\n")}
    };
  }
}
          
`;
}

export function convert2Dart(
  rawInput: string,
  className: string = "Generated"
): string {
  const jsonObj: AnyJson = JSON.parse(rawInput);
  const classes = extractClasses(jsonObj, className);
  console.log(classes);
  let result = "";

  for (let i = 0; i < classes.length; i++) {
    result += writeClass(classes[i]);
  }

  return result;
}
