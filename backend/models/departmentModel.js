import util from 'util';

class DepartmentModel {
    constructor(database) {
        this.database = database;
        this.query = util.promisify(database.query).bind(database);
    }

    async createDepartment({ name, description }) {
        try {
            const query = `
        INSERT INTO Departments (name, description)
        VALUES (?, ?)
      `;
            const params = [name, description];
            const result = await this.query(query, params);
            return { success: true, departmentId: result.insertId };
        } catch (error) {
            console.error('Error in createDepartment:', error);
            return { success: false, error: error.message };
        }
    }

    async getAllDepartments() {
        try {
            const query = `
        SELECT department_id, name, description
        FROM Departments
      `;
            const rows = await this.query(query);
            return { success: true, departments: rows };
        } catch (error) {
            console.error('Error in getAllDepartments:', error);
            return { success: false, error: error.message };
        }
    }

    async getDepartmentById(departmentId) {
        try {
            const query = `
        SELECT department_id, name, description
        FROM Departments
        WHERE department_id = ?
      `;
            const rows = await this.query(query, [departmentId]);
            return { success: true, department: rows[0] || null };
        } catch (error) {
            console.error('Error in getDepartmentById:', error);
            return { success: false, error: error.message };
        }
    }

    async updateDepartment(departmentId, { name, description }) {
        try {
            const updates = [];
            const params = [];

            if (name) {
                updates.push('name = ?');
                params.push(name);
            }

            if (description) {
                updates.push('description = ?');
                params.push(description);
            }

            params.push(departmentId);

            const query = `
        UPDATE Departments
        SET ${updates.join(', ')}
        WHERE department_id = ?
      `;
            const result = await this.query(query, params);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error in updateDepartment:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteDepartment(departmentId) {
        try {
            const query = `
        DELETE FROM Departments
        WHERE department_id = ?
      `;
            const result = await this.query(query, [departmentId]);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error in deleteDepartment:', error);
            return { success: false, error: error.message };
        }
    }
}

export default DepartmentModel;
