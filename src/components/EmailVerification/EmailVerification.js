import React from 'react';
import {
  // useLocation,
  // useHistory,
  useParams,
} from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

function EmailVerification({
  verifyEmail,
  updateUser,
  openPopupSuccess,
  openPopupFailure,
  openPopupRepeat,
  popupOpen,
}) {
  // const history = useHistory();
  // const location = useLocation();

  const params = useParams();

  React.useEffect(() => {
    verifyEmail(params)
      .then((data) => {
        updateUser(data);
        openPopupSuccess();
      })
      .catch((err) => {
        if (err === 'Регистрация уже подтверждена') {
          openPopupRepeat();
        } else {
          openPopupFailure();
        }
      });

    // const searchParams = new URLSearchParams(location.pathname);

    // const userId = new URLSearchParams(location.search).get('userId');
    // const token = new URLSearchParams(location.search).get('token');

    // const verifyEmail = async () => {
    //   try {
    //     const response = await axios.get('/api/verify-email', {
    //       params: { token },
    //     });

    //     console.log('Email verified successfully!', response.data);

    //     // Redirect the user to a success page or perform other actions
    //     history.push('/verification-success');
    //   } catch (error) {
    //     console.error('Failed to verify email:', error);

    //     // Redirect the user to an error page or perform other actions
    //     history.push('/verification-error');
    //   }
    // };
    // if (token) {
    //   verifyEmail();
    // } else {
    //   console.error('Email verification token not found!');
    //   history.push('/verification-error');
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (popupOpen) {
    return null;
  } else {
    return <Preloader />;
  }
}

export default EmailVerification;
