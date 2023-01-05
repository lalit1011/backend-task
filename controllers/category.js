const { Op } = require('sequelize');
var _ = require('lodash');

const { getPagingDataNew } = require('../utilities/pagination');
const { Category } = require('../models/index');

exports.adminCreateCategory = ({ name, slug }) => {
  return new Promise((resolve, reject) => {
    Category.findOne({ where: { name: { [Op.iLike]: `%${name}%` } } }).then(foundCategory => {

      if (foundCategory) {
        return reject(new Error(`Category name should not be duplicated.`));
      }

      Category.create({ name, slug })
        .then(category => {
          if (!category) {
            return reject(new Error(`Failed to category creation.`));
          }
          return resolve(category);
        }).catch((error) => {
          console.log('category creation error', error)
          return reject(new Error(error))
        });
    }).catch((error) => {
      console.log('category creation error...', error)

      reject(new Error(error))
    });

  });

};

exports.adminUpdateCategory = (categoryId, updateData) => {

  return new Promise((resolve, reject) => {

    Category.findOne({ where: { id: { [Op.ne]: categoryId }, name: { [Op.iLike]: `%${updateData.name}%` } } }).then(foundCategory => {

      if (foundCategory) {
        return reject(new Error(`Category name should not be duplicated.`));
      }

      Category.update(updateData, {
        where: { id: categoryId }
      }).then(async category => {
        if (!category) {
          return reject(new Error(`Category not found`));
        } else {
          return resolve(Category.findOne({ where: { id: categoryId } }));
        }

      }).catch((error) => {
        console.log('error', error)
        return reject('Failed to update')
      });
    }).catch((error) => reject(new Error(`Something went wrong!.`)));
  });

}

exports.adminFetchCategory = (categoryId) => {

  return new Promise((resolve, reject) => {

    Category.findOne({
      where: { id: categoryId }
    }).then(foundCategory => {
      if (!foundCategory) {
        return reject(new Error(`Category not found.`));
      }
      return resolve(foundCategory);
    }).catch((error) => reject(new Error(error)));
  });
}

exports.adminFetchAllCategory = (page, limit, { search = 'null', categoryId }) => {

  return new Promise((resolve, reject) => {

    const offset = page === 1 ? 0 : limit * (page - 1);
    let where = { isDeleted: false };

    if (search !== 'null' && isNaN(search)) {
      where['name'] = {
        [Op.iLike]: `%${search}%`

      }
    }
    if (categoryId) {
      where['id'] = categoryId;
    }
    Category.findAndCountAll({
      distinct: true,
      where: where,


      order: [
        ['id', 'DESC']
      ],
      offset: offset,
      limit: limit,
     
    }).then(async category => {
      if (category.length === 0) {
        return reject(new Error(`Category not found.`));
      }
      
      const response = getPagingDataNew(category, page, limit, 'data');

      return resolve(response);
    }).catch((error) => reject(new Error(error)));
  });
}

exports.adminRemoveCategory = (categoryId) => {

  return new Promise((resolve, reject) => {

    Category.findOne({
      where: { id: categoryId }, include: [{
        model: SubCategory,
        as: 'subCategories',

        attributes: ['id', 'name']
      }],
    }).then(async foundCategory => {

      if (!foundCategory) {
        return reject(new Error(`Category not found.`));
      }
      if (foundCategory?.subCategories.length) {
        const nameSub = foundCategory.subCategories.map(c => c.name).toString();

        return reject(new Error(`Category is being used by following sub-categories(${nameSub}...)`));
      }
    
      Category.destroy({
        where: { id: categoryId }
      }).then(async category => {
        if (category) {
          return resolve(category);
        } else {
          return reject(new Error(`Failed to update`));
        }

      }).catch((error) => {
        console.log('error', error)
        return reject('Failed to update')
      });
    }).catch((error) => {
      console.log("error", error)
      reject(new Error(`Something went wrong!.`))
    });
  });
}