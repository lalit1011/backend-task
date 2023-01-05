exports.getPagingData = (data, page, limit) => {

  const { count: totalItems, rows: assets } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, assets, totalPages, currentPage };
};

exports.getPagingDataNew = (data, page, limit, label = 'data') => {

  const { count: totalItems, rows } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, [label]: rows, totalPages, currentPage };
};
