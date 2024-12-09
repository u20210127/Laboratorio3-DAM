"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [formData, setFormData] = useState({
    fuelType: "",
    gallons: 0.05,
  });
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const fuelPrices = {
    regular: 4.05,
    especial: 4.25,
    diesel: 3.96,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "gallons" ? parseFloat(value) : value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.fuelType) tempErrors.fuelType = "Debe seleccionar un tipo de combustible.";
    if (formData.gallons < 0.05 || formData.gallons > 150) {
      tempErrors.gallons = "La cantidad debe estar entre 0.05 y 150 galones.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const totalCost = (fuelPrices[formData.fuelType] * formData.gallons).toFixed(2);
      setSubmittedData([...submittedData, { ...formData, totalCost }]);
      setFormData({ fuelType: "", gallons: 0.05 });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000); // Oculta el mensaje después de 3 segundos
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="container mt-5">
          <h2>Cálculo de Combustible</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fuelType" className="form-label">
                Tipo de Combustible
              </label>
              <select
                className={`form-select ${errors.fuelType ? "is-invalid" : ""}`}
                id="fuelType"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="regular">Gasolina Regular - $4.05</option>
                <option value="especial">Gasolina Especial - $4.25</option>
                <option value="diesel">Diesel - $3.96</option>
              </select>
              {errors.fuelType && <div className="invalid-feedback">{errors.fuelType}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="gallons" className="form-label">
                Cantidad de Galones
              </label>
              <input
                type="number"
                className={`form-control ${errors.gallons ? "is-invalid" : ""}`}
                id="gallons"
                name="gallons"
                min="0.05"
                max="150"
                step="0.05"
                value={formData.gallons}
                onChange={handleChange}
              />
              {errors.gallons && <div className="invalid-feedback">{errors.gallons}</div>}
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
          <table className="table">
            <thead>
              <tr>
                <th>Tipo de Combustible</th>
                <th>Galones</th>
                <th>Costo Total ($)</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.fuelType}</td>
                  <td>{data.gallons}</td>
                  <td>{data.totalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}