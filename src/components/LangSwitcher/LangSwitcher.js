function LangSwitcher({ setRus, setEng }) {
  return (
    <div>
      <button onClick={setRus}>Ru</button>
      <button onClick={setEng}>En</button>
    </div>
  );
}

export default LangSwitcher;
