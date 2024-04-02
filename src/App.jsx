import { useInput } from "./hooks/js/useInput";

const AppJs = () => {
  const { inputValue: email, onInputChange: emailChange } = useInput("");
  const { inputValue: password, onInputChange: passwordChange } = useInput("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={emailChange} />
      <input type="password" value={password} onChange={passwordChange} />
      <button type="submit">Login</button>
    </form>
  );
};

export default AppJs;
