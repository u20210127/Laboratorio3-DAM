"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", baseSalary: "" });
  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "El nombre es obligatorio.";
    if (!formData.baseSalary) {
      tempErrors.baseSalary = "El sueldo base es obligatorio.";
    } else if (isNaN(formData.baseSalary) || formData.baseSalary <= 0) {
      tempErrors.baseSalary = "Ingrese un sueldo válido (mayor a 0).";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const calculateNetSalary = (baseSalary) => {
    const isss = baseSalary * 0.073;
    const renta = baseSalary * 0.11;
    const afp = baseSalary * 0.051;
    const netSalary = baseSalary - isss - renta - afp;

    return { isss, renta, afp, netSalary };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const { isss, renta, afp, netSalary } = calculateNetSalary(
        parseFloat(formData.baseSalary)
      );

      setEmployees([
        ...employees,
        {
          name: formData.name,
          baseSalary: parseFloat(formData.baseSalary),
          isss,
          renta,
          afp,
          netSalary,
        },
      ]);

      setFormData({ name: "", baseSalary: "" });
      setSubmitted(true);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="container mt-5">
          <h2>Cálculo del Sueldo Neto</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.name ? "is-invalid" : ""
                }`}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="baseSalary" className="form-label">
                Sueldo Base ($)
              </label>
              <input
                type="number"
                className={`form-control ${
                  errors.baseSalary ? "is-invalid" : ""
                }`}
                id="baseSalary"
                name="baseSalary"
                value={formData.baseSalary}
                onChange={handleChange}
              />
              {errors.baseSalary && (
                <div className="invalid-feedback">{errors.baseSalary}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Calcular
            </button>
          </form>

          {submitted && (
            <div className="alert alert-success mt-3">
              Datos calculados correctamente.
            </div>
          )}

          <h3 className="mt-5">Datos Enviados</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Sueldo Base ($)</th>
                <th>ISSS ($)</th>
                <th>Renta ($)</th>
                <th>AFP ($)</th>
                <th>Sueldo Neto ($)</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.baseSalary.toFixed(2)}</td>
                  <td>{employee.isss.toFixed(2)}</td>
                  <td>{employee.renta.toFixed(2)}</td>
                  <td>{employee.afp.toFixed(2)}</td>
                  <td>{employee.netSalary.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}