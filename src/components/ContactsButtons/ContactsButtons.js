import './ContactsButtons.css';

function ContactsButtons({ width }) {
  return (
    <>
      <button
        className="social-button contacts-button_type_whatsapp"
        onClick={() => window.open('https://wa.me/79296803983', '_blank')}
      />
      <button
        className="social-button contacts-button_type_tg"
        onClick={() => window.open('https://t.me/SabinaTari', '_blank')}
      />
      {width <= 768 && (
        <button
          className="social-button contacts-button_type_mail"
          onClick={() =>
            window.open('mailto:sabinkaartist@gmail.com', '_blank')
          }
        />
      )}
    </>
  );
}

export default ContactsButtons;
