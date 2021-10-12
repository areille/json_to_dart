// https://github.com/Microsoft/TypeScript/issues/1897#issuecomment-822032151
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

interface DartClass {
  name: string;
  variables: {
    name: string;
    type: string;
  }[];
}

function extractClasses(json: JSONValue, className: string): DartClass[] {
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
        } else {
          type = "double";
        }
        break;
      default:
        // Case complex type
        const className = key.charAt(0).toUpperCase() + key.slice(1);
        if (Array.isArray(json[key])) {
          const firstElem = (json[key] as JSONValue[])[0];
          switch (typeof firstElem) {
            case "string":
              type = "List<String>";
              break;
            case "boolean":
              type = "List<bool>";
              break;
            case "number":
              if (firstElem % 1 === 0) {
                type = "List<int>";
              } else {
                type = "List<double>";
              }
              break;
            default:
              type = `List<${className}>`;
              classes = [...extractClasses(firstElem, className), ...classes];
              break;
          }
        } else {
          type = className;
          classes = [...extractClasses(json[key], className), ...classes];
        }
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
  const jsonObj: JSONValue = JSON.parse(rawInput);
  const classes = extractClasses(jsonObj, className);
  let result = "";

  for (let i = 0; i < classes.length; i++) {
    result += writeClass(classes[i]);
  }

  return result;
}
