import util from 'util';

class BooksCategories {
    constructor(database) {
        this.database = database;
        this.query = util.promisify(database.query).bind(database);
    }

    // Get all categories
    async getAllCategories() {
        try {
            const sql = "SELECT * FROM categories";
            const results = await this.query(sql);
            return results;
        } catch (error) {
            return {
                success: false,
                message: "Failed to fetch all book categories",
                error: error.message
            };
        }
    }

    // Get a category by ID
    async getCategoryById(categoryId) {
        try {
            const sql = "SELECT * FROM categories WHERE category_id = ?";
            const results = await this.query(sql, [categoryId]);
            if (results.length === 0) {
                throw new Error(`Category with ID ${categoryId} not found`);
            }
            return results[0];
        } catch (error) {
            return {
                success: false,
                message: `Failed to fetch category with ID ${categoryId}`,
                error: error.message
            };
        }
    }

    // Add a new category
    async addCategory(categoryData) {
        try {
            const sql = "INSERT INTO categories (category_id,name) VALUES (?,?)";
            const { category_id, name } = categoryData;
            const result = await this.query(sql, [category_id, name]);
            return {
                success: true,
                message: "Category added successfully",
                data: { ...categoryData }
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to add a new category",
                error: error.message
            };
        }
    }

    // Update a category by ID
    async updateCategory(categoryId, categoryData) {
        try {
            const sql = "UPDATE categories SET name = ? WHERE category_id = ?";
            const { name } = categoryData;
            const result = await this.query(sql, [name, categoryId]);
            if (result.affectedRows === 0) {
                throw new Error(`Category with ID ${categoryId} not found`);
            }
            return {
                success: true,
                message: "Category updated successfully",
                data: { ...categoryData }
            };
        } catch (error) {
            return {
                success: false,
                message: `Failed to update category with ID ${categoryId}`,
                error: error.message
            };
        }
    }

    // Delete a category by ID
    async deleteCategory(categoryId) {
        try {
            const sql = "DELETE FROM categories WHERE category_id = ?";
            const result = await this.query(sql, [categoryId]);
            if (result.affectedRows === 0) {
                throw new Error(`Category with ID ${categoryId} not found`);
            }
            return {
                success: true,
                message: `Category with ID ${categoryId} deleted successfully`
            };
        } catch (error) {
            return {
                success: false,
                message: `Failed to delete category with ID ${categoryId}`,
                error: error.message
            };
        }
    }
}

export default BooksCategories;
