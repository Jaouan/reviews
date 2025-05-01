import lucene from "lucene-query-parser";
import { logger } from "../logger/logger";

const NUMBER_OPERATOR = /^!?(?<operator>[<>]=?)(?<term>.+)$/;
const EXACT_STRING =
  /^!?(("(?<exactTermDouble>.*)")|('(?<exactTermSimple>.*)'))$/;

export const luceneSearch = <T extends Record<string, unknown>>(
  query: string,
  data: T[],
  implicitField?: string
) => {
  try {
    const parsedQuery = lucene.parse(query);

    const matchObject = (obj: T, node: lucene.LuceneNode): boolean => {
      // Handle AND and OR
      if (node.left || node.right) {
        const leftResult = node.left ? matchObject(obj, node.left) : false;
        const rightResult = node.right ? matchObject(obj, node.right) : false;
        return node.operator === "AND"
          ? leftResult && rightResult
          : leftResult || rightResult;
      }

      // Extract raw field and term
      const { field: rawField, term: rawTerm } = node;
      const field =
        implicitField && rawField === "<implicit>" ? implicitField : rawField;
      if (!field || !(field in obj)) return false;

      const not = rawTerm?.startsWith("!") ?? false;
      const termWithoutNot = not ? rawTerm?.slice(1) : rawTerm;

      const { term, operator } = NUMBER_OPERATOR.exec(rawTerm!)?.groups ?? {
        term: termWithoutNot ?? "",
        operator: ":",
      };

      // Handle strings
      if (operator === ":") {
        const { exactTermDouble, exactTermSimple } =
          EXACT_STRING.exec(term)?.groups ?? {};
        const exactTerm = exactTermDouble ?? exactTermSimple;

        const valueString = obj[field]?.toString();

        if (exactTerm)
          return not
            ? valueString?.toString() !== exactTerm
            : valueString?.toString() === exactTerm;

        const contains = !!valueString
          ?.toLowerCase()
          .includes(term.toLowerCase());

        return not ? !contains : contains;
      }

      // Handle numbers
      const fieldValueNumber = obj[field] == null ? 0 : +obj[field] || 0;
      switch (operator) {
        case ">":
          return fieldValueNumber > +term;
        case ">=":
          return fieldValueNumber >= +term;
        case "<":
          return fieldValueNumber < +term;
        case "<=":
          return fieldValueNumber <= +term;
        default:
          return false;
      }
    };

    return data.filter((item) => matchObject(item, parsedQuery));
  } catch {
    logger.error("Error while searching:", query);
    return [];
  }
};
