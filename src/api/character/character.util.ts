const defaultExcludedFields: string[] = [
  'jutsu',
  'debut',
  'family',
  'voiceActors',
  'personal.titles',
  'personal.team',
];

export function getExcludedFields(fields: string[]) {
  const result: Record<string, boolean> = {};

  const excludedFields = defaultExcludedFields.filter(
    (value) => !fields.includes(value),
  );

  for (const field of excludedFields) {
    result[field] = false;
  }

  return result;
}
