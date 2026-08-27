import employeesData from '../assets/assets';

export const employeeApi = {
  //fetch
  fetchEmployees: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...employeesData]);
      }, 800); //
    });
  },

  // POST: Create a profile record
  createEmployee: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...data, _id: Date.now().toString() }), 800);
    });
  },

  // PUT: Update deep index values
  updateEmployee: (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...data, _id: id }), 800);
    });
  },

  // DELETE: Terminate active file lines
  deleteEmployee: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(id), 800);
    });
  }
};
