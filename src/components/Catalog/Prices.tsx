export const Prices = () => {
  return (
    <div className="price">
      <p>price</p>
      <ul>
        <li>
          <label htmlFor="price1">
            <input type="radio" name="price" id="price1" />
            10 - 40$
          </label>
        </li>
        <li>
          <label htmlFor="price2">
            <input type="radio" name="price" id="price2" />
            40 - 70$
          </label>
        </li>
        <li>
          <label htmlFor="price3">
            <input type="radio" name="price" id="price3" />
            70 - 100$
          </label>
        </li>
        <li>
          <label htmlFor="price4">
            <input type="radio" name="price" id="price4" />
            over 100$
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Prices;
