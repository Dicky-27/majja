export const sortByCreatedDateAscending = (newsList) =>
  newsList.sort((a, b) => new Date(a.created) - new Date(b.created));

export const sortByCreatedDateDescending = (newsList) =>
  newsList.sort((a, b) => new Date(b.created) - new Date(a.created));
