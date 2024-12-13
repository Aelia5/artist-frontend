import './PagesButtons.css';

function PagesButtons() {
  return (
    <>
      <button
        className="social-button pages-button_type_artstation"
        onClick={() =>
          window.open(
            'https://www.artstation.com/sabinatariverdieva2',
            '_blank'
          )
        }
      />
      <button
        className="social-button pages-button_type_vk"
        onClick={() => window.open('https://vk.com/id1627123', '_blank')}
      />
      <button
        className="social-button pages-button_type_instagram"
        onClick={() =>
          window.open('https://www.instagram.com/sabina__tari/', '_blank')
        }
      />
    </>
  );
}

export default PagesButtons;
