const FormInput = ({ label, value, onChange, placeholder }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ fontWeight: "600", marginBottom: "8px", display: "block", color: "#475569" }}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box", outline: "none" }}
      />
    </div>
  );
};
export default FormInput;