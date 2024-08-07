import { HandeChange } from '@/types/Props';

export const Prices = ({ handleChange }: HandeChange) => {
  return (
    <div className="price">
      <p>price</p>
      <ul>
        <li>
          <label htmlFor="price0">
            <input
              type="radio"
              name="price"
              id="price0"
              value="0"
              onChange={(ev) => handleChange(ev)}
            />
            <span>ALL</span>
          </label>
        </li>
        <li>
          <label htmlFor="price1">
            <input
              type="radio"
              name="price"
              id="price1"
              value="10"
              onChange={(ev) => handleChange(ev)}
            />
            <span>10 - 40$</span>
          </label>
        </li>
        <li>
          <label htmlFor="price2">
            <input
              type="radio"
              name="price"
              id="price2"
              value="40"
              onChange={(ev) => handleChange(ev)}
            />
            <span>40 - 70$</span>
          </label>
        </li>
        <li>
          <label htmlFor="price3">
            <input
              type="radio"
              name="price"
              id="price3"
              value="70"
              onChange={(ev) => handleChange(ev)}
            />
            <span>70 - 100$</span>
          </label>
        </li>
        <li>
          <label htmlFor="price4">
            <input
              type="radio"
              name="price"
              id="price4"
              value="100"
              onChange={(ev) => handleChange(ev)}
            />
            <span>over 100$</span>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Prices;
