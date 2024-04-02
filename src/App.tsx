import { useInput } from "./hooks/ts/useInput";

const AppTs = () => {
  const { inputValue: email, onInputChange: emailChange } =
    useInput<string>("");
  const { inputValue: password, onInputChange: passwordChange } =
    useInput<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

export default AppTs;
