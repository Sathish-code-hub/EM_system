import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function EmployeeForm({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    designation: '',
    status: 'Active',
    joiningDate: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        email: '',
        department: '',
        designation: '',
        status: 'Active',
        joiningDate: ''
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Full name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = "Email field is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Enter a valid email";
    }

    if (!formData.department.trim()) tempErrors.department = "Department is required";
    if (!formData.designation.trim()) tempErrors.designation = "Designation is required";
    if (!formData.joiningDate) tempErrors.joiningDate = "Joining Date is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white w-full max-w-lg rounded-xl border border-slate-200 shadow-2xl relative z-10 overflow-hidden transform animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">{initialData ? 'Edit Employee' : 'Add Employee'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm" placeholder="John Doe" />
            {errors.name && <p className="text-xs font-medium text-rose-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm" placeholder="john@company.com" />
            {errors.email && <p className="text-xs font-medium text-rose-500 mt-1">{errors.email}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Department</label>
              <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm" placeholder="HR" />
              {errors.department && <p className="text-xs font-medium text-rose-500 mt-1">{errors.department}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Designation</label>
              <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm" placeholder="Manager" />
              {errors.designation && <p className="text-xs font-medium text-rose-500 mt-1">{errors.designation}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Joining Date</label>
              <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm" />
              {errors.joiningDate && <p className="text-xs font-medium text-rose-500 mt-1">{errors.joiningDate}</p>}
            </div>
          </div>
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold border rounded-lg hover:bg-slate-50">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
