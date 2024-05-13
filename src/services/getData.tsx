export const getAccessToken = async () => {
  const myHeaders: Headers = new Headers();
  myHeaders.append(
    'Authorization',
    'Basic dUpzVExhY2lQbFFHNVBlU0ZQWUwtVW45Ok9VMWlQUTdRR2laVEYxdklTejYtM2lrOVhXcHk1dlJZ',
  );

  const raw = '';

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };
  fetch(
    `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/token?grant_type=client_credentials`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => {
      localStorage.setItem('tokenForAll', result.access_token);
    })
    .catch((error) => console.error(error));
};

export const getBooks = async () => {
  try {
    await getAccessToken();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('tokenForAll')}`,
    );

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    const resp = await (
      await fetch(
        `${import.meta.env.VITE_CTP_API_URL}/rssecommercefinal/products`,
        requestOptions,
      )
    ).json();
    console.log(resp);
    // return resp;
  } catch (error) {
    console.error(error);
  }
};
