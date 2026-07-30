/**
 * Base Repository Pattern Abstraction
 * 
 * DESIGN PATTERN EXPLANATION:
 * The Repository Pattern abstracts data persistence logic away from business logic (Services)
 * and HTTP controllers. Controllers call Services or Repositories directly to execute queries.
 * If the underlying database ORM (e.g. Mongoose, Prisma, SQL) changes in the future,
 * only the Repository layer requires updates without altering business or route logic.
 */
class BaseRepository {
  /**
   * @param {import('mongoose').Model} model - Mongoose Schema Model instance
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * Find document by ID
   * @param {string} id 
   * @param {Object} [projection] 
   * @param {Object} [options] 
   */
  async findById(id, projection = null, options = {}) {
    return await this.model.findById(id, projection, options);
  }

  /**
   * Find one document matching query criteria
   * @param {Object} filter 
   * @param {Object} [projection] 
   * @param {Object} [options] 
   */
  async findOne(filter, projection = null, options = {}) {
    return await this.model.findOne(filter, projection, options);
  }

  /**
   * Find all documents matching criteria with pagination/sorting support
   * @param {Object} [filter] 
   * @param {Object} [projection] 
   * @param {Object} [options] 
   */
  async find(filter = {}, projection = null, options = {}) {
    return await this.model.find(filter, projection, options);
  }

  /**
   * Create a new document in MongoDB
   * @param {Object} payload 
   */
  async create(payload) {
    return await this.model.create(payload);
  }

  /**
   * Update document by ID
   * @param {string} id 
   * @param {Object} updateData 
   * @param {Object} [options] 
   */
  async updateById(id, updateData, options = { new: true, runValidators: true }) {
    return await this.model.findByIdAndUpdate(id, updateData, options);
  }

  /**
   * Delete document by ID
   * @param {string} id 
   */
  async deleteById(id) {
    return await this.model.findByIdAndDelete(id);
  }

  /**
   * Count total documents matching query filter
   * @param {Object} filter 
   */
  async count(filter = {}) {
    return await this.model.countDocuments(filter);
  }
}

module.exports = BaseRepository;
