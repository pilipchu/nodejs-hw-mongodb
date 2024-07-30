const parseIsBoolean = (favourite) => {
  //перевірка на рядок
  const isString = typeof favourite === 'string';
  // якщо це не рядок прирвати роботу функції
  if (!isString) return;

  const isFavourite = (favourite) => ['true', 'false'].includes(favourite);
  if (isFavourite(favourite)) return favourite;
};

const parseIsString = (type) => {
  const isString = typeof type === 'string';

  if (!isString) return;

  const contactType = (type) => ['personal', 'home'].includes(type);
  if (contactType(type)) return type;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedIsFavourite = parseIsBoolean(isFavourite);
  const parsedContactType = parseIsString(type);

  return {
    isFavourite: parsedIsFavourite,
    type: parsedContactType,
  };
};
