exports.getById = async (table, id) => {
  const result = await table.findByPk(id)
  return result
}

exports.getPaginatedData = async (table, search, searchQuery) => {
  const pageSize = (search.pageSize) ? parseInt(search.pageSize) : 10
  const currentPage = (search.currentPage) ? parseInt(search.currentPage) : 1
  const field = (search.field) ? search.field : 'id'
  const sort = (search.sort) ? search.sort : 'DESC'

  if (currentPage === 0) {
    return false
  }
  const result = await table.findAndCountAll({
    include: [],
    where: searchQuery,
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
    order: [[field, sort]]
  })

  const output = {
    msg: 'Success Retrieve Data',
    meta: {
      count: result.count,
      dataLength: result.rows.length,
      currentPage: currentPage,
      totalPage: Math.ceil(result.count / pageSize)
    },
    data: result.rows
  }

  return output
}
