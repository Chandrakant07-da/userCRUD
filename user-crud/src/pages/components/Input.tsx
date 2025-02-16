interface InputProps {
    name: string;
    placeholder: string;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
  }
  
const Input: React.FC<InputProps> = ({ name, placeholder, type = "text", value, onChange, className = "" }) => (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border p-2 w-full rounded ${className}`}
      required
    />
  );
  
  export default Input;
  