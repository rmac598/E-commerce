// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
// Categories have many Products

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});


// Tags hasMany Products (through ProductTag)
Tag.hasMany(ProductTag, {
  foreignKey: 'tag_id',
  onDelete: 'CASCADE',
});


// Products belongToMany Tags (through ProductTag)
ProductTag.belongsTo(Tag, {
  foreignKey: 'Tag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
