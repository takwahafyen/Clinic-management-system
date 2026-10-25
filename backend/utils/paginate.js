/**
 * Reusable Mongoose pagination helper.
 *
 * Supports both:
 * 1. Explicit pagination payload when `?page=` or `?paginate=true` is present:
 *    {
 *      data: [...],
 *      pagination: { total, page, limit, totalPages, hasNextPage, hasPrevPage }
 *    }
 * 2. Backward-compatible direct array response with HTTP response headers:
 *    `X-Total-Count`, `X-Page`, `X-Total-Pages`, `X-Limit`
 *
 * @param {import('mongoose').Model} model - Mongoose model to query
 * @param {Object} filter - MongoDB filter object
 * @param {Object} reqQuery - Request query object (req.query)
 * @param {import('express').Response} res - Express response object
 * @param {Array<Object>} populateOptions - Array of Mongoose populate definitions
 * @param {String} defaultSort - Default sort order (default: '-createdAt')
 */
const paginate = async ({
  model,
  filter = {},
  reqQuery = {},
  res,
  populateOptions = [],
  defaultSort = "-createdAt",
}) => {
  const isExplicitPagination =
    reqQuery.page !== undefined ||
    reqQuery.limit !== undefined ||
    reqQuery.paginate === "true";

  const page = Math.max(1, parseInt(reqQuery.page, 10) || 1);
  const maxLimit = 100;
  // Default to 10 if explicit pagination requested; otherwise 50 as safe maximum cap
  const defaultLimit = isExplicitPagination ? 10 : 50;
  const limit = Math.min(
    maxLimit,
    Math.max(1, parseInt(reqQuery.limit, 10) || defaultLimit)
  );
  const skip = (page - 1) * limit;

  const total = await model.countDocuments(filter);
  const totalPages = Math.ceil(total / limit) || 1;

  let query = model.find(filter).sort(defaultSort).skip(skip).limit(limit);

  if (populateOptions && populateOptions.length > 0) {
    populateOptions.forEach((pop) => {
      query = query.populate(pop.path, pop.select);
    });
  }

  const data = await query.exec();

  // Attach standard pagination headers on all responses
  if (res && res.set) {
    res.set("X-Total-Count", total.toString());
    res.set("X-Page", page.toString());
    res.set("X-Total-Pages", totalPages.toString());
    res.set("X-Limit", limit.toString());
  }

  // If explicit pagination was requested, return structured payload
  if (isExplicitPagination) {
    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  // Otherwise return array directly for backward compatibility
  return data;
};

module.exports = paginate;
