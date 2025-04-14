import './LangSwitcher.css';

function LangSwitcher({ setRus, setEng, lang, langRef }) {
  return (
    <button
      className={`lang-switcher ${
        lang === 'Ru' ? 'lang-switcher_lang_en' : 'lang-switcher_lang_ru'
      }`}
      onClick={lang === 'Ru' ? setEng : setRus}
      ref={langRef}
      title={lang === 'Ru' ? 'English' : 'Русский'}
    />
  );
}

export default LangSwitcher;
